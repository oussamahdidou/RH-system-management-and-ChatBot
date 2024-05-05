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
        public List<Heuresupplimentaires> Heuresupplimentaires { get; set; } = new List<Heuresupplimentaires>();
        public List<Abscence> Abscences { get; set; } = new List<Abscence>();
        public List<Paiement> Paiements { get; set; } = new List<Paiement>();
        public List<Conges> Conges { get; set; } = new List<Conges>();
    }
}