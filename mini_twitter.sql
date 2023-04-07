-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 08, 2023 at 12:17 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_twitter`
--

-- --------------------------------------------------------

--
-- Table structure for table `Comment`
--

CREATE TABLE `Comment` (
  `id` int(11) NOT NULL,
  `tweet_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Comment`
--

INSERT INTO `Comment` (`id`, `tweet_id`, `user_id`, `description`, `createdAt`) VALUES
(1, 2, 2, 'Update Comment lagi', '2023-04-07 12:31:07.838'),
(3, 2, 1, 'Mantappp', '2023-04-07 12:48:35.778'),
(4, 5, 1, 'Masyaallah Brother', '2023-04-07 22:07:16.257');

-- --------------------------------------------------------

--
-- Table structure for table `Tweet`
--

CREATE TABLE `Tweet` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Tweet`
--

INSERT INTO `Tweet` (`id`, `user_id`, `createdAt`, `description`) VALUES
(2, 1, '2023-04-07 09:46:38.166', 'Jangan biarkan kegagalan membuatmu berhenti. Gunakan itu sebagai kesempatan untuk belajar dan tumbuh menjadi lebih baik.'),
(3, 2, '2023-04-07 12:27:05.977', 'Tweet ke-2'),
(4, 2, '2023-04-07 12:35:36.606', 'Tweet ke-2'),
(5, 1, '2023-04-07 21:59:41.572', 'Saat ini, ada begitu banyak hal yang bisa kita lakukan untuk membuat dunia menjadi tempat yang lebih baik. Mari bersama-sama berbuat kebaikan dengan tindakan kecil yang berarti.');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`) VALUES
(1, 'Fauzein Mulya Warman', 'fauzeinmw2@gmail.com', '$2b$10$2uNvAbJdh/x3/UPg/lQZJ.Q0HXa25qkbXYBUdvKbo4AfB1lme1h1K', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJGYXV6ZWluIE11bHlhIFdhcm1hbiIsImVtYWlsIjoiZmF1emVpbm13MkBnbWFpbC5jb20iLCJpYXQiOjE2ODA5MDQ0NTgsImV4cCI6MTY4MDk5MDg1OH0.bFh33fNxC6DrmBJvLyziduBkFJsSotoBarmm3qyC_3s', '2023-04-07 09:16:35.236'),
(2, 'Siapa Hayooo???', 'anonymous@gmail.com', '$2b$10$eOqx8xDJdP5HwXNzEQAxb.2NJktxTRG7JAZ7MU.ZZgkfn.2UTTy7G', NULL, '2023-04-07 09:36:02.570'),
(3, 'Budi mahabudiman', 'budi@gmail.com', '$2b$10$fqE5lm9borA6wXqg4ZSwX./8zGvmzHgX6pK31flDjdhyFHLP81jfe', NULL, '2023-04-07 13:49:48.434');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('19a022d3-c2ad-47fb-a92d-91ad54b837f2', 'bc626536958cc4c5316dce2a1952b0fc35f03b6f4e28d15301bb3306c0aa2163', '2023-04-07 08:41:45.888', '20230407084145_first_migrate', NULL, NULL, '2023-04-07 08:41:45.822', 1),
('9983221a-d8e0-49bb-8c13-79db16c2180c', '1583ad4e0c90ea3d528dfdc7bc17502be8a103e990790086562b2fbcc8a08e15', '2023-04-07 09:03:28.440', '20230407090328_update_column_tweet', NULL, NULL, '2023-04-07 09:03:28.433', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Comment_user_id_fkey` (`user_id`),
  ADD KEY `Comment_tweet_id_fkey` (`tweet_id`);

--
-- Indexes for table `Tweet`
--
ALTER TABLE `Tweet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tweet_user_id_fkey` (`user_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Comment`
--
ALTER TABLE `Comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Tweet`
--
ALTER TABLE `Tweet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `Comment_tweet_id_fkey` FOREIGN KEY (`tweet_id`) REFERENCES `Tweet` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Tweet`
--
ALTER TABLE `Tweet`
  ADD CONSTRAINT `Tweet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
