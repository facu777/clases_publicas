CREATE DATABASE clases_publicas;

USE clases_publicas;

-- Tabla de universidades
CREATE TABLE universidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  ubicacion VARCHAR(100) NOT NULL
);

-- Tabla de delegados
CREATE TABLE delegados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  red_social VARCHAR(100) UNIQUE,
  telefono VARCHAR(15),
  universidad_id INT,
  FOREIGN KEY (universidad_id) REFERENCES universidades(id) ON DELETE SET NULL
);

-- Tabla de clases
CREATE TABLE clases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_clase VARCHAR(100) NOT NULL,
  profesor VARCHAR(100) NOT NULL,
  hora TIME NOT NULL,
  duracion INT NOT NULL,
  universidad_id INT,
  delegado_id INT,
  FOREIGN KEY (universidad_id) REFERENCES universidades(id) ON DELETE CASCADE,
  FOREIGN KEY (delegado_id) REFERENCES delegados(id) ON DELETE CASCADE
);
