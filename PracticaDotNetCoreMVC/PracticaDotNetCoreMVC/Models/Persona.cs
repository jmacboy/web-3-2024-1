﻿namespace PracticaDotNetCoreMVC.Models
{
    public class Persona
    {
        public int PersonaID { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Edad { get; set; }
        public string Ciudad { get; set; }
        public DateTime FechaNacimiento { get; set; }

        public string NombreCompleto
        {
            get
            {
                return Nombre + " " + Apellido;
            }
        }
        //public ICollection<Mascota> Mascotas { get; set; }
    }
}
