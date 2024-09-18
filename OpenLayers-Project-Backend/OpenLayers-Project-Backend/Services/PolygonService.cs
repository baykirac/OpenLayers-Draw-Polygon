using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using OpenLayers_Project_Backend.Connections;
using OpenLayers_Project_Backend.Entity;
using OpenLayers_Project_Backend.Response;
using System.Text.Json;

namespace OpenLayers_Project_Backend.Services
{
    public class PolygonService : IPolygonService
    {
        private readonly string _jsonPathString;

        public PolygonService(IOptions<ConnectionStrings> jsonPathString)
        {
            _jsonPathString = jsonPathString.Value.JsonPathString;
        }
        public Response<List<Polygon>> GetAll()
        {
            if (!File.Exists(_jsonPathString))
            {
                return new Response<List<Polygon>>("İşlem başarısız.", "Dosya bulunamadı");
            }
            string jsonData = File.ReadAllText(_jsonPathString);

            List<Polygon> polygons = JsonConvert.DeserializeObject<List<Polygon>>(jsonData);

            return new Response<List<Polygon>>(polygons);
        }

        public Response<List<Polygon>> Push(int id, string name, List<List<double>> coordinates)
        {
            if (!File.Exists(_jsonPathString))
            {
                return new Response<List<Polygon>>("İşlem başarısız.", "Dosya bulunamadı");
            }

            var newPolygon = Polygon.Create(id, name, coordinates); // gerekli kontroller Create metodu içerisinde yapılmıtır.

            string jsonData = File.ReadAllText(_jsonPathString);

            List<Polygon> polygons = JsonConvert.DeserializeObject<List<Polygon>>(jsonData);

            polygons.Add(newPolygon);

            string updatedJson = JsonConvert.SerializeObject(polygons, Formatting.Indented);

            File.WriteAllText(_jsonPathString, updatedJson);

            return new Response<List<Polygon>>(polygons);
        }

    }
}
