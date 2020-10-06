﻿--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.2.23.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 6/10/2020 2:03:50 p. m.
-- Server version: 5.5.5-10.4.14-MariaDB
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

DROP DATABASE IF EXISTS prueba_data_base;

CREATE DATABASE prueba_data_base
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_general_ci;

--
-- Set default database
--
USE prueba_data_base;

--
-- Create table `usuarios`
--
CREATE TABLE usuarios (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(40) DEFAULT NULL,
  correo VARCHAR(40) DEFAULT NULL,
  password VARCHAR(70) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 12,
AVG_ROW_LENGTH = 1489,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `categorias`
--
CREATE TABLE categorias (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(40) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  idUsuario INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 39,
AVG_ROW_LENGTH = 1365,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create foreign key
--
ALTER TABLE categorias 
  ADD CONSTRAINT FK_categorias_idUsuario FOREIGN KEY (idUsuario)
    REFERENCES usuarios(id) ON DELETE NO ACTION;

--
-- Create table `productos`
--
CREATE TABLE productos (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(40) NOT NULL,
  idCategoria INT(11) NOT NULL,
  precio DOUBLE NOT NULL,
  cantidad INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 31,
AVG_ROW_LENGTH = 910,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create foreign key
--
ALTER TABLE productos 
  ADD CONSTRAINT FK_productos_idCategoria FOREIGN KEY (idCategoria)
    REFERENCES categorias(id) ON DELETE NO ACTION;

-- 
-- Dumping data for table usuarios
--
INSERT INTO usuarios VALUES
(1, 'Juan', 'juan@correo.co', '$2a$10$BHojCdDSMk6SkbIRu8.1buwe8PBxELS3k2IXkA2VlwLToqxhfxFji'),
(2, 'Natalia', 'natalia@correo.co', '54321'),
(3, 'edinson', 'edinson@correo.co', '$2a$10$qaFq.EFKuvnbB0sqix1Tg.n8rmIpZtfon110I9AvyAYoJ2LldRjv6'),
(4, 'Ivan', 'ivan@correo.co', '$2a$10$OwaLj0tXC4tplubNfs2xjO56o.cyLd.kem33BWf0hQor3.eu18obe'),
(5, 'Andres Ortega Meneses', 'andres@correo.co', '$2a$10$t9ylpFTtXshSENAJzbIjZeY7W8zOBfh/xLrlzRtBgnih.QyFy5KpS'),
(6, 'Maried Natalia Meneses', 'maried@correo.co', '$2a$10$O8tu7/ahEJphU4H4DDQ9BO1Q23QHxDQkPD3h5uoOkm6p1K021aYlS'),
(7, 'Maria Esperanza Pinio', 'maria@correo.co', '$2a$10$BHojCdDSMk6SkbIRu8.1buwe8PBxELS3k2IXkA2VlwLToqxhfxFji'),
(8, 'natica', 'nmeneses@correo.co', '$2a$10$PTIBlSIaak4EadhChnOVDuatTZeoLgS.1IRaxxDnCFxQTP4t0pxIO'),
(9, 'juanito', 'juanito@correo.co', '$2a$10$Rk85lzfGp/MhOd4C6bvbOuKD8qSYZolfYk.ubGPj8B6ZaKxlr7nZO'),
(10, 'juanito1', 'juanito1@correo.co', '$2a$10$buHddkA6VDtwaSn88qSIhu43GWVNOv1FoPwX4QTc1AUikfZ9Bv4Mq'),
(11, 'maria', 'mariapino@correo.co', '$2a$10$.2frAJ.7Azln2TKwq11XR.goeG0sZ6MlKYZ5yJjeSjwHi/u7e65J2');

-- 
-- Dumping data for table categorias
--
INSERT INTO categorias VALUES
(1, 'Aseo', 'Categoria para productos de aseo', 1),
(5, 'Electrodomésticos', 'Categoría de electrodomésticos', 1),
(6, 'Abarrotes', 'Categoría para abarrotes', 1),
(7, 'Frutas', 'Categoría de frutas', 1),
(8, 'Verduras', 'Categoría de verduras', 1),
(10, 'Ropa para dama', 'Categoría para ropa dama', 8),
(14, 'Zapateria', 'Esta categoria es para zapatos', 1),
(30, 'Muñecos', 'Esta categoria es para zapatos', 2),
(31, 'Accesorios para celular', 'Categoría de accesorios para celulares\n', 8),
(36, 'Peluches', 'esta categoria es para peluches', 8),
(37, 'Peluches', 'Categoría de peluches', 1),
(38, 'Productos de belleza', 'Categoría para productos de belleza', 8);

-- 
-- Dumping data for table productos
--
INSERT INTO productos VALUES
(1, 'Crema dental colgate', 7, 1500, 200),
(6, 'Adidas', 14, 120000, 12),
(9, 'Crema del cuerpo', 1, 4399, 100),
(12, 'Televisor Smart', 5, 1250000, 50),
(13, 'Nevera', 5, 1000000, 60),
(14, 'Licuadora', 5, 80000, 25),
(16, 'Cepillo', 1, 3000, 18),
(17, 'Cargador', 31, 15000, 70),
(18, 'Celular Samsung', 5, 300000, 2),
(19, 'Pantalón', 10, 60000, 3),
(20, 'Medias', 10, 2000, 50),
(23, 'Jabón', 1, 1900, 145),
(24, 'piama', 10, 12222, 17),
(26, 'Zuma', 36, 12345, 12),
(27, 'Zuma', 37, 30000, 160),
(28, 'Leche', 1, 2000, 10),
(29, 'Mango', 7, 2000, 30),
(30, 'Protector de pantalla', 31, 25000, 30);

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;