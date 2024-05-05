using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApiDbContext : IdentityDbContext<AppUser>
    {
        public ApiDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Candidature> Candidatures { get; set; }
        public DbSet<Annonce> Annonces { get; set; }
        public DbSet<Abscence> Abscences { get; set; }
        public DbSet<CandidatureUrgent> CandidatureUrgents { get; set; }
        public DbSet<Conges> Conges { get; set; }
        public DbSet<Heuresupplimentaires> Heuresupplimentaires { get; set; }
        public DbSet<Paiement> Paiements { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> Roles = new List<IdentityRole>()
            {
                new IdentityRole()
                {
                    Name="Employer",
                    NormalizedName="EMPLOYER"
                },
                new IdentityRole()
                {
                    Name="Manager",
                    NormalizedName="MANAGER"
                },
                new IdentityRole()
                {
                    Name="Pointeur",
                    NormalizedName="POINTEUR"
                },
                new IdentityRole()
                {
                    Name="Recruteur",
                    NormalizedName="RECRUTEUR"
                },

            };
            builder.Entity<IdentityRole>().HasData(Roles);
        }

    }
}