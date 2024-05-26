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
                var apiDbContext = serviceScope.ServiceProvider.GetService<ApiDbContext>();

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
                    List<Abscence> managerabscences = new List<Abscence>()
                    {
                        //mois5
                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 5, 1)
                        },
                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 5, 2)
                        },
                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 5, 3)
                        },
                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 5, 4)
                        },
                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 5, 5)
                        },
                            //mois4
                         new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 4, 1)
                        },
                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 4, 2)
                        },
                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 4, 4)
                        },

                            //mois3
                         new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 3, 1)
                        },

                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 3, 4)
                        },
                        new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 3, 5)
                        },
                            //mois2
                      
                            //mois1
                         new Abscence
                        {
                            AppUser=newmanagerUser,
                            Date=  new DateTime(2024, 1, 1)
                        },

                    };

                    List<Heuresupplimentaires> managersurtemps = new List<Heuresupplimentaires>()
                    {
                        //mois5
                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 5, 1)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 5, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 5, 3)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 5, 4)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 5, 5)
                        },
                            //mois4
                         new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 4, 1)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 4, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 4, 4)
                        },

                            //mois3
                         new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 3, 1)
                        },

                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 3, 4)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 3, 5)
                        },
                            //mois2
                      
                            //mois1
                         new Heuresupplimentaires
                        {
                            AppUser=newmanagerUser,
                            DateTime=  new DateTime(2024, 1, 1)
                        },

                    };
                    await apiDbContext.Heuresupplimentaires.AddRangeAsync(managersurtemps);

                    await apiDbContext.Abscences.AddRangeAsync(managerabscences);
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

                    List<Abscence> pointeurabscences = new List<Abscence>()
                    {
                        //mois5
                  
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 5, 5)
                        },
                            //mois4
                         new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 4, 1)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 4, 2)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 4, 4)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 4, 5)
                        },
                            //mois3
                         new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 3, 1)
                        },

                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 3, 4)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 3, 5)
                        },
                            //mois2
                         new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 2, 1)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 2, 2)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 2, 3)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 2, 4)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 2, 5)
                        },
                            //mois1
                         new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 1, 1)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 1, 2)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 1, 3)
                        },
                        new Abscence
                        {
                            AppUser=newpointeurUser,
                            Date=  new DateTime(2024, 1, 4)
                        },
                    };

                    List<Heuresupplimentaires> pointeursurtemps = new List<Heuresupplimentaires>()
                    {

                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 4, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 4, 4)
                        },

                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 3, 5)
                        },
                         new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 2, 1)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 2, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 2, 3)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 2, 4)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 2, 5)
                        },
                         new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 1, 1)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 1, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 1, 3)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newpointeurUser,
                            DateTime=  new DateTime(2024, 1, 4)
                        },
                    };

                    await apiDbContext.Heuresupplimentaires.AddRangeAsync(pointeursurtemps);

                    await apiDbContext.Abscences.AddRangeAsync(pointeurabscences);
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
                    List<Abscence> recruteurabscences = new List<Abscence>()
                    {
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 5, 1)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 5, 2)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 5, 3)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 5, 4)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 5, 5)
                        },
                         new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 4, 1)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 4, 2)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 4, 4)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 4, 5)
                        },
                         new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 3, 1)
                        },

                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 3, 4)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 3, 5)
                        },
                         new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 2, 1)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 2, 2)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 2, 3)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 2, 4)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 2, 5)
                        },
                         new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 1, 1)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 1, 2)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 1, 3)
                        },
                        new Abscence
                        {
                            AppUser=newrecruteurUser,
                            Date=  new DateTime(2024, 1, 4)
                        },
                    };

                    List<Heuresupplimentaires> recruteursurtemps = new List<Heuresupplimentaires>()
                    {
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 5, 1)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 5, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 5, 3)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 5, 4)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 5, 5)
                        },
                         new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 4, 1)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 4, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 4, 4)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 4, 5)
                        },
                         new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 3, 1)
                        },

                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 3, 4)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 3, 5)
                        },
                         new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 2, 1)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 2, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 2, 3)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 2, 4)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 2, 5)
                        },
                         new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 1, 1)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 1, 2)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 1, 3)
                        },
                        new Heuresupplimentaires
                        {
                            AppUser=newrecruteurUser,
                            DateTime=  new DateTime(2024, 1, 4)
                        },
                    };
                    await apiDbContext.Heuresupplimentaires.AddRangeAsync(recruteursurtemps);

                    await apiDbContext.Abscences.AddRangeAsync(recruteurabscences);


                }
                await apiDbContext.SaveChangesAsync();
            }
        }
    }
}