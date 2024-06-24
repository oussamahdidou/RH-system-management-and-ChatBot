using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Conges;
using api.generique;
using api.Model;

namespace api.interfaces
{
    public interface ICongesRepository
    {
        Task<Result<Conges>> DemaderConger(CreateCongesDto createConges, string EmployerId);
        Task<Result<Conges>> ApprouverConges(int CongesId);
        Task<Result<Conges>> RefuserConges(int CongesId);
        Task<bool> EnConges(EnCongesDto enCongesDto);
        Task<int> CongesAnnuelleAuthorisee(string EmployerId);
        Task<Result<List<GetCongesDto>>> GetConges();
    }
}