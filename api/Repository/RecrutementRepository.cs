using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Recrutement;
using api.extensions;
using api.helpers;
using api.interfaces;
using api.Model;
using FluentEmail.Core;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class RecrutementRepository : IRecrutementRepository
    {
        private readonly ApiDbContext apiDbContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IFluentEmail fluentEmail;
        public RecrutementRepository(IFluentEmail fluentEmail, ApiDbContext apiDbContext, IWebHostEnvironment webHostEnvironment)
        {
            this.apiDbContext = apiDbContext;
            this.webHostEnvironment = webHostEnvironment;
            this.fluentEmail = fluentEmail;
        }
        public async Task<Annonce> CreateAnnonceAsync(CreateAnnonceDto createAnnonceDto)
        {
            Annonce annonce = new Annonce()
            {
                Deadline = createAnnonceDto.Deadline,
                Description = createAnnonceDto.Description,
                Titre = createAnnonceDto.Titre,
                NmbrMax = createAnnonceDto.NmbrMax,
            };

            await apiDbContext.Annonces.AddAsync(annonce);
            await apiDbContext.SaveChangesAsync();
            return annonce;
        }

        public async Task<Annonce> GetAnnonceByIdAsync(int Id)
        {
            return await apiDbContext.Annonces.Include(x => x.Candidatures).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<List<Annonce>> GetAnnoncesAsync()
        {
            return await apiDbContext.Annonces.ToListAsync();
        }

        public async Task<Candidature> GetCandidatureById(int Id)
        {
            return await apiDbContext.Candidatures.FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<List<Candidature>> GetCandidaturesAsync(int Id)
        {
            List<Candidature> candidatures = await apiDbContext.Candidatures.Where(x => x.AnnonceId == Id).ToListAsync();
            return candidatures;
        }

        public async Task<Candidature> Integrer(int Id)
        {
            Candidature? candidature = await apiDbContext.Candidatures.FirstOrDefaultAsync(x => x.Id == Id);
            if (candidature == null)
                return null;
            else
            {

                candidature.Status = CandidatureStatus.Integrer;

                await apiDbContext.SaveChangesAsync();
                return candidature;

            }
        }

        public async Task<Candidature> Postuler(CreateCandidatureDto createCandidatureDto, int AnnonceId)
        {
            Annonce? annonce = await apiDbContext.Annonces.Include(x => x.Candidatures).FirstOrDefaultAsync(x => x.Id == AnnonceId);


            if (annonce != null && annonce.Candidatures.Count() < annonce.NmbrMax && annonce.Deadline > DateTime.Now)
            {
                Mail mail = new Mail()
                {
                    To = createCandidatureDto.Mail,
                    Subject = "Accusee de Reception de Candidature",
                    Body = await createCandidatureDto.PostuleMail(),

                };
                if (await mail.SendMailAsync(fluentEmail))
                {
                    string CVPath = await createCandidatureDto.CV.UploadCV(webHostEnvironment);
                    if (CVPath != null)
                    {
                        Candidature candidature = new Candidature()
                        {
                            AnnonceId = AnnonceId,
                            CV = CVPath,
                            Mail = createCandidatureDto.Mail,
                            Nom = createCandidatureDto.Nom,
                            NumTel = createCandidatureDto.NumTel,

                        };
                        await apiDbContext.Candidatures.AddAsync(candidature);
                        await apiDbContext.SaveChangesAsync();
                        return candidature;
                    }
                    Console.WriteLine("file probleme");
                    return null;
                }
                Console.WriteLine("mail probleme");
                return null;
            }
            Console.WriteLine("Annoncenotfound");
            return null;

        }

        public async Task<CandidatureUrgent> Refuser(int Id)
        {
            Candidature? candidature = await apiDbContext.Candidatures.FirstOrDefaultAsync(x => x.Id == Id);
            Mail mail = new Mail()
            {
                To = candidature.Mail,
                Subject = "Reponse A votre Candidature",
                Body = await candidature.Nom.RefueMail()
            };
            if (await mail.SendMailAsync(fluentEmail))
            {
                CandidatureUrgent candidatureUrgent = new CandidatureUrgent()
                {
                    CV = candidature.CV,
                    Mail = candidature.Mail,
                    Nom = candidature.Nom,
                    Status = candidature.Status,
                    NumTel = candidature.NumTel,
                };
                await apiDbContext.CandidatureUrgents.AddAsync(candidatureUrgent);
                candidature.Status = CandidatureStatus.Refuser;
                await apiDbContext.SaveChangesAsync();
                return candidatureUrgent;
            }
            return null;
        }

        public async Task<Candidature> Selectionner(int Id, DateTime dateTime)
        {
            Candidature? candidature = await apiDbContext.Candidatures.FirstOrDefaultAsync(x => x.Id == Id);
            if (candidature == null)
                return null;
            else
            {
                Mail mail = new Mail()
                {
                    To = candidature.Mail,
                    Body = await candidature.Nom.EntretienMail(dateTime),
                    Subject = "Convocation à un entretien"
                };
                if (await mail.SendMailAsync(fluentEmail))
                {
                    candidature.Status = CandidatureStatus.Selectionner;

                    await apiDbContext.SaveChangesAsync();
                    return candidature;
                }
                return null;
            }
        }
    }
}