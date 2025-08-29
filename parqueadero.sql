-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-08-2025 a las 00:31:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `parqueadero`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradas`
--

CREATE TABLE `entradas` (
  `id` int(10) NOT NULL,
  `vehiculo_id` varchar(6) NOT NULL,
  `parqueadero_id` int(10) NOT NULL,
  `horaEntrada` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `horaSalida` timestamp NULL DEFAULT NULL,
  `costo` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entradas`
--

INSERT INTO `entradas` (`id`, `vehiculo_id`, `parqueadero_id`, `horaEntrada`, `horaSalida`, `costo`) VALUES
(42, '123asd', 1, '2025-08-28 22:40:14', '2025-08-28 22:40:14', 10),
(43, '123asd', 1, '2025-08-29 16:12:44', '2025-08-29 16:12:44', 10),
(44, '123asd', 1, '2025-08-29 16:20:01', NULL, NULL),
(47, '123a49', 1, '2025-08-29 16:26:12', '2025-08-29 16:26:12', 10),
(48, '123a49', 1, '2025-08-29 16:30:21', '2025-08-29 16:30:21', 10),
(49, '123a49', 1, '2025-08-29 16:30:23', '2025-08-29 16:30:23', 10),
(50, '123a49', 1, '2025-08-29 16:37:17', NULL, NULL),
(51, '123qwe', 1, '2025-08-29 21:03:53', '2025-08-29 21:03:53', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parqueaderos`
--

CREATE TABLE `parqueaderos` (
  `id` int(10) NOT NULL,
  `usuario_id` int(35) DEFAULT NULL,
  `capacidad` int(2) NOT NULL,
  `costo_hora` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `parqueaderos`
--

INSERT INTO `parqueaderos` (`id`, `usuario_id`, `capacidad`, `costo_hora`) VALUES
(1, 2, 3, 10),
(2, 2, 3, 10),
(3, 2, 4, 10),
(7, NULL, 10, 20),
(8, NULL, 10, 20),
(9, NULL, 10, 20),
(10, NULL, 10, 20),
(11, NULL, 10, 20),
(12, NULL, 10, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `usuario` varchar(35) NOT NULL,
  `pass` varchar(35) NOT NULL,
  `rol` enum('Admin','Socio') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `usuario`, `pass`, `rol`) VALUES
(1, 'admin', 'admin@mail.com', 'admin', 'Admin'),
(2, 'franklin', 'franklin@mail.com', 'admin', 'Socio'),
(3, 'ronquillo', 'ronquillo@mail.com', 'admin', 'Socio'),
(7, 'socio', 'socio@mail.com', 'admin', 'Socio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` varchar(6) NOT NULL,
  `usuario_id` int(10) NOT NULL,
  `parqueadero_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `usuario_id`, `parqueadero_id`) VALUES
('123a4s', 2, NULL),
('123qwe', 2, NULL),
('123a49', 2, 1),
('123asd', 2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entradas`
--
ALTER TABLE `entradas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehiculo_id` (`vehiculo_id`,`parqueadero_id`),
  ADD KEY `parqueadero_id` (`parqueadero_id`);

--
-- Indices de la tabla `parqueaderos`
--
ALTER TABLE `parqueaderos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`,`parqueadero_id`),
  ADD KEY `parqueadero_id` (`parqueadero_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entradas`
--
ALTER TABLE `entradas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `parqueaderos`
--
ALTER TABLE `parqueaderos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `entradas`
--
ALTER TABLE `entradas`
  ADD CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculos` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `entradas_ibfk_2` FOREIGN KEY (`parqueadero_id`) REFERENCES `parqueaderos` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `parqueaderos`
--
ALTER TABLE `parqueaderos`
  ADD CONSTRAINT `parqueaderos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`parqueadero_id`) REFERENCES `parqueaderos` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `vehiculos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

