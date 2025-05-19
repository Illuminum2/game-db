-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 16, 2025 at 08:34 AM
-- Server version: 10.11.11-MariaDB-ubu2204
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Game`
--

CREATE TABLE IF NOT EXISTS `Game` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `genres` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`genres`)),
  `releaseDate` date NOT NULL,
  `description` varchar(200) NOT NULL,
  `platforms` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`platforms`)),
  `developer` varchar(50) NOT NULL,
  `publisher` varchar(50) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `bg` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Game`
--

-- IGNORE necessary if data is already present
INSERT IGNORE INTO `Game` (`id`, `title`, `genres`, `releaseDate`, `description`, `platforms`, `developer`, `publisher`, `logo`, `bg`) VALUES
(1, 'Minecraft', '[[\"Adventure\",\"adventure\",\"compass\"],[\"Indie\",\"indie\",\"stars\"],[\"Simulator\",\"simulator\",\"gear\"]]', '2016-12-19', 'Build, explore, and survive in a blocky, open-world sandbox with limitless creativity', '[[\"PC (Windows)\",\"windows\",\"windows\"],[\"Nintendo Switch\",\"switch\",\"nintendo-switch\"],[\"Play Station\",\"playstation\",\"playstation\"],[\"X-Box\",\"xbox\",\"xbox\"],[\"iOS\",\"ios\",\"apple\"],[\"Android\",\"android\",\"android\"]]', 'Mojang Studios', 'Mojang Studios', 'https://cdn.prod.website-files.com/64ea57571d50b02423c4505d/64fa5f649846f59218adca46_minecraft%20logo%20png.png', 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/11/Minecraft-Promotional-Art.jpg'),
(2, 'BeatSaber', '[[\"Indie\",\"indie\",\"stars\"],[\"Music\",\"music\",\"music-note-beamed\"],[\"Sport\",\"sport\",\"dribbble\"]]', '2019-02-21', 'VR rhythm game where your goal is to slash the beats as they are coming at you', '[[\"PCVR (SteamVR)\",\"steamvr\",\"steam\"],[\"Meta Quest\",\"quest\",\"meta\"]]', 'Beat Games', 'Beat Games', 'https://beatsaber.com/images/BSLogo.png', 'https://mixed-news.com/en/wp-content/uploads/2023/05/Beat-Saber-Schwerter-Bloecke.jpeg'),
(3, 'Bonelab', '[[\"Adventure\",\"adventure\",\"compass\"],[\"Shooter\",\"shooter\",\"crosshair\"],[\"Simulator\",\"simulator\",\"gear\"]]', '2022-09-29', 'Sentenced to death, you embody an outcast escaping fate.', '[[\"PCVR (SteamVR)\",\"steamvr\",\"steam\"],[\"Meta Quest\",\"quest\",\"meta\"]]', 'Stress Level Zero', 'Stress Level Zero', 'https://cdn2.steamgriddb.com/logo/702010521c85cf7460eedc602c8b1cea.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgI-akPTg8fpj8QWlEgj0CSlMemgGjmVNneQ&s'),
(4, 'Celeste', '[[\"Adventure\",\"adventure\",\"compass\"],[\"Indie\",\"indie\",\"stars\"],[\"Platformer\",\"platformer\",\"box\"]]', '2018-01-28', 'Help Madeline survive her inner demons on her journey to the top of Celeste Mountain.', '[[\"PC (Windows)\",\"windows\",\"windows\"],[\"MacOS\",\"mac\",\"apple\"],[\"PC (Linux)\",\"linux\",\"ubuntu\"],[\"Nintendo Switch\",\"switch\",\"nintendo-switch\"],[\"Play Station\",\"playstation\",\"playstation\"],[\"X-Box\",\"xbox\",\"xbox\"]]', 'Extremely OK Games', 'Maddy Makes Games', 'https://www.fangamer.eu/cdn/shop/files/logo-raster-celeste.png?v=1692131779', 'https://cdn.mobygames.com/promos/10000545-celeste-other.jpg'),
(5, 'Red Dead Redemption 2', '[[\"Adventure\",\"adventure\",\"compass\"],[\"Shooter\",\"shooter\",\"crosshair\"],[\"Simulator\",\"simulator\",\"gear\"]]', '2018-10-26', 'Red Dead Redemption 2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age.', '[[\"PC (Windows)\",\"windows\",\"windows\"],[\"Nintendo Switch\",\"switch\",\"nintendo-switch\"],[\"Play Station\",\"playstation\",\"playstation\"],[\"X-Box\",\"xbox\",\"xbox\"]]', 'Rockstar-Games', 'Rockstar-Games', 'https://upload.wikimedia.org/wikipedia/commons/2/22/Red_Dead_Redemption_2_Logo.png', 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/12/rdr2-gang-art.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Game`
--
-- ALTER TABLE `Game`
--   ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Game`
--
-- ALTER TABLE `Game`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;