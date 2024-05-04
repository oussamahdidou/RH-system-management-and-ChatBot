using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.helpers;

namespace api.Model
{
    public class CandidatureUrgent
    {
        [Key]
        public int Id { get; set; }
        public string Nom { get; set; } = "";
        public string Mail { get; set; } = "";
        public string NumTel { get; set; } = "";
        public string CV { get; set; } = "";
        public string Status { get; set; } = CandidatureStatus.EnAttente;
    }
}