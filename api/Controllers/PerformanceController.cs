using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Abscence;
using api.Dtos.Heuresupplimentaire;
using api.Dtos.Stats;
using api.extensions;
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


            Abscence? abscence = await performanceRepository.AddAbscence(createAbscenceDto);
            if (abscence == null)
            {
                return BadRequest("Something went wrong");
            }
            return Ok(abscence);
        }
        [HttpGet("Justify/{AbscenceId:int}")]
        public async Task<IActionResult> JustifyAbscence([FromRoute] int AbscenceId)
        {
            Abscence? abscence = await performanceRepository.JustifyAbscence(AbscenceId);
            if (abscence == null)
            {
                return NotFound("item not found");
            }
            return Ok(abscence);
        }
        [HttpPost("Heuressupplimentaire")]
        public async Task<IActionResult> AddHeuresupplimentaire([FromBody] CreateHeuresupplimentaire createHeuresupplimentaire)
        {
            if (!await userManager.Users.AnyAsync(x => x.Id == createHeuresupplimentaire.EmployerId))
            {
                return BadRequest("no user exist");
            }
            Heuresupplimentaires? heuresupplimentaires = await performanceRepository.AddHeuressupplimentaires(createHeuresupplimentaire);
            if (heuresupplimentaires == null)
            {
                return BadRequest("Something went wrong");
            }
            return Ok(heuresupplimentaires);
        }
        [HttpGet("Charts/Abscences")]
        public async Task<IActionResult> GetAbscencesCharts()
        {
            return Ok(await performanceRepository.GetAbscencesCharts());
        }
        [HttpGet("Charts/Abscences/{id}")]
        public async Task<IActionResult> GetAbscencesChartsByUser([FromRoute] string id)
        {
            return Ok(await performanceRepository.GetAbscencesChartsByUser(id));
        }
        [HttpGet("Charts/Surtemps")]
        public async Task<IActionResult> GetSurtempsCharts()
        {
            return Ok(await performanceRepository.GetHeuresSupplimentairesCharts());
        }
        [HttpGet("Charts/Surtemps/{id}")]
        public async Task<IActionResult> GetSurtempsChartsByUser([FromRoute] string id)
        {
            return Ok(await performanceRepository.GetHeuresSupplimentairesChartsByUser(id));
        }
        [HttpGet("Charts/Surtemps/Employers")]
        public async Task<IActionResult> TopSurTempsEmployers()
        {
            List<AppUser> Users = await userManager.Users.Include(u => u.Heuresupplimentaires)
                               .OrderByDescending(u => u.Heuresupplimentaires.Count)
                               .Take(4)
                               .ToListAsync();
            return Ok(Users.Select(x => x.TopSurTempsfromModelToDto()));

        }
        [HttpGet("Charts/Abscences/Employers")]
        public async Task<IActionResult> TopAbscencesEmployers()
        {
            List<AppUser> Users = await userManager.Users.Include(u => u.Abscences)
                               .OrderByDescending(u => u.Abscences.Count)
                               .Take(4)
                               .ToListAsync();
            return Ok(Users.Select(x => x.TopAbscencesfromModelToDto()));

        }
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            List<AppUser> appUsers = await userManager.Users.ToListAsync();
            StatsDto statsDto = await performanceRepository.GetStats();
            statsDto.Employers = appUsers.Count();
            return Ok(statsDto);
        }
        [HttpGet("Abscences")]
        public async Task<IActionResult> GetAbscences()
        {
            return Ok(await performanceRepository.GetAllAbscences());
        }
    }
}