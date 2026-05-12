using System.ComponentModel.DataAnnotations;

namespace MusicApp.API.Models
{
    public class Album
    {
        public int AlbumId { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;

        public int? Year { get; set; }

        [Required(ErrorMessage = "SingerId is required")]
        public int? SingerId { get; set; }

        // Bu alan veritabanına yazılmaz; sadece GET sorgusunda dönülür
        public string? SingerName { get; set; }
    }
}
