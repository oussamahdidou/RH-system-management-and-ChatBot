using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployersController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        public EmployersController(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }
        [HttpGet("Employers")]
        public async Task<IActionResult> GetAllEmployers()
        {
            List<AppUser> appUsers = userManager.Users.ToList();
            return Ok(appUsers);
        }
        [HttpGet("Employers/{id}")]
        public async Task<IActionResult> GetEmployerById([FromRoute] string id)
        {
            AppUser? appUser = await userManager.FindByIdAsync(id);
            if (appUser == null)
            {
                return Ok("notfound");
            }
            return Ok(appUser);
        }
    }
}