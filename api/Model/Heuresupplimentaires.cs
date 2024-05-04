using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Heuresupplimentaires
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
    }
}