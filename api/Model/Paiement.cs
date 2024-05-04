using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Paiement
    {
        public int Annee { get; set; }
        public int Mois { get; set; }
        public float SalaireDeBase { get; set; }
        public float Prime { get; set; }
        public int Nmbrheursupplimentaires { get; set; }
        public int NmbrAbscences { get; set; }
        public float ImpotSurSalaire { get; set; }
        public float CNSS { get; set; }
        public float AMO { get; set; }
        public string FicheDePaie { get; set; } = "";
    }
}