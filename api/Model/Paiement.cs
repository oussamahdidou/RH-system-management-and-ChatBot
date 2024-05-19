using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Paiement
    {
        [Key]
        public int Id { get; set; }
        public int Annee { get; set; }
        public int Mois { get; set; }
        public double SalaireDeBase { get; set; }
        public double Prime { get; set; }
        public int Nmbrheursupplimentaires { get; set; }
        public int NmbrAbscences { get; set; }
        public double ImpotSurSalaire { get; set; }
        public double CNSS { get; set; }
        public double AMO { get; set; }
        public string FicheDePaie { get; set; } = "";
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }

    }
}