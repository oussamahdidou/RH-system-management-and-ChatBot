using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Abscence;
using api.Dtos.Heuresupplimentaire;
using api.Dtos.Stats;
using api.generique;
using api.Model;

namespace api.interfaces
{
    public interface IPerformanceRepository
    {
        Task<Result<Heuresupplimentaires>> AddHeuressupplimentaires(CreateHeuresupplimentaire createHeuresupplimentaire);
        Task<Result<Abscence>> AddAbscence(CreateAbscenceDto createAbscenceDto);
        Task<Result<Abscence>> JustifyAbscence(int AbscenceId);
        Task<Result<List<AbscencesChartsDto>>> GetAbscencesCharts();
        Task<Result<List<AbscencesChartsDto>>> GetAbscencesChartsByUser(string EmployerId);

        Task<Result<List<HeuresSupplimentairesChartsDto>>> GetHeuresSupplimentairesCharts();
        Task<Result<List<HeuresSupplimentairesChartsDto>>> GetHeuresSupplimentairesChartsByUser(string EmployerId);
        Task<Result<StatsDto>> GetStats();
        Task<Result<List<GetAbscencesDto>>> GetAllAbscences();
    }
}