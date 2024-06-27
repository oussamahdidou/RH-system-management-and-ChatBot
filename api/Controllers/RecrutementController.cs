using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recrutement;
using api.extensions;
using api.generique;
using api.helpers;
using api.interfaces;
using api.Model;
using api.Repository;
using FluentEmail.Core;
using Microsoft.AspNetCore.Http.HttpResults;
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
            Result<Annonce> result = await recrutementRepository.CreateAnnonceAsync(createAnnonceDto);
            if (result.IsSuccess)
                return Ok(result.Value);

            return BadRequest(result.Error);
        }
        [HttpPost("Candidature/{AnnonceId:int}")]
        public async Task<IActionResult> Postuler([FromForm] CreateCandidatureDto createCandidatureDto, [FromRoute] int AnnonceId)
        {
            Result<Candidature> result = await recrutementRepository.Postuler(createCandidatureDto, AnnonceId);
            if (result.IsSuccess)
                return Ok(result.Value);

            return BadRequest(result.Error);
        }
        [HttpGet("Refuser/{Id:int}")]
        public async Task<IActionResult> Refuser([FromRoute] int Id)
        {
            Result<CandidatureUrgent> result = await recrutementRepository.Refuser(Id);
            if (result.IsSuccess)
                return Ok(result.Value);

            return BadRequest(result.Error);

        }
        [HttpPost("Selectionner")]
        public async Task<IActionResult> Selectionner([FromBody] CreateEntretien createEntretien)
        {
            Result<Candidature> result = await recrutementRepository.Selectionner(createEntretien.Id, createEntretien.dateTime);
            if (result.IsSuccess)
                return Ok(result.Value);
            return BadRequest(result.Error);
        }
        [HttpGet("Annonces")]
        public async Task<IActionResult> GetAnnonces()
        {
            Result<List<Annonce>> result = await recrutementRepository.GetAnnoncesAsync();
            if (result.IsSuccess)
                return Ok(result.Value);
            return BadRequest(result.Error);
        }
        [HttpGet("Annonces/{id:int}")]
        public async Task<IActionResult> GetAnnonceById([FromRoute] int id)
        {
            Result<Annonce> result = await recrutementRepository.GetAnnonceByIdAsync(id);
            if (result.IsSuccess)
                return Ok(result.Value);
            return BadRequest(result.Error);
        }
        [HttpGet("Candidature/{id:int}")]
        public async Task<IActionResult> GetCandidatureById([FromRoute] int id)
        {
            Result<Candidature> result = await recrutementRepository.GetCandidatureById(id);
            if (result.IsSuccess)
                return Ok(result.Value);
            return BadRequest(result.Error);
        }
        [HttpGet("Jobs")]
        public async Task<IActionResult> GetJobs()
        {
            Result<List<Annonce>> result = await recrutementRepository.GetDisponibleAnnonces();
            if (result.IsSuccess)
                return Ok(result.Value);
            return BadRequest(result.Error);
        }
    }

}