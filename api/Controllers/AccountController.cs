using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Account;
using api.extensions;
using api.helpers;
using api.interfaces;
using api.Model;
using FluentEmail.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly IFluentEmail fluentEmail;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly ITokenService tokenService;
        public AccountController(IWebHostEnvironment webHostEnvironment, IFluentEmail fluentEmail, ITokenService tokenService, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {

            this.tokenService = tokenService;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.fluentEmail = fluentEmail;
            this.webHostEnvironment = webHostEnvironment;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await userManager
                            .Users
                            .FirstOrDefaultAsync(x => x.UserName == loginDto.UserName);
            if (user == null)
                return NotFound("invalid username");
            var userconnected = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!userconnected.Succeeded)
                return NotFound("invalid password");

            return Ok(new NewUserDto()
            {
                Username = user.UserName,
                Email = user.Email,
                Token = await tokenService.CreateToken(user)
            });
        }
        [HttpPost("Register/User")]
        public async Task<IActionResult> RegisterUser([FromBody] RegistrationDto model)
        {
            try
            {
                var appUser = new AppUser()
                {
                    UserName = model.Username,
                    Email = model.EmailAddress,
                    SalaireDeBase = model.SalaireDeBase,
                    Poste = model.Poste,
                    IntegrationDate = model.IntegrationDate,

                };
                var createuser = await userManager.CreateAsync(appUser, model.Password);
                if (createuser.Succeeded)
                {
                    var roleresult = await userManager.AddToRoleAsync(appUser, model.Role);
                    if (roleresult.Succeeded)
                    {
                        Mail mail = new Mail()
                        {
                            To = model.EmailAddress,
                            Body = await model.IntegrationMail(),
                            Subject = "Offre d'Emploi - Félicitations !",
                        };
                        if (await mail.SendMailAsync(fluentEmail))
                            return Ok(new NewUserDto()
                            {
                                Username = appUser.UserName,
                                Email = appUser.Email,
                                Token = await tokenService.CreateToken(appUser)
                            });
                        else
                        {
                            return BadRequest("the email isn`t valide");

                        }
                    }
                    else
                    {
                        return StatusCode(500, roleresult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createuser.Errors);

                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);

            }

        }
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateUserImage([FromForm] UpdateImageDto updateImageDto)
        {
            try
            {
                string UserName = User.GetUsername();
                AppUser? appUser = await userManager.FindByNameAsync(UserName);
                if (appUser == null)
                {
                    return NotFound("userNotfound");
                }

                if (updateImageDto.image == null || updateImageDto.image.Length == 0)
                {
                    return BadRequest("Invalid image file.");
                }

                string imagepath = await updateImageDto.image.UploadImage(webHostEnvironment);
                if (string.IsNullOrEmpty(imagepath))
                {
                    return BadRequest("Failed to upload image.");
                }

                appUser.Image = imagepath;
                var result = await userManager.UpdateAsync(appUser);
                if (result.Succeeded)
                {
                    return Ok(appUser);
                }

                return BadRequest("Something went wrong");
            }
            catch (DecoderFallbackException ex)
            {
                // Log specific exception details
                Console.WriteLine($"DecoderFallbackException: {ex.Message}");
                return StatusCode(500, "Encoding error while processing the request.");
            }
            catch (Exception ex)
            {
                // Log general exception details
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

    }
}