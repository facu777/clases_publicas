-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: clases_publicas
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clases`
--

DROP TABLE IF EXISTS `clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_clase` varchar(100) NOT NULL,
  `profesor` varchar(100) NOT NULL,
  `hora` datetime NOT NULL,
  `duracion` int NOT NULL,
  `universidad_id` int DEFAULT NULL,
  `delegado_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `universidad_id` (`universidad_id`),
  KEY `delegado_id` (`delegado_id`),
  CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`universidad_id`) REFERENCES `universidades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `clases_ibfk_2` FOREIGN KEY (`delegado_id`) REFERENCES `delegados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clases`
--

LOCK TABLES `clases` WRITE;
/*!40000 ALTER TABLE `clases` DISABLE KEYS */;
INSERT INTO `clases` VALUES (1,'Facundo','Facundo','2024-10-20 08:49:00',1,1,1);
/*!40000 ALTER TABLE `clases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delegados`
--

DROP TABLE IF EXISTS `delegados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delegados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `red_social` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `universidad_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `red_social` (`red_social`),
  KEY `universidad_id` (`universidad_id`),
  CONSTRAINT `delegados_ibfk_1` FOREIGN KEY (`universidad_id`) REFERENCES `universidades` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delegados`
--

LOCK TABLES `delegados` WRITE;
/*!40000 ALTER TABLE `delegados` DISABLE KEYS */;
INSERT INTO `delegados` VALUES (1,'Anónimo','anonimo@ejemplo.com',NULL,'0000000000',NULL);
/*!40000 ALTER TABLE `delegados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universidades`
--

DROP TABLE IF EXISTS `universidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `especialidad` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universidades`
--

LOCK TABLES `universidades` WRITE;
/*!40000 ALTER TABLE `universidades` DISABLE KEYS */;
INSERT INTO `universidades` VALUES (1,'Universidad Nacional del Alto Uruguay','Misiones',NULL),(2,'Universidad Nacional de las Artes','CABA',NULL),(3,'Universidad Nacional Arturo Jauretche','Florencio Varela',NULL),(4,'Universidad Autónoma de Entre Ríos','Entre Ríos',NULL),(5,'Universidad Nacional de Avellaneda','Avellaneda',NULL),(6,'Universidad de Buenos Aires','CABA',NULL),(7,'Universidad Nacional de Catamarca','Catamarca',NULL),(8,'Universidad Nacional del Centro de la Provincia de Buenos Aires','Tandil',NULL),(9,'Universidad Nacional del Chaco Austral','Chaco',NULL),(10,'Universidad Nacional de Chilecito','La Rioja',NULL),(11,'Universidad del Chubut','Chubut',NULL),(12,'Universidad de la Ciudad de Buenos Aires','CABA',NULL),(13,'Universidad Nacional del Comahue','Neuquén',NULL),(14,'Universidad Nacional de los Comechingones','San Luis',NULL),(15,'Universidad Nacional de Córdoba','Córdoba',NULL),(16,'Universidad Provincial de Córdoba','Córdoba',NULL),(17,'Universidad Nacional de Cuyo','Mendoza',NULL),(18,'Universidad de la Defensa Nacional','CABA',NULL),(19,'Universidad Nacional del Delta','Buenos Aires',NULL),(20,'Universidad Nacional de Entre Ríos','Entre Ríos',NULL),(21,'Universidad Provincial de Ezeiza','Ezeiza',NULL),(22,'Universidad Nacional de Formosa','Formosa',NULL),(23,'Universidad Nacional de General Sarmiento','San Miguel',NULL),(24,'Universidad Nacional Guillermo Brown','Almirante Brown',NULL),(25,'Universidad Nacional de Hurlingham','Hurlingham',NULL),(26,'Instituto Universitario de la Gendarmería Nacional Argentina','CABA',NULL),(27,'Instituto Universitario de la Policía Federal Argentina','CABA',NULL),(28,'Instituto Universitario Policial Provincial Juan Vucetich','Buenos Aires',NULL),(29,'Instituto Universitario Provincial de Seguridad','Buenos Aires',NULL),(30,'Instituto Universitario de Seguridad de la Ciudad','CABA',NULL),(31,'Instituto Universitario de Seguridad Marítima','CABA',NULL),(32,'Instituto Universitario Patagónico de las Artes','Río Negro',NULL),(33,'Universidad Nacional de José C. Paz','José C. Paz',NULL),(34,'Universidad Nacional de Jujuy','Jujuy',NULL),(35,'Universidad Provincial de Laguna Blanca','Formosa',NULL),(36,'Universidad Nacional de La Matanza','San Justo',NULL),(37,'Universidad Nacional de La Pampa','La Pampa',NULL),(38,'Universidad Nacional de La Plata','La Plata',NULL),(39,'Universidad Nacional de La Rioja','La Rioja',NULL),(40,'Universidad Nacional de Lanús','Lanús',NULL),(41,'Universidad Nacional del Litoral','Santa Fe',NULL),(42,'Universidad Nacional de Lomas de Zamora','Lomas de Zamora',NULL),(43,'Universidad Nacional de Luján','Luján',NULL),(44,'Universidad Nacional Madres de Plaza de Mayo','CABA',NULL),(45,'Universidad Nacional de Mar del Plata','Mar del Plata',NULL),(46,'Universidad Nacional de Misiones','Misiones',NULL),(47,'Universidad Nacional de Moreno','Moreno',NULL),(48,'Universidad Nacional del Nordeste','Corrientes',NULL),(49,'Universidad Nacional del Noroeste de la Provincia de Buenos Aires','Junín',NULL),(50,'Universidad Nacional del Oeste','Merlo',NULL),(51,'Universidad Nacional de la Patagonia San Juan Bosco','Chubut',NULL),(52,'Universidad Nacional de la Patagonia Austral','Santa Cruz',NULL),(53,'Universidad Pedagógica Nacional','CABA',NULL),(54,'Universidad Nacional de Quilmes','Bernal',NULL),(55,'Universidad Nacional de Rafaela','Santa Fe',NULL),(56,'Universidad Nacional Raúl Scalabrini Ortiz','San Isidro',NULL),(57,'Universidad Nacional de Río Cuarto','Córdoba',NULL),(58,'Universidad Nacional de Río Negro','Río Negro',NULL),(59,'Universidad Nacional de Rosario','Rosario',NULL),(60,'Universidad Nacional de Salta','Salta',NULL),(61,'Universidad Nacional de San Antonio de Areco','San Antonio de Areco',NULL),(62,'Universidad Nacional de San Juan','San Juan',NULL),(63,'Universidad Nacional de San Luis','San Luis',NULL),(64,'Universidad Nacional de San Martín','San Martín',NULL),(65,'Universidad Nacional de Santiago del Estero','Santiago del Estero',NULL),(66,'Universidad Provincial del Sudoeste','Buenos Aires',NULL),(67,'Universidad Nacional del Sur','Bahía Blanca',NULL),(68,'Universidad Tecnológica Nacional','CABA',NULL),(69,'Universidad Nacional de Tierra del Fuego','Tierra del Fuego',NULL),(70,'Universidad Nacional de Tres de Febrero','Tres de Febrero',NULL),(71,'Universidad Nacional de Tucumán','Tucumán',NULL),(72,'Universidad Nacional de Villa María','Villa María',NULL),(73,'Universidad Nacional de Villa Mercedes','San Luis',NULL),(74,'UtN','mozart 2300',NULL);
/*!40000 ALTER TABLE `universidades` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21  2:55:08
