using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Abscence;
using api.Dtos.Heuresupplimentaire;
using api.Dtos.Stats;
using api.extensions;
using api.generique;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerformanceController : ControllerBase
    {
        private readonly IPerformanceRepository performanceRepository;
        private readonly UserManager<AppUser> userManager;
        public PerformanceController(IPerformanceRepository performanceRepository, UserManager<AppUser> userManager)
        {
            this.performanceRepository = performanceRepository;
            this.userManager = userManager;
        }
        [HttpPost("AddAbscence")]
        public async Task<IActionResult> AddAbscence([FromBody] CreateAbscenceDto createAbscenceDto)
        {
            if (!await userManager.Users.AnyAsync(u => u.Id == createAbscenceDto.EmployerId))
            {
                return BadRequest("user don`t exist");
            }


            Result<Abscence> abscence = await performanceRepository.AddAbscence(createAbscenceDto);
            if (abscence.IsSuccess)
            {
                return Ok(abscence.Value);
            }
            return BadRequest(abscence.Error);

        }
        [HttpGet("Justify/{AbscenceId:int}")]
        public async Task<IActionResult> JustifyAbscence([FromRoute] int AbscenceId)
        {
            Result<Abscence> abscence = await performanceRepository.JustifyAbscence(AbscenceId);
            if (abscence.IsSuccess)
            {
                return Ok(abscence.Value);
            }
            return BadRequest(abscence.Error);
        }
        [HttpPost("Heuressupplimentaire")]
        public async Task<IActionResult> AddHeuresupplimentaire([FromBody] CreateHeuresupplimentaire createHeuresupplimentaire)
        {
            if (!await userManager.Users.AnyAsync(x => x.Id == createHeuresupplimentaire.EmployerId))
            {
                return BadRequest("no user exist");
            }
            Result<Heuresupplimentaires> heuresupplimentaires = await performanceRepository.AddHeuressupplimentaires(createHeuresupplimentaire);
            if (heuresupplimentaires.IsSuccess)
            {
                return Ok(heuresupplimentaires.Value);

            }
            return BadRequest(heuresupplimentaires.Error);

        }
        [HttpGet("Charts/Abscences")]
        public async Task<IActionResult> GetAbscencesCharts()
        {
            Result<List<AbscencesChartsDto>> result = await performanceRepository.GetAbscencesCharts();
            if (result.IsSuccess)
            {
                return Ok(result.Value);

            }
            return BadRequest(result.Error);
        }
        [HttpGet("Charts/Abscences/{id}")]
        public async Task<IActionResult> GetAbscencesChartsByUser([FromRoute] string id)
        {
            Result<List<AbscencesChartsDto>> result = await performanceRepository.GetAbscencesChartsByUser(id);
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Error);

        }
        [HttpGet("Charts/Surtemps")]
        public async Task<IActionResult> GetSurtempsCharts()
        {

            Result<List<HeuresSupplimentairesChartsDto>> result = await performanceRepository.GetHeuresSupplimentairesCharts();
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Error);
        }
        [HttpGet("Charts/Surtemps/{id}")]
        public async Task<IActionResult> GetSurtempsChartsByUser([FromRoute] string id)
        {
            Result<List<HeuresSupplimentairesChartsDto>> result = await performanceRepository.GetHeuresSupplimentairesChartsByUser(id);
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Error);
        }
        [HttpGet("Charts/Surtemps/Employers")]
        public async Task<IActionResult> TopSurTempsEmployers()
        {
            try
            {
                List<AppUser> Users = await userManager.Users.Include(u => u.Heuresupplimentaires)
                               .OrderByDescending(u => u.Heuresupplimentaires.Count)
                               .Take(4)
                               .ToListAsync();

                return Ok(Users.Select(x => x.TopSurTempsfromModelToDto()));

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Charts/Abscences/Employers")]
        public async Task<IActionResult> TopAbscencesEmployers()
        {
            try
            {

                List<AppUser> Users = await userManager.Users.Include(u => u.Abscences)
                               .OrderByDescending(u => u.Abscences.Count)
                               .Take(4)
                               .ToListAsync();
                return Ok(Users.Select(x => x.TopAbscencesfromModelToDto()));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            List<AppUser> appUsers = await userManager.Users.ToListAsync();
            Result<StatsDto> result = await performanceRepository.GetStats();
            result.Value.Employers = appUsers.Count();

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Error);
        }
        [HttpGet("Abscences")]
        public async Task<IActionResult> GetAbscences()
        {
            Result<List<GetAbscencesDto>> result = await performanceRepository.GetAllAbscences();
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Error);
        }
    }
}