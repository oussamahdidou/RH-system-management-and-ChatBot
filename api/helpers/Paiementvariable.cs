using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.helpers
{
    public class Paiementvariable
    {
        public string? Name { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int NombreAbsences { get; set; }
        public int NombreHeuresSupplementaires { get; set; }
        public double SalaireDeBasePerHour { get; set; }
        public double SalaireDeBase { get; set; }
        public double TauxHeuresSupplementaires { get; set; }
        public double MontantHeuresSupplementaires { get; set; }
        public double ReductionAbsence { get; set; }
        public double SalaireBrut { get; set; }
        public double TauxPrime { get; set; }
        public double SalaireBrutImposable { get; set; }
        public double TauxImpot { get; set; }
        public double SalaireNetImposable { get; set; }
        public double SalaireNet { get; set; }
    }
}