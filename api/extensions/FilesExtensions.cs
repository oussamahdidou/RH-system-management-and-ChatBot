using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.extensions
{
    public static class FilesExtensions
    {
        public static async Task<string> UploadCV(this IFormFile formFile, IWebHostEnvironment webHostEnvironment)
        {

            if (formFile == null || formFile.Length == 0)
                return null;

            try
            {

                string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "CV");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + formFile.FileName;

                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await formFile.CopyToAsync(fileStream);
                }
                return "http://localhost:5111/CV/" + uniqueFileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public static async Task<string> UploadImage(this IFormFile formFile, IWebHostEnvironment webHostEnvironment)
        {
            if (webHostEnvironment == null)
            {
                Console.WriteLine("ach katkhwr");
                return null;
            }

            try
            {
                string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "profile");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await formFile.CopyToAsync(fileStream);
                }

                return "http://localhost:5111/profile/" + uniqueFileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"UploadImage Exception: {ex.Message}");
                return null;
            }
        }


    }
}