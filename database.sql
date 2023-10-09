-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2023 a las 00:30:31
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Base de datos: `cursosadobe`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `usuario`
--
CREATE TABLE `usuario` (
    `id` int(11) NOT NULL,
    `id_cliente` int(11) NOT NULL,
    `nombre` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `empresa` varchar(255) NOT NULL,
    `ip` varchar(255) DEFAULT NULL,
    `telefono` varchar(20) DEFAULT NULL,
    `dispositivos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`dispositivos`))
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Volcado de datos para la tabla `usuario`
--
INSERT INTO `usuario` (
        `id`,
        `id_cliente`,
        `nombre`,
        `email`,
        `empresa`,
        `ip`,
        `telefono`,
        `dispositivos`
    )
VALUES (
        1,
        1,
        'Juan Andres Morales',
        'juanskate326@gmail.com',
        'Cymetria Group',
        '127.0.0.1',
        NULL,
        NULL
    ),
    (
        2,
        1,
        'Andrés Lizarazo ',
        'skyhot64@gmail.com',
        'Cymetria ',
        '186.31.210.210',
        NULL,
        NULL
    ),
    (
        3,
        1,
        'Juan Andres Morales',
        'juanskate326@gmail.com',
        'Cymetria Group',
        '190.85.213.123',
        NULL,
        NULL
    ),
    (
        4,
        1,
        'OSCAR DUENAS',
        'oscar.duenas@cymetria.com',
        'CYMETRIA',
        '191.156.54.94',
        NULL,
        NULL
    ),
    (
        5,
        1,
        'Damaris Garcia',
        'damayegarcia@gmail.con',
        'Prueba ',
        '45.172.223.69',
        NULL,
        NULL
    ),
    (
        6,
        1,
        'Juan Andres Morales',
        'juanskate326@gmail.com',
        'Cymetria Group',
        '190.85.213.123',
        NULL,
        NULL
    );
--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
ADD PRIMARY KEY (`id`),
    ADD KEY `id_cliente` (`id_cliente`);
--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 7;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;