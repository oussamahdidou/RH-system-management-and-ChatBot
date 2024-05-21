using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Conges
{
    public class CreateCongesDto
    {
        public DateTime DateDebut { get; set; }
        public int Duree { get; set; }
        public string Type { get; set; } = "";

    }
}