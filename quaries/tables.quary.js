-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 12, 2022 at 06:36 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delivery_managemant_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `Admin_ID` int(11) NOT NULL AUTO_INCREMENT,
  `User_ID` varchar(18) NOT NULL,
  `Name` text NOT NULL,
  PRIMARY KEY (`Admin_ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`Admin_ID`, `User_ID`, `Name`) VALUES
(5, '8d0rgh8lol49q8l36', 'bimsara');

-- --------------------------------------------------------

--
-- Table structure for table `assistant`
--

DROP TABLE IF EXISTS `assistant`;
CREATE TABLE IF NOT EXISTS `assistant` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `First_Name` text NOT NULL,
  `Last_Name` text NOT NULL,
  `User_ID` varchar(18) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assistant`
--

INSERT INTO `assistant` (`ID`, `First_Name`, `Last_Name`, `User_ID`) VALUES
(1, 'dilusha', 'pulle', '8d0rghkkcl4axn46j');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `First_Name` text NOT NULL,
  `Last_Name` text NOT NULL,
  `Role` text NOT NULL,
  `Address` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
CREATE TABLE IF NOT EXISTS `driver` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `Order_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Customer_ID` int(11) DEFAULT NULL,
  `Price` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Route_ID` int(11) NOT NULL,
  `Is_Delivered` tinyint(1) NOT NULL,
  `Capacity` int(11) NOT NULL,
  PRIMARY KEY (`Order_ID`),
  KEY `Customer_ID` (`Customer_ID`),
  KEY `Route_ID` (`Route_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE IF NOT EXISTS `order_detail` (
  `Product_ID` int(11) NOT NULL,
  `Order_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  PRIMARY KEY (`Product_ID`,`Order_ID`),
  KEY `Order_ID` (`Order_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `Product_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Price` int(11) NOT NULL,
  PRIMARY KEY (`Product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
CREATE TABLE IF NOT EXISTS `route` (
  `Route_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Start_City` text NOT NULL,
  `End_City` text NOT NULL,
  PRIMARY KEY (`Route_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff_member`
--

DROP TABLE IF EXISTS `staff_member`;
CREATE TABLE IF NOT EXISTS `staff_member` (
  `Staff_ID` int(11) NOT NULL AUTO_INCREMENT,
  `User_ID` varchar(18) DEFAULT NULL,
  `First_Name` text NOT NULL,
  `Last_Name` text NOT NULL,
  `Role` text NOT NULL,
  PRIMARY KEY (`Staff_ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff_member`
--

INSERT INTO `staff_member` (`Staff_ID`, `User_ID`, `First_Name`, `Last_Name`, `Role`) VALUES
(6, '8d0rgh7col49qzs7z', 'sankalana', 'banda', 'del'),
(7, '8d0rghjpgl49r13g4', 'sankalana', 'banda', 'del'),
(8, '8d0rgh41kl4an3qmr', 'sankalana', 'banda', 'del'),
(9, '8d0rgh8zcl4an7d53', 'sankalana', 'banda', 'del'),
(10, '8d0rgh8zcl4at0zp8', 'sankalana', 'banda', 'del'),
(11, '8d0rghoegl4at213b', 'sankalana', 'banda', 'del');

-- --------------------------------------------------------

--
-- Table structure for table `storekeeper`
--

DROP TABLE IF EXISTS `storekeeper`;
CREATE TABLE IF NOT EXISTS `storekeeper` (
  `User_ID` varchar(18) NOT NULL,
  `Storekeeper_ID` int(11) NOT NULL AUTO_INCREMENT,
  `First_Name` text NOT NULL,
  `Last_Name` text NOT NULL,
  PRIMARY KEY (`Storekeeper_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `storekeeper`
--

INSERT INTO `storekeeper` (`User_ID`, `Storekeeper_ID`, `First_Name`, `Last_Name`) VALUES
('8d0rghhsgl4awsm23', 1, 'dilusha', 'pulle');

-- --------------------------------------------------------

--
-- Table structure for table `train`
--

DROP TABLE IF EXISTS `train`;
CREATE TABLE IF NOT EXISTS `train` (
  `Train_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Start_City` text NOT NULL,
  `End_City` text NOT NULL,
  `Capacity` int(11) NOT NULL,
  PRIMARY KEY (`Train_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `train_delivery_assign`
--

DROP TABLE IF EXISTS `train_delivery_assign`;
CREATE TABLE IF NOT EXISTS `train_delivery_assign` (
  `Assignment_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Train_ID` int(11) NOT NULL,
  `Date_Of_Depature` date NOT NULL,
  `Time_Of_Depature` time NOT NULL,
  `Transport_Hours` int(11) NOT NULL,
  PRIMARY KEY (`Assignment_ID`),
  KEY `Train_ID` (`Train_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `train_order_delivery`
--

DROP TABLE IF EXISTS `train_order_delivery`;
CREATE TABLE IF NOT EXISTS `train_order_delivery` (
  `Assignment_ID` int(11) NOT NULL,
  `Order_ID` int(11) NOT NULL,
  PRIMARY KEY (`Assignment_ID`),
  KEY `Order_ID` (`Order_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `truck`
--

DROP TABLE IF EXISTS `truck`;
CREATE TABLE IF NOT EXISTS `truck` (
  `Truck_Number` varchar(10) NOT NULL,
  `Capacity` int(11) NOT NULL,
  PRIMARY KEY (`Truck_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `truck`
--

INSERT INTO `truck` (`Truck_Number`, `Capacity`) VALUES
('WP7050', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `truck_delivery_assign`
--

DROP TABLE IF EXISTS `truck_delivery_assign`;
CREATE TABLE IF NOT EXISTS `truck_delivery_assign` (
  `Delivery_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Truck_Number` varchar(10) NOT NULL,
  `Driver_ID` int(11) NOT NULL,
  `Asssistant_ID` int(11) NOT NULL,
  `Date_Of_Depature` date NOT NULL,
  `Time_Of_Depature` time NOT NULL,
  `Transport_Hours` int(11) NOT NULL,
  `Route_ID` int(11) NOT NULL,
  PRIMARY KEY (`Delivery_ID`),
  KEY `Truck_Number` (`Truck_Number`),
  KEY `Driver_ID` (`Driver_ID`),
  KEY `Asssistant_ID` (`Asssistant_ID`),
  KEY `Route_ID` (`Route_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `truck_order_delivery`
--

DROP TABLE IF EXISTS `truck_order_delivery`;
CREATE TABLE IF NOT EXISTS `truck_order_delivery` (
  `Order_ID` int(11) NOT NULL,
  `Delivery_ID` int(11) NOT NULL,
  KEY `Delivery_ID` (`Delivery_ID`),
  KEY `Order_ID` (`Order_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `User_ID` varchar(18) NOT NULL,
  `Username` text NOT NULL,
  `Password` text NOT NULL,
  `Role` text NOT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `Username`, `Password`, `Role`) VALUES
('8d0rgh41kl4an3qmr', 'sankalana15@jk.com', '$2a$10$bxk4/yIw/BYj3B2xYRXouOZM7wI/0ANJhT93nSJR3c7o350ApxK.G', 'MANAGER'),
('8d0rgh7col49qzs7z', 'sankalana123@jk.com', '$2a$10$zb65ZIxcJTkZfBXjLcpLseeJl7lu7FAHslYyh6Mvw/ifBEuT8sCom', 'MANAGER'),
('8d0rgh8lol49q8l36', 'admin55@g.com', '$2a$10$YCYGLKIFv2Itl3.H9jJ.aujsAcuRM3ECNIhMP/zudhCdSO6Q4nZpy', 'ADMIN'),
('8d0rgh8zcl4an7d53', 'sankalana5515@jk.com', '$2a$10$5Q8zFUdmP1jzKG3kB.UfdOjUaI7cT6KYSNSZG/e0.Ze.4eHB2HHZG', 'MANAGER'),
('8d0rgh8zcl4at0zp8', 'sankana5515@jk.com', '$2a$10$nEzBahDm0ndOKLn.4YVEQODXoYNlkDlMEOL6bbYU9.ZxK0MK4HZB2', 'MANAGER'),
('8d0rghhsgl4awsm23', 'storekeeper1@g.com', '$2a$10$uKN2BwLPfiOWgsFqi0XrZu0BeWLCx/bWu2yoCLZcx5X.BN8XtDzXC', 'STOREKEEPER'),
('8d0rghjpgl49r13g4', 'sankalana1@jk.com', '$2a$10$bKVJ9syakDSRiiFpkXAXvueyvhSaPgb.sHOL4Rl8JSJJTHEmWjaiu', 'MANAGER'),
('8d0rghkkcl4axn46j', 'assistant1@g.com', '$2a$10$gVTtpGmzGL2GeBTL1TKI7ODzc7rqUuyDXwMzRhvA2Sqzemmee2weG', 'ASSISTANT'),
('8d0rghoegl4at213b', 'sankan5515@jk.com', '$2a$10$EKbnsb3FuSAorgWNC3f5i.Mt9hOtiSsv7Q0CJ7Yhugeu2i3Xc3VIi', 'MANAGER');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `administrator`
--
ALTER TABLE `administrator`
  ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `assistant`
--
ALTER TABLE `assistant`
  ADD CONSTRAINT `assistant_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`Route_ID`) REFERENCES `route` (`Route_ID`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `product` (`Product_ID`),
  ADD CONSTRAINT `order_detail_ibfk_3` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`Order_ID`);

--
-- Constraints for table `train_delivery_assign`
--
ALTER TABLE `train_delivery_assign`
  ADD CONSTRAINT `train_delivery_assign_ibfk_1` FOREIGN KEY (`Train_ID`) REFERENCES `train` (`Train_ID`);

--
-- Constraints for table `train_order_delivery`
--
ALTER TABLE `train_order_delivery`
  ADD CONSTRAINT `train_order_delivery_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`Order_ID`),
  ADD CONSTRAINT `train_order_delivery_ibfk_2` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`Order_ID`);

--
-- Constraints for table `truck_delivery_assign`
--
ALTER TABLE `truck_delivery_assign`
  ADD CONSTRAINT `truck_delivery_assign_ibfk_1` FOREIGN KEY (`Truck_Number`) REFERENCES `truck` (`Truck_Number`),
  ADD CONSTRAINT `truck_delivery_assign_ibfk_2` FOREIGN KEY (`Driver_ID`) REFERENCES `driver` (`ID`),
  ADD CONSTRAINT `truck_delivery_assign_ibfk_3` FOREIGN KEY (`Asssistant_ID`) REFERENCES `assistant` (`ID`),
  ADD CONSTRAINT `truck_delivery_assign_ibfk_4` FOREIGN KEY (`Route_ID`) REFERENCES `route` (`Route_ID`);

--
-- Constraints for table `truck_order_delivery`
--
ALTER TABLE `truck_order_delivery`
  ADD CONSTRAINT `truck_order_delivery_ibfk_1` FOREIGN KEY (`Delivery_ID`) REFERENCES `truck_delivery_assign` (`Delivery_ID`),
  ADD CONSTRAINT `truck_order_delivery_ibfk_2` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`Order_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
