using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Dtos.Recrutement;
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
this is your password {model.Password} to integrate our plateforme so you can 
Dans l'attente de votre réponse positive,

Cordialement,

";
        }
        public static async Task<string> PostuleMail(this CreateCandidatureDto model)
        {
            return $@"
Madame/Monsieur {model.Nom},

Nous avons Recu votre candidature s`integreer au sein de notre entreprise a été retenue. on vas vous repondre dans les plus court delai si votre demande a ete accepter ou non+

Cordialement,

";
        }
        public static async Task<string> EntretienMail(this string Username, DateTime date)
        {
            return $@"
Bonjour {Username},

Nous avons le plaisir de vous informer que votre candidature a été retenue pour un entretien. Nous vous invitons donc à nous rejoindre le {date}  au Local de l`entreprise.

Nous vous remercions pour votre intérêt et restons à votre disposition pour toute question.

Cordialement,



";
        }
        public static async Task<string> RefueMail(this string Username)
        {
            return $@"
Bonjour {Username},

Nous vous remercions d'avoir postulé au sein de notre entreprise. Après examen attentif de votre candidature, nous regrettons de vous informer que nous n'avons pas retenu votre profil pour ce poste.

Cependant, nous conservons vos coordonnées et ne manquerons pas de vous recontacter en cas de besoin urgent correspondant à vos compétences.

Nous vous souhaitons beaucoup de succès dans vos recherches futures.

Cordialement,



";
        }
        public static async Task<string> RefusCongesMail(this string Username, DateTime datedebut, DateTime datefin)
        {
            return @$"Bonjour {Username},

Je vous remercie pour votre demande de congé du{datedebut.Date} au{datefin.Date}.Après avoir examiné votre demande et pris en compte les besoins opérationnels actuels de l'entreprise, je suis au regret de vous informer que je ne peux pas approuver votre congé à cette période.";
        }
        public static async Task<string> ApprouverCongesMail(this string Username, DateTime datedebut, DateTime datefin)
        {
            return @$"Bonjour {Username},

Je vous écris pour confirmer que votre demande de congé du {datedebut.Date} au {datefin.Date} a été approuvée. Nous avons pris les dispositions nécessaires pour assurer la continuité des activités pendant votre absence.

Je vous souhaite de profiter pleinement de cette période de repos. N'hésitez pas à nous contacter si vous avez besoin de quoi que ce soit avant votre départ.";
        }


    }
}