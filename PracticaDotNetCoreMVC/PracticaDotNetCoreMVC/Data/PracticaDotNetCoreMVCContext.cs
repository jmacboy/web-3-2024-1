using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PracticaDotNetCoreMVC.Models;

namespace PracticaDotNetCoreMVC.Data
{
    public class PracticaDotNetCoreMVCContext : DbContext
    {
        public PracticaDotNetCoreMVCContext (DbContextOptions<PracticaDotNetCoreMVCContext> options)
            : base(options)
        {
        }

        public DbSet<PracticaDotNetCoreMVC.Models.Persona> Persona { get; set; } = default!;
        public DbSet<PracticaDotNetCoreMVC.Models.Mascota> Mascota { get; set; } = default!;
    }
}
