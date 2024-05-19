using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

    }
}