using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Recrutement
{
    public class CreateEntretien
    {
        public int Id { get; set; }
        public DateTime dateTime { get; set; }
    }
}