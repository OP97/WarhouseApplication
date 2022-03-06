# Warehouse Application

1- Clone the project to your local
  - git clone https://github.com/OP97/WarhouseApplication.git

2- For backend side:
  - Open WarehouseApplication folder 
  - Open WarehouseApplication.WebApi folder
    - cd WarehouseApplication.WebApi
  - dotnet run

3- For frontend side:
  - Open ui folder under Warhouse project
  - npm install
  - npm start

Notes: This application already contains the warhouses.db file which has been seeded from the json file provided before. If you would like to test the functionality of the seeding
you can 

1- Delete the database and the migrations under WarhouseApplication.Data folder
  - cd WarehouseApplication.Data
  - dotnet ef migrations add InitialCreate
  - dotnet ef database update
  
2- Perform dotnet run and database will be seeded.
  
Car List Page with Details Modal
  
![image](https://user-images.githubusercontent.com/21227232/156943849-c2007ff5-1cf1-4b43-946c-8267c5ec85f9.png)

Card Checkout Modal

![image](https://user-images.githubusercontent.com/21227232/156943889-5bb9fb39-967a-42a2-ba14-ba7d5fde1344.png)
