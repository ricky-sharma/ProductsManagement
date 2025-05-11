---

### 📦 Products Management

A full-stack web application for managing product inventory, built using **ASP.NET Core** for the backend and **React.js** for the frontend. It supports CRUD operations, responsive UI, and a scalable architecture suited for warehouse or e-commerce platforms.

---

## 🧩 Tech Stack

* **Frontend**: React.js, Material UI
* **Backend**: .NET 6.0 (ASP.NET Core Web API)
* **Database**: SQL Server 2019
* **ORM**: Entity Framework Core (Code First approach)
* **Testing**: xUnit, Fluent Assertions, In-Memory Database for testing
* **Development Environment**: Microsoft Visual Studio 2022

---

## 🚀 Getting Started

### Prerequisites

* **Backend**:

  * Microsoft Visual Studio 2022
  * SQL Server 2019
  * .NET 6.0 SDK

* **Frontend**:

  * Node.js (for React development)

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ricky-sharma/ProductsManagement.git
   cd ProductsManagement
   ```

2. **Backend Setup**:

   * Open the `ProductsManagement.sln` file in Visual Studio.
   * Restore NuGet packages and build the solution.
   * Update the connection string in `appsettings.json` to point to your local SQL Server instance.

3. **Frontend Setup**:

   * Navigate to the `ClientApp` directory:

     ```bash
     cd ClientApp
     ```

   * Install dependencies:

     ```bash
     npm install
     ```

   * Start the development server:

     ```bash
     npm start
     ```

   * The frontend should now be accessible at `http://localhost:3000`.


  * Please update the database connection string as per your database configuration. Currently the below configuration is set in appsettings.json file in ProductsManagement project folder.
```
 "ConnectionStrings": {
    "DefaultConnection": "Data Source=.;Initial Catalog=ProductsManagement;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework;"
  }
```

* To run the project, please open the project in Visual studio and click run in Visual studio.

* On the first run, it will take some time for the project to restore nuget and npm dependencies and to create database in SQL Server.

* The project is configured to use SSL. So on first run, it may ask to deploy ASP.NET Core self-signed certificate to avoid browser warnings and IIS Express SSL certicate for secure browser connection. Please accept the certifcates to run the project using SSL.

---

## 🧪 Running Tests

* **Backend Tests**:

  * In Visual Studio, open the Test Explorer.
  * Build the solution to discover and run tests.

* **Frontend Tests**:

  * Navigate to the `ClientApp` directory:

    ```bash
    cd ClientApp
    ```

  * Run tests using:

    ```bash
    npm test
    ```

---

## 📄 License

This project is licensed under the **BSD-3-Clause License**. See the [LICENSE.txt](https://github.com/ricky-sharma/ProductsManagement/blob/master/LICENSE.txt) file for more details.

---
