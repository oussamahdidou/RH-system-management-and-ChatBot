using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Conges
{
    public class EnCongesDto
    {
        public string? EmployerId { get; set; }
        public DateTime Time { get; set; } = DateTime.Now;
    }
}