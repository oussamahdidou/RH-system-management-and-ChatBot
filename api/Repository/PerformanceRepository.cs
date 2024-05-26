using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Abscence;
using api.Dtos.Conges;
using api.Dtos.Heuresupplimentaire;
using api.extensions;
using api.helpers;
using api.interfaces;
using api.Model;
using iText.Layout.Element;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PerformanceRepository : IPerformanceRepository
    {
        private readonly ApiDbContext apiDbContext;
        private readonly ICongesRepository congesRepository;
        public PerformanceRepository(ApiDbContext apiDbContext, ICongesRepository congesRepository)
        {
            this.apiDbContext = apiDbContext;
            this.congesRepository = congesRepository;
        }
        public async Task<Abscence> AddAbscence(CreateAbscenceDto createAbscenceDto)
        {

            if (await congesRepository.EnConges(new EnCongesDto() { EmployerId = createAbscenceDto.EmployerId }))
            {
                return null;

            }
            Abscence abscence = new Abscence()
            {
                AppUserId = createAbscenceDto.EmployerId,
                Date = createAbscenceDto.dateTime,
            };
            await apiDbContext.Abscences.AddAsync(abscence);
            await apiDbContext.SaveChangesAsync();
            return abscence;

        }

        public async Task<Heuresupplimentaires> AddHeuressupplimentaires(CreateHeuresupplimentaire createHeuresupplimentaire)
        {
            Heuresupplimentaires heuresupplimentaires = new Heuresupplimentaires()
            {
                AppUserId = createHeuresupplimentaire.EmployerId,
                DateTime = createHeuresupplimentaire.dateTime,
            };
            await apiDbContext.Heuresupplimentaires.AddAsync(heuresupplimentaires);
            await apiDbContext.SaveChangesAsync();
            return heuresupplimentaires;
        }

        public async Task<List<AbscencesChartsDto>> GetAbscencesCharts()
        {
            List<(int year, int month)> months = DateTimeExtensions.GetLastFiveMonths();
            List<AbscencesChartsDto> abscencesChartsDtos = new List<AbscencesChartsDto>();
            foreach (var item in months)
            {
                List<Abscence> abscences = await apiDbContext.Abscences
                                            .Where(x => x.Date.Month == item.month
                                             && x.Date.Year == item.year)
                                            .ToListAsync();
                abscencesChartsDtos.Add(new AbscencesChartsDto()
                {
                    Date = @$"{item.month}/{item.year}",
                    Abscences = abscences.Count()
                });
            }


            return abscencesChartsDtos;
        }

        public async Task<List<AbscencesChartsDto>> GetAbscencesChartsByUser(string EmployerId)
        {
            List<(int year, int month)> months = DateTimeExtensions.GetLastFiveMonths();
            List<AbscencesChartsDto> abscencesChartsDtos = new List<AbscencesChartsDto>();
            foreach (var item in months)
            {
                List<Abscence> abscences = await apiDbContext.Abscences
                                            .Where(x => x.Date.Month == item.month
                                             && x.Date.Year == item.year && x.AppUserId == EmployerId)
                                            .ToListAsync();
                abscencesChartsDtos.Add(new AbscencesChartsDto()
                {
                    Date = @$"{item.month}/{item.year}",
                    Abscences = abscences.Count()
                });
            }


            return abscencesChartsDtos;
        }

        public async Task<List<HeuresSupplimentairesChartsDto>> GetHeuresSupplimentairesCharts()
        {
            List<(int year, int month)> months = DateTimeExtensions.GetLastFiveMonths();
            List<HeuresSupplimentairesChartsDto> heuresupplimentairesChartsDtos = new List<HeuresSupplimentairesChartsDto>();
            foreach (var item in months)
            {
                List<Heuresupplimentaires> heuresupplimentaires = await apiDbContext.Heuresupplimentaires
                                            .Where(x => x.DateTime.Month == item.month
                                             && x.DateTime.Year == item.year)
                                            .ToListAsync();
                heuresupplimentairesChartsDtos.Add(new HeuresSupplimentairesChartsDto()
                {
                    Date = @$"{item.month}/{item.year}",
                    heuresupplimentaires = heuresupplimentaires.Count()
                });
            }


            return heuresupplimentairesChartsDtos;
        }

        public async Task<List<HeuresSupplimentairesChartsDto>> GetHeuresSupplimentairesChartsByUser(string EmployerId)
        {
            List<(int year, int month)> months = DateTimeExtensions.GetLastFiveMonths();
            List<HeuresSupplimentairesChartsDto> heuresSupplimentairesChartsDtos = new List<HeuresSupplimentairesChartsDto>();
            foreach (var item in months)
            {
                List<Heuresupplimentaires> heuresupplimentaires = await apiDbContext.Heuresupplimentaires
                                            .Where(x => x.DateTime.Month == item.month
                                             && x.DateTime.Year == item.year && x.AppUserId == EmployerId)
                                            .ToListAsync();
                heuresSupplimentairesChartsDtos.Add(new HeuresSupplimentairesChartsDto()
                {
                    Date = @$"{item.month}/{item.year}",
                    heuresupplimentaires = heuresupplimentaires.Count()
                });
            }


            return heuresSupplimentairesChartsDtos;
        }

        public async Task<Abscence> JustifyAbscence(int AbscenceId)
        {
            Abscence? abscence = await apiDbContext.Abscences.FirstOrDefaultAsync(x => x.Id == AbscenceId);
            if (abscence == null)
            {
                return null;
            }
            abscence.Status = Abscencestatues.Justifier;
            await apiDbContext.SaveChangesAsync();
            return abscence;
        }


    }
}