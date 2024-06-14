using System.ComponentModel.DataAnnotations;

namespace PracticaDotNetCoreMVC.Models
{
    public enum TipoMascota
    {
        [Display(Name = "Perro")]
        PERRO = 1,
        [Display(Name = "Gato")]
        GATO = 2,
        [Display(Name = "Loro")]
        LORO = 3,
        [Display(Name = "Capibara")]
        CAPIBARA = 4
    }
    public class Mascota
    {
        public int MascotaID { get; set; }
        public string Nombre { get; set; }
        public TipoMascota Tipo { get; set; }
        public int PersonaID { get; set; }
        public Persona Persona { get; set; }

    }
}
