using System.ComponentModel.DataAnnotations;

namespace PracticaDotnetCoreAPI.Models
{
    public enum TipoMascota
    {
        PERRO = 1,
        GATO = 2,
        LORO = 3,
        CAPIBARA = 4
    }
    public class Mascota
    {
        public int MascotaID { get; set; }
        public string Nombre { get; set; }
        public TipoMascota Tipo { get; set; }
        [Required]
        public int PersonaID { get; set; }
        public Persona? Persona { get; set; }
    }
}
