using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

            return response.Successful;
        }
    }
}