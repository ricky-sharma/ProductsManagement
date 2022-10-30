using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsManagement.Controllers;
using SQLDataEntity;
using SQLDataEntity.Models;

namespace ProductsManagement.Tests.Controllers
{
    public class ProductControllerTests
    {
        private readonly SqlDBContext _context;

        public ProductControllerTests()
        {
            _context = GetDatabaseContext();
        }

        [Fact]
        public async Task ProductController_GetProducts_NotNull_ProductList()
        {
            //Arrange
            var controller = new ProductsController(_context);

            //Act
            var result = await controller.GetProducts();

            //Assert
            result.Should().NotBeNull();
            result.Value.Should().BeOfType(typeof(List<Product>));
            result.Value?.Count().Should().BeGreaterThanOrEqualTo(10);
        }

        [Fact]
        public async Task ProductController_GetProduct_With_Valid_Product_ID()
        {
            //Arrange
            var controller = new ProductsController(_context);

            //Act
            var result1 = await controller.GetProduct(new Guid());
            var result2 = await controller.GetProduct(Guid.Parse("fd8efa2f-295b-4767-957d-e11cb8f2500d"));

            //Assert
            result1.Value?.Name.Should().BeNull();
            result1.Result.Should().BeOfType(typeof(NotFoundResult));
            result2.Should().NotBeNull();
            result2.Value.Should().BeOfType(typeof(Product));
            result2.Value?.Name.Should().Be("Book11");
        }

        [Fact]
        public async Task ProductController_PutProduct_With_Valid_Product_ID_Update()
        {
            //Arrange
            var controller = new ProductsController(_context);
            var product1 = _context.Products?.Find(Guid.Parse("fd8efa2f-295b-4767-957d-e11cb8f2500d")) ?? new Product();
            product1.Price = 500;

            //Act
            var result1 = await controller.PutProduct(Guid.Parse("fd8efa2f-295b-4767-957d-e11cb8f2500d"), product1);
            var result2 = await controller.PutProduct(Guid.NewGuid(), new Product());

            //Assert
            product1.Should().NotBeNull();
            result1.Should().NotBeNull();
            result1.Should().BeOfType(typeof(OkObjectResult));
            product1.Price.Should().Be(500);
            result2.Should().BeOfType(typeof(BadRequestResult));
        }

        [Fact]
        public async Task ProductController_PostProduct_NotNull_AddValidProduct()
        {
            //Arrange
            var controller = new ProductsController(_context);
            var product = new Product()
            {
                Name = "Electronics1",
                Price = 500,
                Type = "Electronics",
                Active = true
            };

            //Act
            var result = await controller.PostProduct(product);

            //Assert
            result.Should().NotBeNull();
            result.Result.Should().BeOfType(typeof(CreatedAtActionResult));
            result.Value?.Name.Should().Be("Electronics1");
            result.Value?.Price.Should().Be(500);
            result.Value?.Type.Should().Be("Electronics");
            result.Value?.Active.Should().Be(true);
        }

        [Fact]
        public async Task ProductController_DeleteProduct_With_Valid_Product_ID()
        {
            //Arrange
            var controller = new ProductsController(_context);

            //Act
            var result1 = await controller.DeleteProduct(Guid.Parse("1781ecd1-8d2c-4c9c-badb-997408a33a84"));
            var result2 = await controller.DeleteProduct(Guid.NewGuid());

            //Assert
            result1.Should().NotBeNull();
            result1.Should().BeOfType(typeof(OkObjectResult));
            result2.Should().BeOfType(typeof(NotFoundResult));
        }

        private static SqlDBContext GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<SqlDBContext>().UseInMemoryDatabase(databaseName: "ProductsManagementTestDbContext").Options;
            var databaseContext = new SqlDBContext(options);
            databaseContext?.Database?.EnsureCreated();

            if (databaseContext?.Products?.Count() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    databaseContext?.Products.Add(
                    new Product()
                    {
                        Name = $"Book{i}",
                        Type = "Books",
                        Price = i * 20,
                        Active = true
                    });
                    databaseContext?.SaveChanges();
                }

                databaseContext?.Products.Add(
                    new Product()
                    {
                        ID = Guid.Parse("fd8efa2f-295b-4767-957d-e11cb8f2500d"),
                        Name = $"Book11",
                        Type = "Books",
                        Price = 20,
                        Active = true
                    }); ;
                databaseContext?.SaveChanges();

                databaseContext?.Products.Add(
                    new Product()
                    {
                        ID = Guid.Parse("1781ecd1-8d2c-4c9c-badb-997408a33a84"),
                        Name = $"Book12",
                        Type = "Books",
                        Price = 50,
                        Active = true
                    }); ;
                databaseContext?.SaveChanges();
            }
            return databaseContext ?? new SqlDBContext(options);
        }
    }
}
