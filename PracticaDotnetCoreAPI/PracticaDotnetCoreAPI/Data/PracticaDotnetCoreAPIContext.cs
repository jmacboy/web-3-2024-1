using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PracticaDotnetCoreAPI.Models;

namespace PracticaDotnetCoreAPI.Data
{
    public class PracticaDotnetCoreAPIContext : DbContext
    {
        public PracticaDotnetCoreAPIContext(DbContextOptions<PracticaDotnetCoreAPIContext> options)
            : base(options)
        {
        }

        public DbSet<PracticaDotnetCoreAPI.Models.Persona> Persona { get; set; } = default!;
        public DbSet<PracticaDotnetCoreAPI.Models.Mascota> Mascota { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Persona>()
            .HasMany(p => p.Mascotas)
            .WithOne(m => m.Persona)
            .HasForeignKey(m => m.PersonaID);
        }
    }
}
