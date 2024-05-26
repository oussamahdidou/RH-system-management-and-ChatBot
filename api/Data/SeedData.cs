using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public class SeedData
    {
        public static async Task SeedUsersAndRolesAsync(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                //Roles
                var RoleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                if (!await RoleManager.RoleExistsAsync(UserRoles.Employer))
                {
                    await RoleManager.CreateAsync(new IdentityRole(UserRoles.Employer));
                }
                if (!await RoleManager.RoleExistsAsync(UserRoles.Manager))
                {
                    await RoleManager.CreateAsync(new IdentityRole(UserRoles.Manager));
                }
                //Users
                var usermanager = serviceScope.ServiceProvider.GetService<UserManager<AppUser>>();
                //Manager
                string manageruserEmail = "ou.prof2002@gmail.com";
                var managerUser = await usermanager.FindByEmailAsync(manageruserEmail);
                if (managerUser == null)
                {
                    var newmanagerUser = new AppUser()
                    {
                        UserName = "oussamahdidou1",
                        Email = manageruserEmail,
                        EmailConfirmed = true,
                        Poste = "manager",
                        SalaireDeBase = 120,
                        IntegrationDate = new DateTime(2020, 5, 1, 0, 0, 0),
                        Image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    };
                    await usermanager.CreateAsync(newmanagerUser, "Coding@1234?");
                    await usermanager.AddToRoleAsync(newmanagerUser, UserRoles.Manager);
                }
                //Pointeur
                string pointeuruserEmail = "oussamahdidou223@gmail.com";
                var pointeurUser = await usermanager.FindByEmailAsync(pointeuruserEmail);
                if (pointeurUser == null)
                {
                    var newpointeurUser = new AppUser()
                    {
                        UserName = "oussamahdidou2",
                        Email = pointeuruserEmail,
                        EmailConfirmed = true,
                        Poste = "pointeur",
                        SalaireDeBase = 120,
                        IntegrationDate = new DateTime(2020, 5, 1, 0, 0, 0),
                        Image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"


                    };
                    await usermanager.CreateAsync(newpointeurUser, "Coding@1234?");
                    await usermanager.AddToRoleAsync(newpointeurUser, UserRoles.Pointeur);
                }
                //Recruteur
                string recruteuruserEmail = "oussama.hdidou.pro@gmail.com";
                var recruteurUser = await usermanager.FindByEmailAsync(recruteuruserEmail);
                if (recruteurUser == null)
                {
                    var newrecruteurUser = new AppUser()
                    {
                        UserName = "oussamahdidou3",
                        Email = recruteuruserEmail,
                        EmailConfirmed = true,
                        Poste = "recruteur",
                        SalaireDeBase = 120,
                        IntegrationDate = new DateTime(2020, 5, 1, 0, 0, 0),
                        Image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"



                    };
                    await usermanager.CreateAsync(newrecruteurUser, "Coding@1234?");
                    await usermanager.AddToRoleAsync(newrecruteurUser, UserRoles.Recruteur);
                }
            }
        }
    }
}