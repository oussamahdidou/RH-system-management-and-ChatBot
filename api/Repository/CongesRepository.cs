using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Conges;
using api.extensions;
using api.generique;
using api.helpers;
using api.interfaces;
using api.Model;
using FluentEmail.Core;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CongesRepository : ICongesRepository
    {
        private readonly ApiDbContext apiDbContext;
        private readonly IFluentEmail fluentEmail;
        public CongesRepository(ApiDbContext apiDbContext, IFluentEmail fluentEmail)
        {
            this.apiDbContext = apiDbContext;
            this.fluentEmail = fluentEmail;
        }
        public async Task<Result<Conges>> ApprouverConges(int CongesId)
        {
            Conges? conges = await apiDbContext.Conges.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == CongesId);
            if (conges == null)
            {
                return Result<Conges>.Failure("Conges not found");
            }
            conges.Status = CongesStatus.Approuver;
            await apiDbContext.SaveChangesAsync();
            Mail mail = new Mail()
            {
                To = conges.AppUser.Email,
                Body = await conges.AppUser.UserName.ApprouverCongesMail(conges.DateDebut, conges.Datefin),
                Subject = "Acceptation de Demande de Conges"
            };
            await mail.SendMailAsync(fluentEmail);
            return Result<Conges>.Success(conges);
        }

        public async Task<Result<Conges>> DemaderConger(CreateCongesDto createConges, string EmployerId)
        {

            Conges conges = new Conges()
            {
                AppUserId = EmployerId,
                DateDebut = createConges.DateDebut,
                Duree = createConges.Duree,
                Datefin = createConges.DateDebut.AddDays(createConges.Duree),
                Type = createConges.Type,
            };



            await apiDbContext.Conges.AddAsync(conges);
            await apiDbContext.SaveChangesAsync();
            return Result<Conges>.Success(conges);
        }

        public async Task<Result<Conges>> RefuserConges(int CongesId)
        {
            Conges? conges = await apiDbContext.Conges.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == CongesId);
            if (conges == null)
            {
                return Result<Conges>.Failure("Conges notfound");
            }
            conges.Status = CongesStatus.Refuser;
            await apiDbContext.SaveChangesAsync();
            Mail mail = new Mail()
            {
                To = conges.AppUser.Email,
                Body = await conges.AppUser.UserName.RefusCongesMail(conges.DateDebut, conges.Datefin),
                Subject = "Refus de Demande de Conges"
            };
            await mail.SendMailAsync(fluentEmail);
            return Result<Conges>.Success(conges);

        }
        public async Task<bool> EnConges(EnCongesDto enCongesDto)
        {
            return await apiDbContext
                        .Conges
                        .AnyAsync(x =>
                        x.AppUserId == enCongesDto.EmployerId
                        && enCongesDto.Time >= x.DateDebut
                        && enCongesDto.Time <= x.Datefin);
        }

        public async Task<int> CongesAnnuelleAuthorisee(string EmployerId)
        {
            List<Conges> conges = await apiDbContext.Conges.Where(x => x.AppUserId == EmployerId && x.Status == CongesStatus.Approuver && x.Type == CongesTypes.CongesAnnuel).ToListAsync();
            int somme = 0;
            foreach (var item in conges)
            {
                somme = somme + item.Duree;
            }
            return somme;
        }

        public async Task<Result<List<GetCongesDto>>> GetConges()
        {
            List<GetCongesDto> getCongesDtos = await apiDbContext.Conges.Include(x => x.AppUser).Select(x => x.getCongesDtoFromModelToDto()).ToListAsync();
            return Result<List<GetCongesDto>>.Success(getCongesDtos);
        }
    }
}