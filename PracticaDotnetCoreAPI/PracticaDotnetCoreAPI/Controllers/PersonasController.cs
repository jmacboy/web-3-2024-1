using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticaDotnetCoreAPI.Data;
using PracticaDotnetCoreAPI.Models;

namespace PracticaDotnetCoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly PracticaDotnetCoreAPIContext _context;

        public PersonasController(PracticaDotnetCoreAPIContext context)
        {
            _context = context;
        }

        // GET: api/Personas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Persona>>> GetPersona()
        {
            return await _context.Persona
                .Include(persona => persona.Mascotas)
                .ToListAsync();
        }

        // GET: api/Personas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonaDTO>> GetPersona(int id)
        {
            var persona = await _context.Persona
                                .Include(persona => persona.Mascotas)
                                .FirstOrDefaultAsync(persona => persona.PersonaID == id);

            if (persona == null)
            {
                return NotFound();
            }
            var personaDto = new PersonaDTO
            {
                PersonaID = persona.PersonaID,
                Nombre = persona.Nombre,
                Apellido = persona.Apellido,
                Ciudad = persona.Ciudad,
                Edad = persona.Edad,
                FechaNacimiento = persona.FechaNacimiento,
                Mascotas = persona.Mascotas.Select(m => new MascotaDTO
                {
                    Nombre = m.Nombre,
                    Tipo = m.Tipo,
                    MascotaID = m.MascotaID
                }).ToList()
            };
            return personaDto;
        }

        // PUT: api/Personas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersona(int id, Persona persona)
        {
            if (id != persona.PersonaID)
            {
                return BadRequest();
            }

            _context.Entry(persona).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonaExists(id))
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

        // POST: api/Personas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Persona>> PostPersona(Persona persona)
        {
            _context.Persona.Add(persona);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersona", new { id = persona.PersonaID }, persona);
        }

        // DELETE: api/Personas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersona(int id)
        {
            var persona = await _context.Persona.FindAsync(id);
            if (persona == null)
            {
                return NotFound();
            }

            _context.Persona.Remove(persona);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonaExists(int id)
        {
            return _context.Persona.Any(e => e.PersonaID == id);
        }
    }
}
