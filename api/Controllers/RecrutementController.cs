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
        [HttpPost]
        public async Task<IActionResult> Index([FromBody] Mail mail)
        {
            throw new NotImplementedException();
        }
    }
}