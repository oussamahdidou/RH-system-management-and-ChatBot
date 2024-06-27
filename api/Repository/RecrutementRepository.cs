using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Recrutement;
using api.extensions;
using api.generique;
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
        public async Task<Result<Annonce>> CreateAnnonceAsync(CreateAnnonceDto createAnnonceDto)
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
            return Result<Annonce>.Success(annonce);
        }

        public async Task<Result<Annonce>> GetAnnonceByIdAsync(int Id)
        {
            Annonce? annonce = await apiDbContext.Annonces.Include(x => x.Candidatures).FirstOrDefaultAsync(x => x.Id == Id);
            if (annonce == null)
            {
                return Result<Annonce>.Failure("Annonce Not Found");
            }
            return Result<Annonce>.Success(annonce);
        }

        public async Task<Result<List<Annonce>>> GetAnnoncesAsync()
        {
            return Result<List<Annonce>>.Success(await apiDbContext.Annonces.ToListAsync());
        }

        public async Task<Result<Candidature>> GetCandidatureById(int Id)
        {
            Candidature? candidature = await apiDbContext.Candidatures.FirstOrDefaultAsync(x => x.Id == Id);
            if (candidature == null)
            {
                return Result<Candidature>.Failure("Candidature notfound");
            }
            return Result<Candidature>.Success(candidature);
        }

        public async Task<Result<List<Candidature>>> GetCandidaturesAsync(int Id)
        {
            List<Candidature> candidatures = await apiDbContext.Candidatures.Where(x => x.AnnonceId == Id).ToListAsync();
            return Result<List<Candidature>>.Success(candidatures);
        }

        public async Task<Result<List<Annonce>>> GetDisponibleAnnonces()
        {
            return Result<List<Annonce>>.Success(await apiDbContext.Annonces.Include(x => x.Candidatures).Where(x => x.Candidatures.Count() < x.NmbrMax && x.Deadline > DateTime.Now).ToListAsync());
        }

        public async Task<Result<Candidature>> Integrer(int Id)
        {
            Candidature? candidature = await apiDbContext.Candidatures.FirstOrDefaultAsync(x => x.Id == Id);
            if (candidature == null)
                return Result<Candidature>.Failure("Candidature NotFound");
            else
            {

                candidature.Status = CandidatureStatus.Integrer;

                await apiDbContext.SaveChangesAsync();
                return Result<Candidature>.Success(candidature);

            }
        }

        public async Task<Result<Candidature>> Postuler(CreateCandidatureDto createCandidatureDto, int AnnonceId)
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
                        return Result<Candidature>.Success(candidature);
                    }
                    Console.WriteLine("file probleme");
                    return Result<Candidature>.Failure("error in file upload");
                }
                return Result<Candidature>.Failure("error in mailing");
            }
            Console.WriteLine("Annoncenotfound");
            return Result<Candidature>.Failure("annonce notfound");


        }

        public async Task<Result<CandidatureUrgent>> Refuser(int Id)
        {
            Candidature? candidature = await apiDbContext.Candidatures.FirstOrDefaultAsync(x => x.Id == Id);
            if (candidature != null)
            {

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
                    return Result<CandidatureUrgent>.Success(candidatureUrgent);
                }
                return Result<CandidatureUrgent>.Failure("error in mailing");
            }
            return Result<CandidatureUrgent>.Failure("candidature notfound");

        }

        public async Task<Result<Candidature>> Selectionner(int Id, DateTime dateTime)
        {
            Candidature? candidature = await apiDbContext.Candidatures.FirstOrDefaultAsync(x => x.Id == Id);
            if (candidature == null)
                return Result<Candidature>.Failure("candidature notfound");
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
                    return Result<Candidature>.Success(candidature);
                }
                return Result<Candidature>.Failure("error in mailing");
            }
        }
    }
}