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
    public class ExperienceController : ControllerBase
    {
        private readonly ResumeDbContext _context;

        public ExperienceController(ResumeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Experience>>> GetExperience()
        {
          if (_context.Experience == null)
          {
              return NotFound();
          }
            return await _context.Experience.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Experience>> GetExperience(int id)
        {
          if (_context.Experience == null)
          {
              return NotFound();
          }
            var experience = await _context.Experience.FindAsync(id);

            if (experience == null)
            {
                return NotFound();
            }

            return experience;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutExperience(int id, Experience experience)
        {
            if (id != experience.Id)
            {
                return BadRequest();
            }

            _context.Entry(experience).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExperienceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Experience>> PostExperience(CreateExperienceDto request)
        {
            var resume = await _context.Resumes.FindAsync(request.ResumeId);
            if (_context.Experience == null)
          {
              return Problem("Entity set 'ResumeDbContext.Experience'  is null.");
          }
            var newExperience = new Experience
            {
                IsStillWorkingHere = request.IsStillWorkingHere,
                Role = request.Role,
                OrganisationName = request.OrganisationName,
                Description = request.Description,
                Responsibilities = request.Responsibilities,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Resume = resume
            };
            _context.Experience.Add(newExperience);
            await _context.SaveChangesAsync();

            return Ok(newExperience.ResumeId);
        }

        [HttpPost("EditExperience")]
        public async Task<ActionResult<Experience>> EditExperience(CreateExperienceDto request, [FromQuery] int id)
        {

            var temp = _context.Experience
               .Where(x => x.Id == id)
               .FirstOrDefault();
            temp.IsStillWorkingHere = request.IsStillWorkingHere;
            temp.Role = request.Role;
            temp.OrganisationName = request.OrganisationName;
            temp.Description = request.Description;
            temp.Responsibilities = request.Responsibilities;
            temp.StartDate = request.StartDate;
            temp.EndDate = request.EndDate;

            await _context.SaveChangesAsync();
            return Ok(temp);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExperience(int id)
        {
            if (_context.Experience == null)
            {
                return NotFound();
            }
            var experience = await _context.Experience.FindAsync(id);
            if (experience == null)
            {
                return NotFound();
            }

            _context.Experience.Remove(experience);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Route("[action]/{ResumeId}")]
        [HttpGet]
        public async Task<ActionResult<Experience>> GetExperienceByResume(int ResumeId)
        {
            var experience = await _context.Experience.Where(r => r.ResumeId == ResumeId).ToListAsync();
            if (experience == null)
            {
                return NotFound();
            }
            return Ok(experience);
        }

        private bool ExperienceExists(int id)
        {
            return (_context.Experience?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
