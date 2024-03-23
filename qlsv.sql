-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2024 at 10:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qlsv`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `name`, `department_id`) VALUES
('CNTT4', 'Công nghệ thông tin 4', 'CNTT'),
('SPT1', 'Sư phạm toán 1', 'SPT');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `name`) VALUES
('CNTT', 'Công Nghệ Thông Tin'),
('LLCT', 'Lý luận chính trị'),
('NNA', 'Ngôn ngữ Anh'),
('SPT', 'Sư Phạm Toán');

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `score_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `subject_id` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`score_id`, `value`, `student_id`, `subject_id`, `date`) VALUES
(1, 9, '100000', 'LTPHP', '2024-03-23 15:20:46'),
(2, 2, '100004', 'LTPHP', '2024-03-23 15:20:46'),
(3, 5, '100003', 'LTPHP', '2024-03-23 15:20:46'),
(4, 3, '100003', 'LTHDT', '2024-03-20 22:12:50'),
(5, 3, '100004', 'LTHDT', '2024-03-20 22:12:50'),
(6, 5, '100000', 'LTHDT', '2024-03-20 22:12:50'),
(7, 6, '100005', 'KTCT', '2024-03-21 16:48:05'),
(8, 9, '100000', 'LSD', '2024-03-23 16:26:53'),
(9, 8, '100003', 'LSD', '2024-03-23 16:26:53'),
(10, 9, '100005', 'TACS1', '2024-03-23 16:29:01');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `date_of_birth` date NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `class_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `name`, `gender`, `date_of_birth`, `address`, `class_id`) VALUES
(100000, 'Hung Ngu', '0', '2003-02-27', 'Hoa Dong - Hai Phong', 'CNTT4'),
(100003, 'Hong Dang', '0', '2024-03-19', 'Hoa Dong - Hai Phong', 'CNTT4'),
(100004, 'Hoang Nam', '0', '2024-03-19', 'Xuan Doai', 'SPT1'),
(100005, 'Dũng Bùi', '0', '2024-03-14', 'Tiên Lãng-Hải Phòng', 'CNTT4');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subject_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department_id` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `registered_students` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject_id`, `name`, `department_id`, `status`, `registered_students`) VALUES
('KTCT', 'Kinh tế chính trị Mác-Lênin', 'LLCT', 0, 'a:1:{i:0;i:100005;}'),
('LSD', 'Lịch sử Đảng', 'LLCT', 1, 'a:2:{i:0;i:100000;i:1;i:100003;}'),
('LTHDT', 'Lập trình hướng đội tượng', 'CNTT', 1, 'a:3:{i:0;i:100003;i:1;s:6:\"100004\";i:2;i:100000;}'),
('LTPHP', 'Lập trình PHP', 'CNTT', 1, 'a:3:{i:0;i:100000;i:1;i:100004;i:2;i:100003;}'),
('TACS1', 'Tiếng Anh cơ sở 1', 'NNA', 0, 'a:1:{i:0;i:100005;}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'student',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `name`, `role`, `created_at`) VALUES
(1, 'admin', '123456', 'Hung Ngu', 'admin', '2024-03-20 22:20:20'),
(2, 'hungngu', '123', 'hhh', 'user', '2024-03-21 14:58:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`score_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `score_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100006;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
