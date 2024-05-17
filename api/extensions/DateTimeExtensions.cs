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
    }
}