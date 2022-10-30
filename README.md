# Products Management

The Project is created using below tech stack:
- React (Frontend)
- DotNet Core - .Net 6.0 Framework (backend)
- Entity Framework (Code First approach)
- SQL Server Database 2019
- xUnit Code Tests (Fluent Assertions and Microsoft.EntityFrameworkCore.InMemory)
- Microsoft Visual Studio 2022


Prerequisites:

- Microsoft Visual Studio
- SQL Database Server
- Please install Node.js for running the project
  https://nodejs.org/en/download/
- Please update the database connection string as per your database configuration. Currently the below configuration is set in appsettings.json file in ProductsManagement project folder.

 "ConnectionStrings": {
    "DefaultConnection": "Data Source=.;Initial Catalog=ProductsManagement;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework;"
  }

- To run the project, please open the project in Visual studio and click run in Visual studio.

- On the first run, it will take some time for the project to restore nuget and npm dependencies and to create database in SQL Server.

- The project is configured to use SSL. So on first run, it may ask to deploy ASP.NET Core self-signed certificate to avoid browser warnings and IIS Express SSL certicate for secure browser connection. Please accept the certifcates to run the project using SSL.
