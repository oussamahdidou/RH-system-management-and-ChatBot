using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Conges;
using api.extensions;
using api.generique;
using api.interfaces;
using api.Model;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CongesController : ControllerBase
    {
        private readonly ICongesRepository congesRepository;
        private readonly UserManager<AppUser> userManager;
        public CongesController(ICongesRepository congesRepository, UserManager<AppUser> userManager)
        {
            this.congesRepository = congesRepository;
            this.userManager = userManager;
        }
        [HttpGet("{EmployerId}")]
        public async Task<IActionResult> GetConges([FromRoute] string EmployerId)
        {

            return Ok(await congesRepository.CongesAnnuelleAuthorisee(EmployerId));
        }
        [HttpGet("Approuver/{id:int}")]
        public async Task<IActionResult> Approuver([FromRoute] int id)
        {
            Result<Conges> result = await congesRepository.ApprouverConges(id);
            if (result.IsSuccess)
                return Ok(result.Value);
            return NotFound(result.Error);
        }
        [HttpGet("Refuser/{id:int}")]
        public async Task<IActionResult> Refuser([FromRoute] int id)
        {
            Result<Conges> result = await congesRepository.RefuserConges(id);
            if (result.IsSuccess)
                return Ok(result.Value);
            return NotFound(result.Error);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> DemanderConges([FromBody] CreateCongesDto createCongesDto)
        {
            string username = User.GetUsername();
            AppUser? user = await userManager.FindByNameAsync(username);
            if (user == null)
            {
                return BadRequest("user notfound");
            }
            string userId = user.Id;
            Result<Conges> conges = await congesRepository.DemaderConger(createCongesDto, userId);
            if (conges.IsSuccess)
            {
                return Ok(conges.Value);
            }
            else
            {
                return BadRequest(conges.Error);
            }

        }
        [HttpGet]
        public async Task<IActionResult> GetConges()
        {
            Result<List<GetCongesDto>> result = await congesRepository.GetConges();
            if (result.IsSuccess)
                return Ok(result.Value);
            return NotFound(result.Error);
        }

    }
}