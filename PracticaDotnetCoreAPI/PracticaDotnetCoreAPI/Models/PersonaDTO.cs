namespace PracticaDotnetCoreAPI.Models
{
    public class PersonaDTO
    {
        public int PersonaID { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Edad { get; set; }
        public string Ciudad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public ICollection<MascotaDTO> Mascotas { get; set; }
    }
}
