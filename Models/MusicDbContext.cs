using Microsoft.EntityFrameworkCore;
using MusicApp.API.Models;

namespace MusicApp.API.Data
{
    public class MusicDbContext : DbContext
    {
        public MusicDbContext(DbContextOptions<MusicDbContext> options) : base(options) { }

        public DbSet<Singer> SINGER { get; set; }
        public DbSet<Album> ALBUM { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Singer>().ToTable("SINGER").HasKey(s => s.SingerId);
            modelBuilder.Entity<Singer>().Property(s => s.SingerId).HasColumnName("singerID");
            modelBuilder.Entity<Singer>().Property(s => s.Name).HasColumnName("name");
            modelBuilder.Entity<Singer>().Property(s => s.Style).HasColumnName("style");

            modelBuilder.Entity<Album>().ToTable("ALBUM").HasKey(a => a.AlbumId);
            modelBuilder.Entity<Album>().Property(a => a.AlbumId).HasColumnName("albumID");
            modelBuilder.Entity<Album>().Property(a => a.Title).HasColumnName("title");
            modelBuilder.Entity<Album>().Property(a => a.Year).HasColumnName("year");
            modelBuilder.Entity<Album>().Property(a => a.SingerId).HasColumnName("singerID");
            modelBuilder.Entity<Album>().Ignore(a => a.SingerName);
        }
    }
}