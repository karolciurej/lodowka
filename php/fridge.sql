-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2023 at 01:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fridge`
--

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `pos_x` int(11) NOT NULL,
  `pos_y` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `text` text NOT NULL,
  `zindex` int(11) NOT NULL,
  `fridge_name` varchar(15) NOT NULL,
  `id_in_fridge` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`id`, `pos_x`, `pos_y`, `height`, `width`, `text`, `zindex`, `fridge_name`, `id_in_fridge`) VALUES
(1365, 50, 150, 200, 200, '', 97, 'cas', '776517ff-a653-4eb9-87fb-07e2903d16cd'),
(1366, 50, 150, 200, 200, '', 98, 'cas', '19495a02-5649-4200-8f91-68ba073fa6cc'),
(1367, 264, 209, 200, 200, '', 3, 'TAB Ą', '9c5cb571-64f4-4c8a-a6e8-ba7a94469e5f'),
(1368, 206, 374, 200, 200, '', 0, 'casc', '4cc99799-d4bd-45c1-be8f-971989cb3c4c'),
(1369, 434, 231, 200, 200, '', 100, 'casc', '10122432-9716-458f-82b3-e2f9905fc6e8'),
(1370, 492, 372, 200, 200, '', 97, 'casc', '3499a5ba-28ea-4299-b7e3-6185d147fee6'),
(1371, 692, 284, 347, 401, '', 129, 'casc', '3a0ce0d1-64cd-45fd-b101-67796b056c97');

-- --------------------------------------------------------

--
-- Table structure for table `fridges`
--

CREATE TABLE `fridges` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `total_cards` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `fridges`
--

INSERT INTO `fridges` (`id`, `name`, `total_cards`) VALUES
(37, 'cas', 3),
(38, 'TAB Ą', 1),
(39, 'casc', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fridges`
--
ALTER TABLE `fridges`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1372;

--
-- AUTO_INCREMENT for table `fridges`
--
ALTER TABLE `fridges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
