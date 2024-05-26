using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.helpers;

namespace api.extensions
{
    public static class DateTimeExtensions
    {
        public static (int year, int month) GetPreviousMonthYear()
        {
            DateTime date = DateTime.Now;
            int previousMonth = date.Month - 1;
            int year = date.Year;
            if (previousMonth == 0)
            {
                previousMonth = 12;
                year -= 1;
            }

            return (year, previousMonth);
        }
        public static List<(int year, int month)> GetLastFiveMonths()
        {
            DateTime date = DateTime.Now;
            List<(int year, int month)> months = new List<(int year, int month)>();
            for (int i = 0; i < 7; i++)
            {
                months.Add((date.AddMonths(-i).Year, date.AddMonths(-i).Month));
            }
            // month = date.Month - 1;
            // int year = date.Year;
            // if (previousMonth == 0)
            // {
            //     previousMonth = 12;
            //     year -= 1;
            // }

            return months;
        }
        public static int CalculateMonthsDifference(this DateTime startDate)
        {
            DateTime currentDate = DateTime.Now;
            int monthsDifference = ((currentDate.Year - startDate.Year) * 12) + currentDate.Month - startDate.Month;

            // Si le jour du mois de startDate est supérieur au jour du mois de currentDate, retirer un mois
            if (startDate.Day > currentDate.Day)
            {
                monthsDifference--;
            }

            return monthsDifference;
        }
        public static int CalculateYearsDifference(this DateTime startDate)
        {
            DateTime endDate = DateTime.Now;
            int years = endDate.Year - startDate.Year;

            // Adjust if end date's month and day are before start date's month and day
            if (endDate.Month < startDate.Month || (endDate.Month == startDate.Month && endDate.Day < startDate.Day))
            {
                years--;
            }

            return years;
        }

        public static int DureeConges(this string typeconges)
        {
            if (typeconges == CongesTypes.CongesAnnuel)
            {
                return 0;
            }
            else if (typeconges == CongesTypes.CongeNaissance)
            {
                return 3;
            }
            else if (typeconges == CongesTypes.MariageSalarie)
            {
                return 4;
            }
            else if (typeconges == CongesTypes.MariageEnfant)
            {
                return 2;
            }
            else if (typeconges == CongesTypes.Chirurgie)
            {
                return 2;
            }
            else if (typeconges == CongesTypes.DecesProche)
            {
                return 3;
            }
            else if (typeconges == CongesTypes.DecesLoin)
            {
                return 2;
            }
            else if (typeconges == CongesTypes.Examen)
            {
                return 0;
            }
            else if (typeconges == CongesTypes.Maternite)
            {
                return 17 * 7;
            }
            return 0;
        }
    }
}