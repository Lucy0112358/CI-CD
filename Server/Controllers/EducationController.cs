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
    public class EducationController : ControllerBase
    {
        private readonly ResumeDbContext _context;

        public EducationController(ResumeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Education>>> GetEducation()
        {
          if (_context.Education == null)
          {
              return NotFound();
          }
            return await _context.Education.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Education>> GetEducation(int id)
        {
          if (_context.Education == null)
          {
              return NotFound();
          }
            var education = await _context.Education.FindAsync(id);

            if (education == null)
            {
                return NotFound();
            }

            return education;
        }

        [HttpPost("EditEducation")]
        public async Task<ActionResult<Education>> EditEducation(CreateEducationDto request, [FromQuery] int id)
        {

            var temp = _context.Education
               .Where(x => x.Id == id)
               .FirstOrDefault();
            temp.IsStillStudiengHere = request.IsStillStudiengHere;
            temp.FacilityName = request.FacilityName;
            temp.EducationTitle = request.EducationTitle;
            temp.Level = request.Level;
            temp.Description = request.Description;
            temp.StartDate = request.StartDate;
            temp.EndDate = request.EndDate;
            
            await _context.SaveChangesAsync();
            return Ok(temp);
        }

        [HttpPost]
        public async Task<ActionResult<Education>> PostEducation(CreateEducationDto request)
             {
            var resume = await _context.Resumes.FindAsync(request.ResumeId);
            if (_context.Education == null)
            {

                return Problem("Entity set 'ResumeDbContext.Resumes'  is null.");
            }
            var newEducation = new Education
            {
                IsStillStudiengHere = request.IsStillStudiengHere,
                FacilityName = request.FacilityName,
                EducationTitle = request.EducationTitle,
                Level = request.Level,
                Description = request.Description,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Resume = resume
            };
            _context.Education.Add(newEducation);
            await _context.SaveChangesAsync();

            return Ok(newEducation.ResumeId);
        }
  
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEducation(int id)
        {
            if (_context.Education == null)
            {
                return NotFound();
            }
            var education = await _context.Education.FindAsync(id);
            if (education == null)
            {
                return NotFound();
            }

            _context.Education.Remove(education);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Route("[action]/{ResumeId}")]
        [HttpGet]
        public async Task<ActionResult<Education>> GetEducationByResume(int ResumeId)
        {
            var education = await _context.Education.Where(r => r.ResumeId == ResumeId).ToListAsync();
            if (education == null)
            {
                return NotFound();
            }
            return Ok(education);
        }

        private bool EducationExists(int id)
        {
            return (_context.Education?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
