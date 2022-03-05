using System;

namespace WarehouseApplication.Data.Models
{
    public class VehicleDataModel
    {
        public int Id { get; private set; }
        public string Make { get; private set; }
        public string Model { get; private set; }
        public int YearModel { get; private set; }
        public decimal Price { get; private set; }
        public bool Licensed { get; private set; }
        public DateTime DateAdded { get; private set; }

        public VehicleDataModel(int _id, string make, string model, int year_model, decimal price, bool licensed,
            DateTime date_added)
        {
            Id = _id;
            Make = make;
            Model = model;
            YearModel = year_model;
            Price = price;
            Licensed = licensed;
            DateAdded = date_added;
        }

    }
}