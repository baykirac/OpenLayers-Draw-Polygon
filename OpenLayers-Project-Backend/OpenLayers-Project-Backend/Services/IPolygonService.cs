using OpenLayers_Project_Backend.Entity;
using OpenLayers_Project_Backend.Response;

namespace OpenLayers_Project_Backend.Services
{
    public interface IPolygonService
    {
        Response<List<Polygon>> GetAll();
        Response<List<Polygon>> Push(int id, string name, List<List<double>> coordinates);
    }
}
