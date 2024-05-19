using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Abscence
{
    public class CreateAbscenceDto
    {
        public string? EmployerId { get; set; }
        public DateTime dateTime { get; set; }
    }
}