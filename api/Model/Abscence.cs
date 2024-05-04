using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.helpers;

namespace api.Model
{
    public class Abscence
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; } = Abscencestatues.EnAttente;
    }
}