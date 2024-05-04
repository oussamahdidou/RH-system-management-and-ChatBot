using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Model
{
    public class AppUser : IdentityUser
    {
        public string Nom { get; set; } = "";
        public string Mail { get; set; } = "";
        public string NumTel { get; set; } = "";
        public float SalaireDeBase { get; set; }
        public DateTime IntegrationDate { get; set; }
        public string? Poste { get; set; }
    }
}