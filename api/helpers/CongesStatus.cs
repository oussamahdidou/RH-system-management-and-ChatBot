using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.helpers
{
    public static class CongesStatus
    {
        public static string EnAttente { get; set; } = "EnAttente";
        public static string Approuver { get; set; } = "Approuver";
        public static string Refuser { get; set; } = "refuser";

    }
}