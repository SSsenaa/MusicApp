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
            // SINGER tablosu
            modelBuilder.Entity<Singer>(entity =>
            {
                entity.ToTable("SINGER");
                entity.HasKey(s => s.SingerId);
                entity.Property(s => s.SingerId).HasColumnName("singerID");
                entity.Property(s => s.Name).HasColumnName("name").IsRequired();
                entity.Property(s => s.Style).HasColumnName("style").IsRequired();
            });

            // ALBUM tablosu
            modelBuilder.Entity<Album>(entity =>
            {
                entity.ToTable("ALBUM");
                entity.HasKey(a => a.AlbumId);
                entity.Property(a => a.AlbumId).HasColumnName("albumID");
                entity.Property(a => a.Title).HasColumnName("title").IsRequired();
                entity.Property(a => a.Year).HasColumnName("year");
                entity.Property(a => a.SingerId).HasColumnName("singerID");

                // SingerName DB'de bir sütun değil, Join ile hesaplanan alan
                entity.Ignore(a => a.SingerName);

                // Foreign key ilişkisi
                entity.HasOne<Singer>()
                      .WithMany()
                      .HasForeignKey(a => a.SingerId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
