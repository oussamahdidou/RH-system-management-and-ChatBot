using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Abscence;
using api.Dtos.Conges;
using api.Dtos.Heuresupplimentaire;
using api.Model;

namespace api.extensions
{
    public static class Mappers
    {
        public static TopSurTempsDto TopSurTempsfromModelToDto(this AppUser appUser)
        {
            TopSurTempsDto topSurTempsDto = new TopSurTempsDto()
            {
                Username = appUser.UserName,
                Number = appUser.Heuresupplimentaires.Count(),
            };
            return topSurTempsDto;
        }
        public static TopAbscencesDto TopAbscencesfromModelToDto(this AppUser appUser)
        {
            TopAbscencesDto topAbscencesDto = new TopAbscencesDto()
            {
                Username = appUser.UserName,
                Number = appUser.Abscences.Count(),
            };
            return topAbscencesDto;
        }
        public static GetAbscencesDto GetAbscencesfromModelToDto(this Abscence abscence)
        {
            GetAbscencesDto topAbscencesDto = new GetAbscencesDto()
            {
                DateTime = abscence.Date,
                id = abscence.Id,
                name = abscence.AppUser.UserName,
                status = abscence.Status,
            };
            return topAbscencesDto;
        }
        public static GetCongesDto getCongesDtoFromModelToDto(this Conges conges)
        {
            GetCongesDto getCongesDto = new GetCongesDto()
            {
                Id = conges.Id,
                DateDebut = conges.DateDebut,
                DateFin = conges.Datefin,
                Duree = conges.Duree,
                Name = conges.AppUser.UserName,
                Status = conges.Status,
                Type = conges.Type,
            };
            return getCongesDto;
        }
    }
}