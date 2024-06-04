using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Data;

namespace api.Dtos.Account
{
    public class RegistrationDto
    {

        public int Id { get; set; }
        [Required]
        public string? Username { get; set; }
        [Required]
        [EmailAddress]
        public string? EmailAddress { get; set; }
        [Required]
        public string? Password { get; set; }
        public float SalaireDeBase { get; set; }
        public DateTime IntegrationDate { get; set; }
        public string? Poste { get; set; }
        public string Role { get; set; } = UserRoles.Employer;

    }
}