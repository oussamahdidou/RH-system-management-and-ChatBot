using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Abscence;
using api.Dtos.Heuresupplimentaire;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerformanceController : ControllerBase
    {
        private readonly IPerformanceRepository performanceRepository;
        public PerformanceController(IPerformanceRepository performanceRepository)
        {
            this.performanceRepository = performanceRepository;
        }
        [HttpPost("Abscence")]
        public async Task<IActionResult> AddAbscence([FromBody] CreateAbscenceDto createAbscenceDto)
        {
            Abscence? abscence = await performanceRepository.AddAbscence(createAbscenceDto);
            if (abscence == null)
            {
                return BadRequest("Something went wrong");
            }
            return Ok(abscence);
        }
        [HttpPut("Justify/{AbscenceId:int}")]
        public async Task<IActionResult> JustifyAbscence(int AbscenceId)
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
            Heuresupplimentaires? heuresupplimentaires = await performanceRepository.AddHeuressupplimentaires(createHeuresupplimentaire);
            if (heuresupplimentaires == null)
            {
                return BadRequest("Something went wrong");
            }
            return Ok(heuresupplimentaires);
        }
    }
}