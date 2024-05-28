using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Conges
{
    public class GetCongesDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public int Duree { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
    }
}