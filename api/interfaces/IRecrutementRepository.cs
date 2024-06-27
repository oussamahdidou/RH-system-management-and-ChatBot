using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recrutement;
using api.generique;
using api.Model;

namespace api.interfaces
{
    public interface IRecrutementRepository
    {
        Task<Result<Annonce>> CreateAnnonceAsync(CreateAnnonceDto createAnnonceDto);
        Task<Result<List<Annonce>>> GetAnnoncesAsync();
        Task<Result<Annonce>> GetAnnonceByIdAsync(int Id);
        Task<Result<Candidature>> Postuler(CreateCandidatureDto createCandidatureDto, int AnnonceId);
        Task<Result<List<Candidature>>> GetCandidaturesAsync(int Id);
        Task<Result<Candidature>> GetCandidatureById(int Id);
        Task<Result<Candidature>> Selectionner(int Id, DateTime dateTime);
        Task<Result<CandidatureUrgent>> Refuser(int Id);
        Task<Result<Candidature>> Integrer(int Id);
        Task<Result<List<Annonce>>> GetDisponibleAnnonces();


    }
}