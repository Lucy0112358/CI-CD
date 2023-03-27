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
    public class ResumeController : ControllerBase
    {
        private readonly ResumeDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ResumeController(ResumeDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Resume
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resume>>> GetResumes(int userId)
        {
            var resumes = await _context.Resumes.Where(c => c.UserId == userId).ToListAsync();
            if (_context.Resumes == null)
            {
                return NotFound();
            }
            return resumes;
        }

        // GET: api/Resume/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resume>> GetResume(int id)
        {
            if (_context.Resumes == null)
            {
                return NotFound();
            }
            var resume = await _context.Resumes.FindAsync(id);

            if (resume == null)
            {
                return NotFound();
            }

            return resume;
        }

        [Route("[action]/{UserId}")]
        [HttpGet]
        public async Task<ActionResult<Resume>> GetByUser(int UserId)
        {
            var resume = await _context.Resumes.Where(r => r.UserId == UserId).ToListAsync();
            if (resume == null)
            {
                return NotFound();
            }
            return Ok(resume);
        }

        // PUT: api/Resume/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResume(int id, Resume resume)

        {
            if (id != resume.Id)
            {
                return BadRequest();
            }

            _context.Entry(resume).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResumeExists(id))
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

        // POST: api/Resume
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Resume>> PostResume(CreateResumeDto request)
        {

            if (_context.Resumes == null)
            {

                return Problem("Entity set 'ResumeDbContext.Resumes'  is null.");
            }
            var newResume = new Resume
            {
                Name = request.Name,
                FullName = request.FullName,
                JobTitle = request.JobTitle,
                Location = request.Location,
                Phone = request.Phone,
                UrlId = request.UrlId,
                UserId = request.UserId,
                About = request.About,
                LinkedinUrl = request.LinkedinUrl,
                EmailAddress = request.EmailAddress
            };
            _context.Resumes.Add(newResume);
            await _context.SaveChangesAsync();

            return Ok(newResume);
        }

        [HttpPost("PictureUpload")]
        public async Task<ActionResult> PictureUpload(IFormFile file, [FromQuery] int userid)
        {

            string filename = file.FileName;
            var filepath = Path.Combine(_env.ContentRootPath, "Images", filename);
            using (var stream = System.IO.File.Create(filepath))
            {
                await file.CopyToAsync(stream);

            }
            var temp = _context.Users
               .Where(x => x.Id == userid)
               .FirstOrDefault();
            temp.ImageName = filename;
            // _context.Users.Add(temp);
            await _context.SaveChangesAsync();
            return Ok(userid);
        }

        [HttpPost("EditResume")]
        public async Task<ActionResult<Resume>> EditResume(CreateResumeDto request, [FromQuery] int id)
        {

            var temp = _context.Resumes
               .Where(x => x.Id == id)
               .FirstOrDefault();
            temp.Name = request.Name;
            temp.FullName = request.FullName;
            temp.JobTitle = request.JobTitle;
            temp.Location = request.Location;
            temp.Phone = request.Phone;           
            await _context.SaveChangesAsync();
            return Ok(temp);
        }

        // DELETE: api/Resume/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResume(int id)
        {

            if (_context.Resumes == null)
            {
                return NotFound();
            }
            var resume = await _context.Resumes.FindAsync(id);
            if (resume == null)
            {
                return NotFound();
            }

            _context.Resumes.Remove(resume);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResumeExists(int id)
        {
            return (_context.Resumes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
