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

        [HttpGet]
        public async Task<IActionResult> GetSingers()
        {
            return Ok(await _context.SINGER.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddSinger(Singer singer)
        {
            _context.SINGER.Add(singer);
            await _context.SaveChangesAsync();
            return Ok(singer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSinger(int id, Singer singer)
        {
            singer.SingerId = id;
            _context.Entry(singer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSinger(int id)
        {
            var singer = await _context.SINGER.FindAsync(id);
            if (singer == null) return NotFound();
            _context.SINGER.Remove(singer);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}