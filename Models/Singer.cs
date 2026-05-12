using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicApp.API.Models
{
    public class Singer
    {
        public int SingerId { get; set; }
        public string Name { get; set; }
        public string Style { get; set; }
    }
}