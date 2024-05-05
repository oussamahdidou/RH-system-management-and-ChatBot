using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Recrutement
{
    public class CreateAnnonceDto
    {
        public string Titre { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime Deadline { get; set; }
        public int NmbrMax { get; set; }

    }
}