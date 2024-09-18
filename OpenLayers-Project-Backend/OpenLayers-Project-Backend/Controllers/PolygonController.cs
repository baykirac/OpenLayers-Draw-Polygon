using Microsoft.AspNetCore.Mvc;
using OpenLayers_Project_Backend.Entity;
using OpenLayers_Project_Backend.Response;
using OpenLayers_Project_Backend.Services;

namespace OpenLayers_Project_Backend.Controllers
{
    [Route("[action]")]
    [ApiController]
    public class PolygonController : ControllerBase
    {
        private readonly IPolygonService _polygonService;

        public PolygonController(IPolygonService polygonService)
        {
            _polygonService = polygonService;
        }

        [HttpGet]
        public Response<List<Entity.Polygon>> GetAll()
        {
            return _polygonService.GetAll();
        }

        [HttpPost]
        public Response<List<Entity.Polygon>> Push(int id, string name, List<List<double>> coordinates)
        {
            return _polygonService.Push(id, name, coordinates);
        }

    }
}
