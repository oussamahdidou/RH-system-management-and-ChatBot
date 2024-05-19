using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.extensions;
using api.helpers;
using api.interfaces;
using api.Model;
using FluentEmail.Core;
using FluentEmail.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PaiementRepository : IPaiementRepository
    {
        private readonly IFluentEmail fluentEmail;
        private readonly UserManager<AppUser> userManager;
        private readonly ApiDbContext apiDbContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        public PaiementRepository(IWebHostEnvironment _webHostEnvironment, IFluentEmail _fluentEmail, UserManager<AppUser> _userManager, ApiDbContext _apiDbContext)
        {
            this.fluentEmail = _fluentEmail;
            this.userManager = _userManager;
            this.apiDbContext = _apiDbContext;
            this.webHostEnvironment = _webHostEnvironment;
        }

        public async Task CreatePaiements()
        {
            List<AppUser> appUsers = await userManager.Users
                                                      .Include(x => x.Abscences)
                                                      .Include(x => x.Heuresupplimentaires)
                                                      .ToListAsync();
            foreach (var appuser in appUsers)
            {
                (int year, int month) date = DateTimeExtensions.GetPreviousMonthYear();
                int NmbreAbscences = appuser.Abscences.Where(x => x.Date.Year == date.year && x.Date.Month == date.month).Count();
                int Nmbreheuressupplimentaires = appuser.Heuresupplimentaires.Where(x => x.DateTime.Year == date.year && x.DateTime.Month == date.month).Count();
                double SalaireDeBasePerHour = appuser.SalaireDeBase;
                double SalaireDeBase = appuser.SalaireDeBase * 176;
                double Tauxheuressuplimentaires = SalaireDeBasePerHour * 1.25;
                double Montantheuressuplimentaires = Tauxheuressuplimentaires * Nmbreheuressupplimentaires;
                double ReductionAbscence = NmbreAbscences * SalaireDeBasePerHour;
                double SalaireBrut = SalaireDeBase + Montantheuressuplimentaires - ReductionAbscence;
                int anneedeifference = appuser.IntegrationDate.CalculateYearsDifference();
                double TauxPrime = 0;
                if (anneedeifference < 5 && anneedeifference >= 2)
                {
                    TauxPrime = 0.05;


                }
                else if (anneedeifference >= 5 && anneedeifference < 12)
                {
                    TauxPrime = 0.1;
                }
                else if (anneedeifference >= 12 && anneedeifference < 20)
                {
                    TauxPrime = 0.15;
                }
                else if (anneedeifference >= 20 && anneedeifference < 25)
                {
                    TauxPrime = 0.2;
                }
                else if (anneedeifference >= 25)
                {
                    TauxPrime = 0.25;
                }
                double SalaireBrutImposable = SalaireBrut * (1 + TauxPrime);
                double TauxImpot = 0;
                if (SalaireBrutImposable > 2501 && SalaireBrutImposable < 4166.67)
                {
                    TauxImpot = 0.1;
                }
                else if (SalaireBrutImposable > 4167 && SalaireBrutImposable < 5000)
                {
                    TauxImpot = 0.2;
                }
                else if (SalaireBrutImposable > 5001 && SalaireBrutImposable < 6666.67)
                {
                    TauxImpot = 0.3;
                }
                else if (SalaireBrutImposable > 6667 && SalaireBrutImposable < 15000)
                {
                    TauxImpot = 0.34;
                }
                else if (SalaireBrutImposable > 15000)
                {
                    TauxImpot = 0.38;
                }
                double SalaireNetImposable = SalaireBrutImposable * (1 - TauxImpot);
                double SalaireNet = SalaireNetImposable * 0.0674;
                Paiementvariable paiementvariable = new Paiementvariable()
                {
                    Name = appuser.UserName,
                    Year = date.year,
                    Month = date.month,
                    NombreAbsences = NmbreAbscences,
                    NombreHeuresSupplementaires = Nmbreheuressupplimentaires,
                    SalaireDeBasePerHour = SalaireDeBasePerHour,
                    SalaireDeBase = SalaireDeBase,
                    TauxHeuresSupplementaires = Tauxheuressuplimentaires,
                    MontantHeuresSupplementaires = Montantheuressuplimentaires,
                    ReductionAbsence = ReductionAbscence,
                    SalaireBrut = SalaireBrut,
                    TauxPrime = TauxPrime,
                    SalaireBrutImposable = SalaireBrutImposable,
                    TauxImpot = TauxImpot,
                    SalaireNetImposable = SalaireNetImposable,
                    SalaireNet = SalaireNet,

                };

                (string path, string filepath) file = paiementvariable.PaiementFile(webHostEnvironment);

                SendResponse response = await fluentEmail
                           .To(appuser.Email)
                           .Subject("Fiche de paie " + date.year + "_" + date.month)

                           .Attach(new Attachment
                           {
                               Data = File.OpenRead(file.filepath),
                               Filename = "Fichedepaie.pdf"
                           })
                           .SendAsync();
                Paiement paiement = new Paiement()
                {
                    Annee = date.year,
                    Mois = date.month,
                    AMO = SalaireNetImposable * 0.0226,
                    CNSS = SalaireNetImposable * 0.0448,
                    NmbrAbscences = NmbreAbscences,
                    ImpotSurSalaire = SalaireBrutImposable * TauxImpot,
                    Nmbrheursupplimentaires = Nmbreheuressupplimentaires,
                    Prime = SalaireBrut * TauxPrime,
                    SalaireDeBase = SalaireDeBase,
                    FicheDePaie = file.path,
                    AppUserId = appuser.Id

                };
                await apiDbContext.Paiements.AddAsync(paiement);
            }
            await apiDbContext.SaveChangesAsync();

        }
    }
}