namespace BakeryApi.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string ProductCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string Category => CategoryName;
    public string? Image => Images.Count > 0 ? Images[0] : null;
    public List<string> Status { get; set; } = new();
    public string? Description { get; set; }
    public List<string> Images { get; set; } = new();
    public List<string> Ingredients { get; set; } = new();
    public NutritionDto? Nutrition { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class NutritionDto
{
    public int Calories { get; set; }
    public int Fat { get; set; }
    public int Carb { get; set; }
    public int Protein { get; set; }
}

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? IconUrl { get; set; }
    public string? BannerUrl { get; set; }
    public int ProductCount { get; set; }
}

public class ProductQueryParameters
{
    public string? Category { get; set; }
    public string? Search { get; set; }
    public string? Status { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string? SortBy { get; set; } // price_asc, price_desc, name_asc, newest
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 12;
}

public class PagedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalItems { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);
}
