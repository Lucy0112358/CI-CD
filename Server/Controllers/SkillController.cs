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
    public class SkillController : ControllerBase
    {
        private readonly ResumeDbContext _context;

        public SkillController(ResumeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkill()
        {
          if (_context.Skill == null)
          {
              return NotFound();
          }
            return await _context.Skill.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(int id)
        {
          if (_context.Skill == null)
          {
              return NotFound();
          }
            var skill = await _context.Skill.FindAsync(id);

            if (skill == null)
            {
                return NotFound();
            }

            return skill;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkill(int id, Skill skill)
        {
            if (id != skill.Id)
            {
                return BadRequest();
            }

            _context.Entry(skill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SkillExists(id))
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
        public async Task<ActionResult<Skill>> PostSkill(CreateSkillDto request)
        {
          if (_context.Skill == null)
          {
              return Problem("Entity set 'ResumeDbContext.Skill'  is null.");
          }
            var skill = new Skill
            {
                Name = request.Name,
                ExperianceId = request.ExperianceId,
                Level = request.Level
            };
            _context.Skill.Add(skill);
            await _context.SaveChangesAsync();

            return Ok(skill);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            if (_context.Skill == null)
            {
                return NotFound();
            }
            var skill = await _context.Skill.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            _context.Skill.Remove(skill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SkillExists(int id)
        {
            return (_context.Skill?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
