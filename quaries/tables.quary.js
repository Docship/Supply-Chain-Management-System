
const tableSQL = "CREATE TABLE `administrator` (
    `Admin_ID` int(11) NOT NULL,
    `User_ID` int(11) DEFAULT NULL,
    `Password` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `assistant`
  --
  
  CREATE TABLE `assistant` (
    `ID` int(11) NOT NULL,
    `Name` text NOT NULL,
    `User_ID` int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `customer`
  --
  
  CREATE TABLE `customer` (
    `ID` int(11) NOT NULL,
    `First_Name` text NOT NULL,
    `Last_Name` text NOT NULL,
    `Role` text NOT NULL,
    `Address` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `driver`
  --
  
  CREATE TABLE `driver` (
    `ID` int(11) NOT NULL,
    `Name` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `order`
  --
  
  CREATE TABLE `order` (
    `Order_ID` int(11) NOT NULL,
    `Customer_ID` int(11) DEFAULT NULL,
    `Price` int(11) NOT NULL,
    `Date` date NOT NULL,
    `Route_ID` int(11) NOT NULL,
    `Is_Delivered` tinyint(1) NOT NULL,
    `Capacity` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `order_detail`
  --
  
  CREATE TABLE `order_detail` (
    `Product_ID` int(11) NOT NULL,
    `Order_ID` int(11) NOT NULL,
    `Quantity` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `product`
  --
  
  CREATE TABLE `product` (
    `Product_ID` int(11) NOT NULL,
    `Name` text NOT NULL,
    `Price` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `route`
  --
  
  CREATE TABLE `route` (
    `Route_ID` int(11) NOT NULL,
    `Start_City` text NOT NULL,
    `End_City` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `staff_member`
  --
  
  CREATE TABLE `staff_member` (
    `Staff_ID` int(11) NOT NULL,
    `User_ID` int(11) DEFAULT NULL,
    `Name` text NOT NULL,
    `Role` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `train`
  --
  
  CREATE TABLE `train` (
    `Train_ID` int(11) NOT NULL,
    `Start_City` text NOT NULL,
    `End_City` text NOT NULL,
    `Capacity` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `train_delivery_assign`
  --
  
  CREATE TABLE `train_delivery_assign` (
    `Assignment_ID` int(11) NOT NULL,
    `Train_ID` int(11) NOT NULL,
    `Date_Of_Depature` date NOT NULL,
    `Time_Of_Depature` time NOT NULL,
    `Transport_Hours` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `train_order_delivery`
  --
  
  CREATE TABLE `train_order_delivery` (
    `Assignment_ID` int(11) NOT NULL,
    `Order_ID` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `truck`
  --
  
  CREATE TABLE `truck` (
    `Truck_Number` varchar(10) NOT NULL,
    `Capacity` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `truck_delivery_assign`
  --
  
  CREATE TABLE `truck_delivery_assign` (
    `Delivery_ID` int(11) NOT NULL,
    `Truck_Number` varchar(10) NOT NULL,
    `Driver_ID` int(11) NOT NULL,
    `Asssistant_ID` int(11) NOT NULL,
    `Date_Of_Depature` date NOT NULL,
    `Time_Of_Depature` time NOT NULL,
    `Transport_Hours` int(11) NOT NULL,
    `Route_ID` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `truck_order_delivery`
  --
  
  CREATE TABLE `truck_order_delivery` (
    `Order_ID` int(11) NOT NULL,
    `Delivery_ID` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  -- --------------------------------------------------------
  
  --
  -- Table structure for table `user`
  --
  
  CREATE TABLE `user` (
    `User_ID` int(11) NOT NULL,
    `Username` text NOT NULL,
    `Password` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  --
  -- Indexes for dumped tables
  --
  
  --
  -- Indexes for table `administrator`
  --
  ALTER TABLE `administrator`
    ADD PRIMARY KEY (`Admin_ID`),
    ADD KEY `User_ID` (`User_ID`);
  
  --
  -- Indexes for table `assistant`
  --
  ALTER TABLE `assistant`
    ADD PRIMARY KEY (`ID`),
    ADD KEY `User_ID` (`User_ID`);
  
  --
  -- Indexes for table `customer`
  --
  ALTER TABLE `customer`
    ADD PRIMARY KEY (`ID`);
  
  --
  -- Indexes for table `driver`
  --
  ALTER TABLE `driver`
    ADD PRIMARY KEY (`ID`);
  
  --
  -- Indexes for table `order`
  --
  ALTER TABLE `order`
    ADD PRIMARY KEY (`Order_ID`),
    ADD KEY `Customer_ID` (`Customer_ID`),
    ADD KEY `Route_ID` (`Route_ID`);
  
  --
  -- Indexes for table `order_detail`
  --
  ALTER TABLE `order_detail`
    ADD PRIMARY KEY (`Product_ID`,`Order_ID`),
    ADD KEY `Order_ID` (`Order_ID`);
  
  --
  -- Indexes for table `product`
  --
  ALTER TABLE `product`
    ADD PRIMARY KEY (`Product_ID`);
  
  --
  -- Indexes for table `route`
  --
  ALTER TABLE `route`
    ADD PRIMARY KEY (`Route_ID`);
  
  --
  -- Indexes for table `staff_member`
  --
  ALTER TABLE `staff_member`
    ADD PRIMARY KEY (`Staff_ID`),
    ADD KEY `User_ID` (`User_ID`);
  
  --
  -- Indexes for table `train`
  --
  ALTER TABLE `train`
    ADD PRIMARY KEY (`Train_ID`);
  
  --
  -- Indexes for table `train_delivery_assign`
  --
  ALTER TABLE `train_delivery_assign`
    ADD PRIMARY KEY (`Assignment_ID`),
    ADD KEY `Train_ID` (`Train_ID`);
  
  --
  -- Indexes for table `train_order_delivery`
  --
  ALTER TABLE `train_order_delivery`
    ADD PRIMARY KEY (`Assignment_ID`),
    ADD KEY `Order_ID` (`Order_ID`);
  
  --
  -- Indexes for table `truck`
  --
  ALTER TABLE `truck`
    ADD PRIMARY KEY (`Truck_Number`);
  
  --
  -- Indexes for table `truck_delivery_assign`
  --
  ALTER TABLE `truck_delivery_assign`
    ADD PRIMARY KEY (`Delivery_ID`),
    ADD KEY `Truck_Number` (`Truck_Number`),
    ADD KEY `Driver_ID` (`Driver_ID`),
    ADD KEY `Asssistant_ID` (`Asssistant_ID`),
    ADD KEY `Route_ID` (`Route_ID`);
  
  --
  -- Indexes for table `truck_order_delivery`
  --
  ALTER TABLE `truck_order_delivery`
    ADD KEY `Delivery_ID` (`Delivery_ID`),
    ADD KEY `Order_ID` (`Order_ID`);
  
  --
  -- Indexes for table `user`
  --
  ALTER TABLE `user`
    ADD PRIMARY KEY (`User_ID`);
  
  --
  -- AUTO_INCREMENT for dumped tables
  --
  
  --
  -- AUTO_INCREMENT for table `administrator`
  --
  ALTER TABLE `administrator`
    MODIFY `Admin_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `customer`
  --
  ALTER TABLE `customer`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `driver`
  --
  ALTER TABLE `driver`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `order`
  --
  ALTER TABLE `order`
    MODIFY `Order_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `product`
  --
  ALTER TABLE `product`
    MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `route`
  --
  ALTER TABLE `route`
    MODIFY `Route_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `staff_member`
  --
  ALTER TABLE `staff_member`
    MODIFY `Staff_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `train`
  --
  ALTER TABLE `train`
    MODIFY `Train_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `train_delivery_assign`
  --
  ALTER TABLE `train_delivery_assign`
    MODIFY `Assignment_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `truck_delivery_assign`
  --
  ALTER TABLE `truck_delivery_assign`
    MODIFY `Delivery_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- AUTO_INCREMENT for table `user`
  --
  ALTER TABLE `user`
    MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT;
  
  --
  -- Constraints for dumped tables
  --
  
  --
  -- Constraints for table `administrator`
  --
  ALTER TABLE `administrator`
    ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE;
  
  --
  -- Constraints for table `assistant`
  --
  ALTER TABLE `assistant`
    ADD CONSTRAINT `assistant_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE;
  
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
  -- Constraints for table `staff_member`
  --
  ALTER TABLE `staff_member`
    ADD CONSTRAINT `staff_member_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE;
  
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
  COMMIT;"
  