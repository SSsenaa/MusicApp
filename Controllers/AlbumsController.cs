using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.API.Data;
using MusicApp.API.Models;

namespace MusicApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private readonly MusicDbContext _context;

        public AlbumsController(MusicDbContext context)
        {
            _context = context;
        }

        // 1. Listeleme (Şarkıcı adıyla birlikte)
        [HttpGet]
        public async Task<IActionResult> GetAlbums()
        {
            var albums = await _context.ALBUM
                .Join(_context.SINGER,
                    album => album.SingerId,
                    singer => singer.SingerId,
                    (album, singer) => new
                    {
                        albumId = album.AlbumId,
                        title = album.Title,
                        year = album.Year,
                        singerName = singer.Name // Kural gereği ID yerine İsim dönüyoruz
                    })
                .ToListAsync();

            return Ok(albums);
        }

        // 2. Ekleme (sp_AddAlbum Prosedürü ile)
        [HttpPost]
        public async Task<IActionResult> AddAlbum(Album album)
        {
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_AddAlbum @title = {0}, @year = {1}, @singerid = {2}",
                album.Title, album.Year, album.SingerId);

            return Ok();
        }

        // 3. Güncelleme
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlbum(int id, Album album)
        {
            if (id != album.AlbumId) return BadRequest();
            
            _context.Entry(album).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // 4. Silme
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            var album = await _context.ALBUM.FindAsync(id);
            if (album == null) return NotFound();
            
            _context.ALBUM.Remove(album);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
