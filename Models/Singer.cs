using System.ComponentModel.DataAnnotations;

namespace MusicApp.API.Models
{
    public class Singer
    {
        public int SingerId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Style is required")]
        public string Style { get; set; } = string.Empty;
    }
}