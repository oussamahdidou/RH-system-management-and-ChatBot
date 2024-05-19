using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Heuresupplimentaire
{
    public class CreateHeuresupplimentaire
    {
        public string? EmployerId { get; set; }
        public DateTime dateTime { get; set; }
    }
}