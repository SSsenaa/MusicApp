namespace MusicApp.API.Models
{
    public class Album
    {
        public int AlbumId { get; set; }
        public string Title { get; set; }
        public int? Year { get; set; }
        public int? SingerId { get; set; }
        
        // Bu alan, arayüzde Şarkıcı ismini göstermek için gerekli
        public string? SingerName { get; set; } 
    }
}
