using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Recrutement;
using api.extensions;
using api.interfaces;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class RecrutementRepository : IRecrutementRepository
    {
        private readonly ApiDbContext apiDbContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        public RecrutementRepository(ApiDbContext apiDbContext, IWebHostEnvironment webHostEnvironment)
        {
            this.apiDbContext = apiDbContext;
            this.webHostEnvironment = webHostEnvironment;
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
            return await apiDbContext.Annonces.FirstOrDefaultAsync(x => x.Id == Id);
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

        public async Task<Candidature> Postuler(CreateCandidatureDto createCandidatureDto, int AnnonceId)
        {
            Annonce? annonce = await apiDbContext.Annonces.Include(x => x.Candidatures).FirstOrDefaultAsync(x => x.Id == AnnonceId);
            if (annonce != null && annonce.Candidatures.Count() < annonce.NmbrMax && annonce.Deadline > DateTime.Now)
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
                return null;
            }
            return null;

        }

        public Task<CandidatureUrgent> Refuser(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<Candidature> Selectionner(int Id)
        {
            throw new NotImplementedException();
        }
    }
}