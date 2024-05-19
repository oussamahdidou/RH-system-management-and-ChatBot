using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recrutement;
using api.extensions;
using api.helpers;
using api.interfaces;
using api.Model;
using FluentEmail.Core;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecrutementController : ControllerBase
    {
        private readonly IRecrutementRepository recrutementRepository;
        public RecrutementController(IRecrutementRepository recrutementRepository)
        {
            this.recrutementRepository = recrutementRepository;
        }

        [HttpPost("Annonce")]
        public async Task<IActionResult> CreateAnnonce([FromBody] CreateAnnonceDto createAnnonceDto)
        {
            Annonce? annonce = await recrutementRepository.CreateAnnonceAsync(createAnnonceDto);
            if (annonce == null)
                return BadRequest("something went wrong");
            return Ok(annonce);
        }
        [HttpPost("Candidature/{AnnonceId:int}")]
        public async Task<IActionResult> Postuler([FromBody] CreateCandidatureDto createCandidatureDto, [FromRoute] int AnnonceId)
        {
            Candidature? candidature = await recrutementRepository.Postuler(createCandidatureDto, AnnonceId);
            if (candidature == null)
                return BadRequest("something went wrong");
            return Ok(candidature);
        }
        [HttpGet("Refuser/{Id:int}")]
        public async Task<IActionResult> Refuser([FromRoute] int Id)
        {
            CandidatureUrgent candidatureUrgent = await recrutementRepository.Refuser(Id);
            if (candidatureUrgent == null)
                return BadRequest("something went wrong");
            return Ok(candidatureUrgent);
        }
        [HttpPost("Selectionner")]
        public async Task<IActionResult> Selectionner([FromRoute] CreateEntretien createEntretien)
        {
            Candidature? candidature = await recrutementRepository.Selectionner(createEntretien.Id, createEntretien.dateTime);
            if (candidature == null)
                return BadRequest("something went wrong");
            return Ok(candidature);
        }
    }
}