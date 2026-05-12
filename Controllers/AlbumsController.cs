using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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

        // GET: api/albums — Şarkıcı adıyla birlikte listele (JOIN)
        [HttpGet]
        public async Task<IActionResult> GetAlbums()
        {
            var albums = await _context.ALBUM
                .Join(_context.SINGER,
                    album => album.SingerId,
                    singer => singer.SingerId,
                    (album, singer) => new
                    {
                        albumId   = album.AlbumId,
                        title     = album.Title,
                        year      = album.Year,
                        singerId  = singer.SingerId,
                        singerName = singer.Name
                    })
                .ToListAsync();

            return Ok(albums);
        }

        // POST: api/albums — sp_AddAlbum stored procedure ile ekle
        [HttpPost]
        public async Task<IActionResult> AddAlbum([FromBody] Album album)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(album.Title))
                return BadRequest(new { message = "Title is required." });

            if (album.SingerId == null)
                return BadRequest(new { message = "SingerId is required." });

            try
            {
                await _context.Database.ExecuteSqlRawAsync(
                    "EXEC sp_AddAlbum @title = {0}, @year = {1}, @singerid = {2}",
                    album.Title, album.Year ?? (object)DBNull.Value, album.SingerId);

                return Ok(new { message = "Album added successfully." });
            }
            catch (SqlException ex)
            {
                return StatusCode(500, new { message = "SQL error: " + ex.Message });
            }
        }

        // PUT: api/albums/{id} — Güncelle
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlbum(int id, [FromBody] Album album)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _context.ALBUM.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = $"Album with id={id} not found." });

            existing.Title = album.Title;
            existing.Year = album.Year;
            existing.SingerId = album.SingerId;
            // SingerName alanı Ignored olduğundan güncellenmez

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existing);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Database error: " + ex.InnerException?.Message ?? ex.Message });
            }
        }

        // DELETE: api/albums/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            var album = await _context.ALBUM.FindAsync(id);
            if (album == null)
                return NotFound(new { message = $"Album with id={id} not found." });

            try
            {
                _context.ALBUM.Remove(album);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Album deleted." });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Database error: " + ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
