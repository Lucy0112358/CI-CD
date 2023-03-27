using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Entities;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ResumeDbContext _context;

        public LanguageController(ResumeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Language>>> GetLanguage()
        {
          if (_context.Language == null)
          {
              return NotFound();
          }
            return await _context.Language.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Language>> GetLanguage(int id)
        {
          if (_context.Language == null)
          {
              return NotFound();
          }
            var language = await _context.Language.FindAsync(id);

            if (language == null)
            {
                return NotFound();
            }

            return language;
        }


        [HttpPost("EditLanguage")]
        public async Task<ActionResult<Language>> EditEducation(CreateLanguageDto request, [FromQuery] int id)
        {

            var temp = _context.Language
               .Where(x => x.Id == id)
               .FirstOrDefault();
            temp.Name = request.Name;
            temp.SpokenLevel = request.SpokenLevel;
            temp.WrittenLevel = request.WrittenLevel;
            await _context.SaveChangesAsync();
            return Ok(temp);
        }


        [HttpPost]
        public async Task<ActionResult<Language>> PostLanguage(CreateLanguageDto request)
        {
            var resume = await _context.Resumes.FindAsync(request.ResumeId);
            if (_context.Language == null)
            {

                return Problem("Entity set 'ResumeDbContext.Resumes'  is null.");
            }
            var newLanguage = new Language
            {
                Name = request.Name,
                SpokenLevel = request.SpokenLevel,
                WrittenLevel = request.WrittenLevel,
                Resume = resume
            };
            _context.Language.Add(newLanguage);
            await _context.SaveChangesAsync();

            return Ok(newLanguage.ResumeId);
        }
                             
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLanguage(int id)
        {
            if (_context.Language == null)
            {
                return NotFound();
            }
            var language = await _context.Language.FindAsync(id);
            if (language == null)
            {
                return NotFound();
            }

            _context.Language.Remove(language);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Route("[action]/{ResumeId}")]
        [HttpGet]
        public async Task<ActionResult<Language>> GetLanguageByResume(int ResumeId)
        {
            var language = await _context.Language.Where(r => r.ResumeId == ResumeId).ToListAsync();
            if (language == null)
            {
                return NotFound();
            }
            return Ok(language);
        }
       
        private bool LanguageExists(int id)
        {
            return (_context.Language?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
