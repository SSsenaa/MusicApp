using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.API.Data;
using MusicApp.API.Models;

namespace MusicApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SingersController : ControllerBase
    {
        private readonly MusicDbContext _context;

        public SingersController(MusicDbContext context)
        {
            _context = context;
        }

        // GET: api/singers
        [HttpGet]
        public async Task<IActionResult> GetSingers()
        {
            var singers = await _context.SINGER.ToListAsync();
            return Ok(singers);
        }

        // POST: api/singers
        [HttpPost]
        public async Task<IActionResult> AddSinger([FromBody] Singer singer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // SingerId'nin DB tarafından atanması için sıfırlandı
            singer.SingerId = 0;

            try
            {
                _context.SINGER.Add(singer);
                await _context.SaveChangesAsync();
                return Ok(singer);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Database error: " + ex.InnerException?.Message ?? ex.Message });
            }
        }

        // PUT: api/singers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSinger(int id, [FromBody] Singer singer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _context.SINGER.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = $"Singer with id={id} not found." });

            existing.Name = singer.Name;
            existing.Style = singer.Style;

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

        // DELETE: api/singers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSinger(int id)
        {
            var singer = await _context.SINGER.FindAsync(id);
            if (singer == null)
                return NotFound(new { message = $"Singer with id={id} not found." });

            // Bu şarkıcıya ait albüm var mı kontrol et
            bool hasAlbums = await _context.ALBUM.AnyAsync(a => a.SingerId == id);
            if (hasAlbums)
                return BadRequest(new { message = "Cannot delete singer: there are albums associated with this singer." });

            try
            {
                _context.SINGER.Remove(singer);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Singer deleted." });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Database error: " + ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}