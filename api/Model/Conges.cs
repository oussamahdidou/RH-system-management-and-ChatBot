using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.helpers;

namespace api.Model
{
    public class Conges
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime Datefin { get; set; }
        public int Duree { get; set; }
        public string Type { get; set; } = "";
        public string Status { get; set; } = CongesStatus.EnAttente;
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }

    }
}