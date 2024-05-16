using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.helpers;
using FluentEmail.Core;
using FluentEmail.Core.Models;

namespace api.extensions
{
    public static class MailExtensions
    {


        public static async Task<bool> SendMailAsync(this Mail mail, IFluentEmail _fluentEmail)
        {
            SendResponse response = await _fluentEmail
            .To(mail.To)
            .Subject(mail.Subject)
            .Body(mail.Body)
            .SendAsync();
            Console.WriteLine("mail was send successufully");
            return response.Successful;
        }
        public static async Task<string> IntegrationMail(this RegistrationDto model)
        {
            return $@"
Madame/Monsieur {model.Username},

Nous avons le plaisir de vous annoncer que votre candidature pour le poste de {model.Poste} au sein de notre entreprise a été retenue. Nous avons été particulièrement impressionnés par votre expérience et vos compétences, et nous sommes convaincus que vous apporterez une valeur ajoutée à notre équipe.

Voici les détails de votre offre d'emploi :

- **Poste :** {model.Poste}
- **Date de début :** {model.IntegrationDate.Date}
- **Salaire :** {model.SalaireDeBase}
Nous sommes impatients de vous accueillir parmi nous et nous espérons que vous partagerez notre enthousiasme pour ce nouveau défi. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à tout moment.

Dans l'attente de votre réponse positive,

Cordialement,

";
        }
    }
}