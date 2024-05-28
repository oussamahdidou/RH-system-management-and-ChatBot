using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class UpdateImageDto
    {
        public IFormFile image { get; set; }
    }
}