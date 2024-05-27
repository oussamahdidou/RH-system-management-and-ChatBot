using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Conges;
using api.Model;

namespace api.interfaces
{
    public interface ICongesRepository
    {
        Task<Conges> DemaderConger(CreateCongesDto createConges, string EmployerId);
        Task<Conges> ApprouverConges(int CongesId);
        Task<Conges> RefuserConges(int CongesId);
        Task<bool> EnConges(EnCongesDto enCongesDto);
        Task<int> CongesAnnuelleAuthorisee(string EmployerId);
    }
}