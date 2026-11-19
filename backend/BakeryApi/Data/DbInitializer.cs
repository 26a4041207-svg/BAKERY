using System.Text.Json;
using BakeryApi.Models;

namespace BakeryApi.Data;

public static class DbInitializer
{
    private class JsonProduct
    {
        public string? id { get; set; }
        public string? name { get; set; }
        public decimal price { get; set; }
        public string? category { get; set; }
        public List<string>? status { get; set; }
        public List<string>? images { get; set; }
        public string? description { get; set; }
        public List<string>? ingredients { get; set; }
        public JsonNutrition? nutrition { get; set; }
    }

    private class JsonNutrition
    {
        public int calories { get; set; }
        public int fat { get; set; }
        public int carb { get; set; }
        public int protein { get; set; }
    }

    public static async Task SeedAsync(BakeryDbContext context, IWebHostEnvironment env)
    {
        await context.Database.EnsureCreatedAsync();

        // 1. Seed Categories if empty
        if (!context.Categories.Any())
        {
            var categories = new List<Category>
            {
                new() { Name = "Bánh Kem", Slug = "banh-kem", Description = "Bánh kem tươi ngon cho mọi dịp sinh nhật và tiệc tùng", IconUrl = "/Icon-danhmucsp/icon-banhkem.jpg", DisplayOrder = 1 },
                new() { Name = "Bánh Mousse", Slug = "banh-mousse", Description = "Bánh mousse mềm mịn tan ngay trong miệng", IconUrl = "/Icon-danhmucsp/icon-banhmousse.jpg", DisplayOrder = 2 },
                new() { Name = "Bánh Ngọt", Slug = "banh-ngot", Description = "Các loại bánh ngọt thơm lừng hảo hạng mỗi ngày", IconUrl = "/Icon-danhmucsp/icon-banhngot.jpg", DisplayOrder = 3 },
                new() { Name = "Bánh Nướng", Slug = "banh-nuong", Description = "Bánh nướng vàng giòn thơm phức truyền thống", IconUrl = "/Icon-danhmucsp/icon-banhnuong.jpg", DisplayOrder = 4 },
                new() { Name = "Bánh Quy", Slug = "banh-quy", Description = "Bánh quy giòn rụm bơ sữa cao cấp", IconUrl = "/Icon-danhmucsp/icon-banhquy.jpg", DisplayOrder = 5 },
                new() { Name = "Đồ Uống", Slug = "do-uong", Description = "Thức uống tươi mát, trà và cà phê kết hợp bánh tuyệt hảo", IconUrl = "/Icon-danhmucsp/icon-douong.jpg", DisplayOrder = 6 }
            };

            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }

        // 2. Seed Admin and Demo User if empty
        if (!context.Users.Any())
        {
            var users = new List<User>
            {
                new()
                {
                    Username = "admin",
                    FullName = "Quản Trị Viên HONEYQUE",
                    Email = "admin@honeyquebakery.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123456"),
                    Role = "Admin",
                    PhoneNumber = "0901234567",
                    Address = "123 Đường Bánh Ngọt, Quận 1, TP. Hồ Chí Minh"
                },
                new()
                {
                    Username = "khachhang",
                    FullName = "Nguyễn Văn A",
                    Email = "khachhang@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Khach@123456"),
                    Role = "Customer",
                    PhoneNumber = "0912345678",
                    Address = "456 Đường Sữa Tươi, Quận 3, TP. Hồ Chí Minh"
                }
            };

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }

        // 3. Seed Products from product.json if empty
        if (!context.Products.Any())
        {
            // Find product.json path in current dir or parent directories
            string[] candidatePaths = [
                Path.Combine(env.ContentRootPath, "product.json"),
                Path.Combine(env.ContentRootPath, "..", "..", "product.json"),
                Path.Combine(AppContext.BaseDirectory, "product.json")
            ];

            string? productJsonPath = candidatePaths.FirstOrDefault(File.Exists);

            if (productJsonPath != null)
            {
                var jsonContent = await File.ReadAllTextAsync(productJsonPath);
                var items = JsonSerializer.Deserialize<List<JsonProduct>>(jsonContent, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (items != null && items.Count > 0)
                {
                    var catDict = context.Categories.ToDictionary(c => c.Name.ToLower(), c => c.Id);

                    var productsToAdd = new List<Product>();

                    foreach (var item in items)
                    {
                        var rawCat = (item.category ?? "Bánh Ngọt").Trim().ToLower();
                        // Normalize variations like "bánh quy"
                        if (rawCat.Contains("quy")) rawCat = "bánh quy";

                        int categoryId = catDict.ContainsKey(rawCat) ? catDict[rawCat] : context.Categories.First().Id;

                        string statusTags = item.status != null ? string.Join(",", item.status) : "";
                        string ingredientsJson = item.ingredients != null ? JsonSerializer.Serialize(item.ingredients) : "[]";

                        var product = new Product
                        {
                            ProductCode = item.id ?? Guid.NewGuid().ToString("N")[..8],
                            Name = item.name ?? "Sản phẩm bánh",
                            Price = item.price,
                            OriginalPrice = item.status != null && item.status.Any(s => s.Contains("Sale", StringComparison.OrdinalIgnoreCase)) 
                                ? Math.Round(item.price * 1.15m, 0) 
                                : null,
                            CategoryId = categoryId,
                            StatusTags = statusTags,
                            Description = item.description,
                            Ingredients = ingredientsJson,
                            Calories = item.nutrition?.calories,
                            Fat = item.nutrition?.fat,
                            Carb = item.nutrition?.carb,
                            Protein = item.nutrition?.protein,
                            StockQuantity = 100,
                            IsActive = true
                        };

                        if (item.images != null && item.images.Count > 0)
                        {
                            for (int i = 0; i < item.images.Count; i++)
                            {
                                var imgUrl = item.images[i].Trim();
                                if (!imgUrl.StartsWith("/"))
                                {
                                    imgUrl = "/" + imgUrl;
                                }

                                product.Images.Add(new ProductImage
                                {
                                    ImageUrl = imgUrl,
                                    IsMain = (i == 0),
                                    DisplayOrder = i + 1
                                });
                            }
                        }

                        productsToAdd.Add(product);
                    }

                    await context.Products.AddRangeAsync(productsToAdd);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
