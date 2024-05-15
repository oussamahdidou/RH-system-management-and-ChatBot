using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.extensions;
using api.helpers;
using FluentEmail.Core;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecrutementController : ControllerBase
    {
        private readonly IFluentEmail _fluentEmail;

        public RecrutementController(IFluentEmail fluentEmail)
        {
            this._fluentEmail = fluentEmail;
        }
        [HttpPost]
        public async Task<IActionResult> Index([FromBody] Mail mail)
        {
            bool success = await mail.SendMailAsync(_fluentEmail);

            if (success)
            {
                return Ok("Email envoyé avec succès.");
            }
            else
            {
                return BadRequest("Échec de l'envoi de l'email.");
            }
        }
    }
}