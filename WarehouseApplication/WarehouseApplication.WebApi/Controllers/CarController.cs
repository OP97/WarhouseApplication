using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WarehouseApplication.Data;
using WarehouseApplication.WebApi.Models;

namespace WarehouseApplication.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ILogger<CarController> _logger;
        private readonly WarehouseContext _context;

        public CarController(ILogger<CarController> logger, WarehouseContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Cars()
        {
            var query = await _context.Car
                .Include(x => x.Warehouse)
                .Select(y => new CarTableModel
                {
                    DateAdded = y.DateAdded,
                    Make = y.Make,
                    Model = y.Model,
                    Price = y.Price,
                    Location = y.Location,
                    YearModel = y.YearModel,
                    WarehouseName = y.Warehouse.Name
                })
                .ToArrayAsync();

            var jsonData = JsonSerializer.Serialize(query);

            return new OkObjectResult(jsonData);
        }

    }
}