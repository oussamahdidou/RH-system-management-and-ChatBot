using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Conges;
using api.extensions;
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
            Conges conges = await congesRepository.DemaderConger(createCongesDto, userId);
            if (conges == null)
            { return BadRequest("something went wrong"); }
            return Ok(conges);
        }
        [HttpGet]
        public async Task<IActionResult> GetConges()
        {
            return Ok(await congesRepository.GetConges());
        }
        [HttpGet("Approuver/{id:int}")]
        public async Task<IActionResult> Approuver([FromRoute] int id)
        {
            return Ok(await congesRepository.ApprouverConges(id));
        }
        [HttpGet("Refuser/{id:int}")]
        public async Task<IActionResult> Refuser([FromRoute] int id)
        {
            return Ok(await congesRepository.RefuserConges(id));
        }
    }
}