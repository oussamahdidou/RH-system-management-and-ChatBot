using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.helpers;
using api.Model;
using System;
using System.IO;
using iText.Html2pdf;
namespace api.extensions
{
    public static class PDFExtensions
    {
        public static (string, string) PaiementFile(this Paiementvariable paiementvariable, IWebHostEnvironment webHostEnvironment)
        {
            string folder = Path.Combine(webHostEnvironment.WebRootPath, "paiebulletin");

            string htmlContent = File.ReadAllText(Path.Combine(webHostEnvironment.WebRootPath, "template.html"));
            htmlContent = htmlContent.Replace("{{DATE}}", paiementvariable.Year + " / " + paiementvariable.Month);
            htmlContent = htmlContent.Replace("{{NOM}}", paiementvariable.Name);
            htmlContent = htmlContent.Replace("{{SALAIRE_DE_BASE_H}}", paiementvariable.SalaireDeBasePerHour.ToString("F2"));
            htmlContent = htmlContent.Replace("{{SALAIRE_DE_BASE}}", paiementvariable.SalaireDeBase.ToString("F2"));
            htmlContent = htmlContent.Replace("{{MONTANT_H_M}}", paiementvariable.TauxHeuresSupplementaires.ToString("F2"));
            htmlContent = htmlContent.Replace("{{HEURES_SUPPLIMENTAIRES_NMBRE}}", paiementvariable.NombreHeuresSupplementaires.ToString("F2"));
            htmlContent = htmlContent.Replace("{{HEURES_SUPPLIMENTAIRES_MONTANT}}", paiementvariable.MontantHeuresSupplementaires.ToString("F2"));
            htmlContent = htmlContent.Replace("{{NMBRE_ABSCENCE}}", paiementvariable.NombreAbsences.ToString("F2"));
            htmlContent = htmlContent.Replace("{{REDUCTION_ABSCENCE}}", paiementvariable.ReductionAbsence.ToString("F2"));
            htmlContent = htmlContent.Replace("{{TAUX_PRIMES}}", paiementvariable.TauxPrime.ToString("F2"));
            htmlContent = htmlContent.Replace("{{MONTANT_PRIMES}}", (paiementvariable.SalaireBrut * paiementvariable.TauxPrime).ToString("F2"));
            htmlContent = htmlContent.Replace("{{SALAIRE_BRUT}}", paiementvariable.SalaireBrut.ToString("F2"));
            htmlContent = htmlContent.Replace("{{SALAIRE_BRUT_IMPOSABLE}}", paiementvariable.SalaireBrutImposable.ToString("F2"));
            htmlContent = htmlContent.Replace("{{TAUX_IMPOT}}", paiementvariable.TauxImpot.ToString("F2"));
            htmlContent = htmlContent.Replace("{{MONTANT_IMPOT}}", (paiementvariable.TauxImpot * paiementvariable.SalaireBrut).ToString("F2"));
            htmlContent = htmlContent.Replace("{{SALAIRE_NET_IMPOSABLE}}", paiementvariable.SalaireNetImposable.ToString("F2"));
            htmlContent = htmlContent.Replace("{{MONTANT_AMO}}", (paiementvariable.SalaireBrutImposable * 0.0226).ToString("F2"));
            htmlContent = htmlContent.Replace("{{MONTANT_CNSS}}", (paiementvariable.SalaireBrutImposable * 0.0448).ToString("F2"));
            htmlContent = htmlContent.Replace("{{SALAIRE_NET}}", paiementvariable.SalaireNet.ToString("F2"));
            string filepath = Path.Combine(folder, paiementvariable.Month + "_" + paiementvariable.Year + "_" + paiementvariable.Name + ".pdf");
            using (var htmlStream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(htmlContent)))
            using (var pdfStream = File.Open(filepath, FileMode.Create))
            {
                HtmlConverter.ConvertToPdf(htmlStream, pdfStream);
            }
            string path = "http://localhost:5111/paiebulletin/" + paiementvariable.Month + "_" + paiementvariable.Year + "_" + paiementvariable.Name + ".pdf";
            return (path, filepath);
        }
    }
}