using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using WarehouseApplication.Data.Entities;
using WarehouseApplication.Data.Models;

namespace WarehouseApplication.Data
{
    public class DataSeeder
    {
        public static void SeedData(IServiceProvider serviceProvider)
        {
            using var r = new StreamReader("warehouses.json");
            var json = r.ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<WarehouseDataModel>>(json);
            if (data == null) return;
            var warehouseData = data.Select(x => new Warehouse
            {
                Id = x.Id,
                Name = x.Name,
                Latitude = x.Location.Latitude,
                Longitude = x.Location.Longitude
            }).ToList();
            
            var carData = data.SelectMany(x => x.Car.Vehicles.Select(y => new Car
            {
                Id = y.Id,
                DateAdded = y.DateAdded,
                Location = x.Car.Location,
                Licensed = y.Licensed,
                Make = y.Make,
                Model = y.Model,
                Price = y.Price,
                YearModel = y.YearModel,
                WarehouseId = x.Id
            })).ToList();

            using var context = new WarehouseContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<WarehouseContext>>());
            if (!context.Car.Any())
            {
                context.Car.AddRangeAsync(carData);
                context.SaveChangesAsync();
            }
            
            if (!context.Warehouse.Any())
            {
                context.Warehouse.AddRangeAsync(warehouseData);
                context.SaveChangesAsync();
            }
        }

    }
}