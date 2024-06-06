using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recrutement;
using api.Model;

namespace api.interfaces
{
    public interface IRecrutementRepository
    {
        Task<Annonce> CreateAnnonceAsync(CreateAnnonceDto createAnnonceDto);
        Task<List<Annonce>> GetAnnoncesAsync();
        Task<Annonce> GetAnnonceByIdAsync(int Id);
        Task<Candidature> Postuler(CreateCandidatureDto createCandidatureDto, int AnnonceId);
        Task<List<Candidature>> GetCandidaturesAsync(int Id);
        Task<Candidature> GetCandidatureById(int Id);
        Task<Candidature> Selectionner(int Id, DateTime dateTime);
        Task<CandidatureUrgent> Refuser(int Id);
        Task<Candidature> Integrer(int Id);
        Task<List<Annonce>> GetDisponibleAnnonces();


    }
}