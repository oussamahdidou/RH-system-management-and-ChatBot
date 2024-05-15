using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.helpers
{
    public class Mail
    {
        [EmailAddress]
        [Required]
        public string? To { get; set; }
        [Required]
        [MaxLength(100)]
        public string? Subject { get; set; }
        [Required]
        public string? Body { get; set; }
    }
}