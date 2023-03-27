using Microsoft.EntityFrameworkCore;
using api.Entities;

namespace api.Entities
{
    public class ResumeDbContext : DbContext
    {
        public ResumeDbContext(DbContextOptions<ResumeDbContext> options) : base(options)
        {

        }
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Experience> Experience { get; set; } = default!;
        public DbSet<Language> Language { get; set; } = default!;
        public DbSet<Education> Education { get; set; } = default!;
        public DbSet<Skill> Skill { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Experience>()
    .HasMany(p => p.Skills)
    .WithMany(p => p.Experience)
    .UsingEntity(j => j.ToTable("ExperienceSkills"));
        }
        }
}
