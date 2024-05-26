using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stats
{
    public class StatsDto
    {
        public int Abscences { get; set; }
        public int Conges { get; set; }
        public int Surtemps { get; set; }
        public int Employers { get; set; }
    }
}