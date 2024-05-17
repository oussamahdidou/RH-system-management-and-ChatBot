using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Recrutement
{
    public class CreateCandidatureDto
    {
        public string Nom { get; set; } = "";
        public string Mail { get; set; } = "";
        public string NumTel { get; set; } = "";
        public IFormFile? CV { get; set; }
    }
}
