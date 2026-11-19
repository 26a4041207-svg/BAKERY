-- ========================================================
-- HONEYQUE BAKERY - SQL SERVER DATABASE SCHEMA & SEED DATA
-- Target Database: Microsoft SQL Server 2019 / 2022 / 2025
-- ========================================================

USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'BakeryDb')
BEGIN
    CREATE DATABASE [BakeryDb];
END
GO

USE [BakeryDb];
GO

-- 1. Table: Categories
IF OBJECT_ID(N'[dbo].[Categories]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Categories] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Name] NVARCHAR(100) NOT NULL,
        [Slug] NVARCHAR(100) NOT NULL,
        [Description] NVARCHAR(255) NULL,
        [IconUrl] NVARCHAR(255) NULL,
        [BannerUrl] NVARCHAR(255) NULL,
        [DisplayOrder] INT NOT NULL DEFAULT 0,
        [IsActive] BIT NOT NULL DEFAULT 1,
        CONSTRAINT [UQ_Categories_Slug] UNIQUE ([Slug])
    );
END
GO

-- 2. Table: Users
IF OBJECT_ID(N'[dbo].[Users]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Users] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Username] NVARCHAR(100) NOT NULL,
        [FullName] NVARCHAR(150) NOT NULL,
        [Email] NVARCHAR(150) NOT NULL,
        [PasswordHash] NVARCHAR(255) NOT NULL,
        [Role] NVARCHAR(20) NOT NULL DEFAULT 'Customer',
        [PhoneNumber] NVARCHAR(20) NULL,
        [Address] NVARCHAR(255) NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT [UQ_Users_Username] UNIQUE ([Username]),
        CONSTRAINT [UQ_Users_Email] UNIQUE ([Email])
    );
END
GO

-- 3. Table: Products
IF OBJECT_ID(N'[dbo].[Products]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Products] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [ProductCode] NVARCHAR(50) NOT NULL,
        [Name] NVARCHAR(200) NOT NULL,
        [Price] DECIMAL(18,2) NOT NULL,
        [OriginalPrice] DECIMAL(18,2) NULL,
        [CategoryId] INT NOT NULL,
        [StatusTags] NVARCHAR(100) NULL,
        [Description] NVARCHAR(MAX) NULL,
        [Ingredients] NVARCHAR(MAX) NULL,
        [Calories] INT NULL,
        [Fat] INT NULL,
        [Carb] INT NULL,
        [Protein] INT NULL,
        [StockQuantity] INT NOT NULL DEFAULT 100,
        [IsActive] BIT NOT NULL DEFAULT 1,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories]([Id]) ON DELETE NO ACTION
    );

    CREATE NONCLUSTERED INDEX [IX_Products_CategoryId] ON [dbo].[Products]([CategoryId]);
    CREATE NONCLUSTERED INDEX [IX_Products_ProductCode] ON [dbo].[Products]([ProductCode]);
END
GO

-- 4. Table: ProductImages
IF OBJECT_ID(N'[dbo].[ProductImages]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[ProductImages] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [ProductId] INT NOT NULL,
        [ImageUrl] NVARCHAR(500) NOT NULL,
        [IsMain] BIT NOT NULL DEFAULT 0,
        [DisplayOrder] INT NOT NULL DEFAULT 0,
        CONSTRAINT [FK_ProductImages_Products] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([Id]) ON DELETE CASCADE
    );

    CREATE NONCLUSTERED INDEX [IX_ProductImages_ProductId] ON [dbo].[ProductImages]([ProductId]);
END
GO

-- 5. Table: Orders
IF OBJECT_ID(N'[dbo].[Orders]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Orders] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [OrderCode] NVARCHAR(50) NOT NULL,
        [UserId] INT NULL,
        [CustomerName] NVARCHAR(150) NOT NULL,
        [PhoneNumber] NVARCHAR(50) NOT NULL,
        [Email] NVARCHAR(150) NULL,
        [ShippingAddress] NVARCHAR(500) NOT NULL,
        [Note] NVARCHAR(500) NULL,
        [PaymentMethod] NVARCHAR(50) NOT NULL DEFAULT 'COD',
        [PaymentStatus] NVARCHAR(50) NOT NULL DEFAULT 'Pending',
        [OrderStatus] NVARCHAR(50) NOT NULL DEFAULT 'Processing',
        [ShippingFee] DECIMAL(18,2) NOT NULL DEFAULT 0,
        [SubTotal] DECIMAL(18,2) NOT NULL DEFAULT 0,
        [TotalAmount] DECIMAL(18,2) NOT NULL DEFAULT 0,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT [UQ_Orders_OrderCode] UNIQUE ([OrderCode]),
        CONSTRAINT [FK_Orders_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE SET NULL
    );

    CREATE NONCLUSTERED INDEX [IX_Orders_UserId] ON [dbo].[Orders]([UserId]);
END
GO

-- 6. Table: OrderItems
IF OBJECT_ID(N'[dbo].[OrderItems]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[OrderItems] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [OrderId] INT NOT NULL,
        [ProductId] INT NOT NULL,
        [ProductName] NVARCHAR(200) NOT NULL,
        [ProductImage] NVARCHAR(500) NULL,
        [UnitPrice] DECIMAL(18,2) NOT NULL,
        [Quantity] INT NOT NULL,
        [TotalPrice] DECIMAL(18,2) NOT NULL,
        CONSTRAINT [FK_OrderItems_Orders] FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_OrderItems_Products] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([Id]) ON DELETE NO ACTION
    );

    CREATE NONCLUSTERED INDEX [IX_OrderItems_OrderId] ON [dbo].[OrderItems]([OrderId]);
END
GO

-- 7. Table: Wishlists
IF OBJECT_ID(N'[dbo].[Wishlists]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Wishlists] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [UserId] INT NOT NULL,
        [ProductId] INT NOT NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT [UQ_Wishlists_User_Product] UNIQUE ([UserId], [ProductId]),
        CONSTRAINT [FK_Wishlists_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Wishlists_Products] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([Id]) ON DELETE CASCADE
    );
END
GO

-- 8. Table: ContactMessages
IF OBJECT_ID(N'[dbo].[ContactMessages]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[ContactMessages] (
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [FullName] NVARCHAR(150) NOT NULL,
        [Email] NVARCHAR(150) NOT NULL,
        [PhoneNumber] NVARCHAR(50) NULL,
        [Subject] NVARCHAR(200) NOT NULL,
        [Message] NVARCHAR(MAX) NOT NULL,
        [IsRead] BIT NOT NULL DEFAULT 0,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

PRINT 'SQL Server Database Schema [BakeryDb] created successfully!';
GO
