using System.Runtime.CompilerServices;
using OpenLayers_Project_Backend.Response;

namespace OpenLayers_Project_Backend.Entity
{
    public class Polygon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<List<double>> Coordinates { get; set; }

        public Polygon(int ıd, string name, List<List<double>> coordinates)
        {
            Id = ıd;
            Name = name;
            Coordinates = coordinates;
        }

        public static Polygon Create(int id, string name, List<List<double>> coordinates)
        {
            if(name.Length > 500)
            {
                throw new ArgumentException("Başarısız", "İsim 500 karakterden fazla olamaz");
            }

            return new Polygon(id, name, coordinates);
        }
    }
}
