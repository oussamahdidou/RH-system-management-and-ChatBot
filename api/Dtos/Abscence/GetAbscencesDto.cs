using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Abscence
{
    public class GetAbscencesDto
    {
        public int id { get; set; }
        public string? name { get; set; }
        public DateTime DateTime { get; set; }
        public string? status { get; set; }
    }
}