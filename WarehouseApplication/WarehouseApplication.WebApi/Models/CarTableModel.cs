using System;

namespace WarehouseApplication.WebApi.Models
{
    public class CarTableModel
    {
        public string Location { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int YearModel { get; set; }
        public decimal Price { get; set; }
        public DateTime DateAdded { get; set; }
        public string WarehouseName { get; set; }

        public bool Licensed { get; set; }

    }
}