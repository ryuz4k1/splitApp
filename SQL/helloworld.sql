-- MySQL dump 10.13  Distrib 8.0.15, for osx10.13 (x86_64)
--
-- Host: localhost    Database: helloworld
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `receiver` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `message` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `register_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interests`
--

DROP TABLE IF EXISTS `interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `interests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `int_name` varchar(355) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_int` (`user_id`),
  CONSTRAINT `fk_int` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interests`
--

LOCK TABLES `interests` WRITE;
/*!40000 ALTER TABLE `interests` DISABLE KEYS */;
INSERT INTO `interests` VALUES (1,'Sport',87),(2,'Sport',88),(3,'Art',88),(4,'Sport',91),(5,'Art',91),(6,'Sport',92),(7,'Art',92),(8,'Music',92),(9,'Fashion',92),(10,'Art',93),(11,'Fashion',93),(12,'Sport',94),(13,'Music',94),(14,'Fashion',94),(15,'Sport',95),(16,'Art',95),(17,'Music',95),(18,'Art',34),(19,'Sport',34),(20,'Art',96),(21,'Music',96),(22,'Fashion',96),(23,'Art',98),(24,'Music',98),(25,'Technology',98),(26,'Economy',99),(27,'Research',99),(28,'Social Media',99),(29,'Art',99),(30,'Fashion',100),(31,'Design',100),(32,'Research',100),(33,'Economy',100),(34,'Art',100),(35,'Social Media',102),(36,'Design',102),(37,'Research',102),(38,'Technology',102),(39,'Art',106),(40,'Technology',106),(41,'Engineering',106);
/*!40000 ALTER TABLE `interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_int2` (`user_id`),
  CONSTRAINT `fk_int2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (4,'40.918400','29.220455',36),(5,'36.681503','29.261270',37),(14,'41.0791121','29.023208399999998',34),(15,'40.9977883','29.0359496',35),(16,'40.990790499999996','29.0234413',94),(17,'41.000169199999995','29.0470347',95),(18,'41.000203499999995','29.0270655',93),(19,'40.9893071','29.028692699999997',96),(21,'40.9997531','29.0388593',99),(22,'40.9998189','29.0462036',100),(23,'40.9223348','29.158218500000004',102),(24,'41.079099','29.0214428',106);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `author` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `body` text COLLATE utf8mb4_general_ci,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_int3` (`user_id`),
  CONSTRAINT `fk_int3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,'jackpost','jack','jackjackjackjackjack1231231','2019-04-17 18:16:02',35),(5,'sawyerposts','sawyer','sawyerpostsss1112312','2019-04-17 18:23:56',34),(7,'johnpostss','Lockee','123123123','2019-04-20 09:23:50',36),(9,'ulasPost','ulas','postpostpsoasdqwdq','2019-04-22 18:21:21',62),(11,'mockUpTestTitle','mockupTest','Body mockupTest :)))','2019-05-15 13:14:43',98),(12,'etilerTitle','etiler','etilerpostsss','2019-05-17 09:02:02',100);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `register_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `website` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `about` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `job` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gender` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (34,'James Ford','sawyer@yahoo.com','SAWYER','$5$rounds=535000$YDuIbddga2hxjQ2L$AZXroBek2WyZ51JhCS3iRCtna40Lr/AdsIz.dNoZ5V3','2019-04-08 12:42:39','sawyer.com','About Sawyer','Actor','3981261982','male'),(35,'JackShephard','jack@yahoo.com','jack','$5$rounds=535000$3wR0xVhFjjjCq4U0$aQ2o9k1TCVOCfo5YKZp/WAPdBdDqbfiUCXUsOugLLc9','2019-04-08 15:33:17','jack.com','About Jack','Actor','12312612412','male'),(36,'John Locke','locke@gmail.com','Lockee','$5$rounds=535000$2GPVXk8alRGnSGbM$WEblCPueH7EUnzAPBe.Fui5UFMlVTQU3Pw6LLnEIuU/','2019-04-09 11:04:19','www.locke.com','A leader can\'t lead \'til he knows where he\'s going.','Actor','0982717216','male'),(37,'qwe','qwe','test','$5$rounds=535000$bvKZP3RVDkjcyyWh$XJbql8NlH6umAwHhQj5sSmcc2XtyhbxJhJDoD.uMMW5','2019-04-09 11:41:17','qwe','qweq','qwe','qweq','male'),(62,'Ulaş Kaya','ulas@yahoo.com','ulas','$5$rounds=535000$ib8.lHHTJrSkR4qt$JIA9d6FStdS9HH0Hz.5xqmA3IRgKAtCpZOapqoAuSW5','2019-04-22 18:17:36','www.ulas.com','About Ulas','Student','012312561231','male'),(87,'testName','testMail','test001','$5$rounds=535000$81g4RK5sHPu5c5cm$gzAPzMJelLE3Kctrg/ll6SlBY2FTqySufy/yFCk8hH3','2019-05-01 23:46:24','testWebsite','testAbout','testJob','testPhone','male'),(88,NULL,'starbucks@gmail.com','starbucks','$5$rounds=535000$QleJl.YUhXFcxQUq$agfktjNJVK3FYZ6oj3nPBrUEB0bHoZ/J33x.Mu6xnBB','2019-05-03 15:07:52',NULL,NULL,NULL,NULL,NULL),(89,'Name','Email','girl_test','123456','2019-05-03 15:07:52','Website','About','Job','Phone','Gender'),(90,'Name','testDefault@gmail.com','testDefault','$5$rounds=535000$PG92IgJIkvZt4E2E$qhtf7uWLDxeiYyehxlNTu9gvvoQ0XoxdUUcvHx7gcZD','2019-05-04 13:21:43','Website','About','Job','Phone','Gender'),(91,'Name','testDef2@gmail.com','testDef2','$5$rounds=535000$z0gxXd.aeBSv9ZJu$Ikn9cyl8qt71hfjzJ1OoHw3tK8DXINwqDdtk7vHKZ2.','2019-05-04 13:25:30','Website','About','Job','Phone','Gender'),(92,'Name','testtt@gmail.com','testtt','$5$rounds=535000$yk8r/fFU8i3XJ43U$zzwmZ2YUEeXaxXWtql6eoGmJLUwPf/3t9XtqrXgc0C1','2019-05-04 22:13:48','Website','About','Job','Phone','Gender'),(93,'Name','testt2@gmail.com','testt2','$5$rounds=535000$rKNEbtWVwkhuXigf$zGcDdsNR3cIaj/xHojK1.WmMEeddJBPiR99.BhnbFr9','2019-05-04 22:14:49','Website','About','Job','Phone','Gender'),(94,'Name','newUser@gmail.com','newUser','$5$rounds=535000$y1y8aj2l8QASZXhF$wsfKKn9ajOkLBDCfmbh2Ri17IrL61wzTeipdWKAtQ.D','2019-05-06 13:12:31','Website','About','Job','Phone','Gender'),(95,'Name','berke@gmail.com','berke','$5$rounds=535000$/iShiJMykP3sZF2a$S6JorKfzDNZbq3YiHr91Q7Im7XvI61DItFRd0vI2SmA','2019-05-06 15:07:54','Website','About','Job','Phone','Gender'),(96,'Name','modaStarbucks@gmail.com','modaStarbucks','$5$rounds=535000$KM5HdGRzU5iPjtNL$zpyXWP/T4TriOsy/BkFRoP4M87GvxlFL226le1eW7K/','2019-05-14 16:34:42','Website','About','Job','Phone','Gender'),(98,'MockupTest','mockup@gmail.com','mockupTest','$5$rounds=535000$bOurZS98Uj.W5CGt$MEhxkSu8/rapbDL0yODqV.5zO9/w/sK2cH3ZlGmXnL4','2019-05-14 17:17:32','www.mockup.com','About Mockup','MockupTestJob','0123512321','male'),(99,'Name','acibademStarbucks@gmail.com','acibademStarbucks','$5$rounds=535000$5gegt/Ci8gNSsL6/$JbOTUWjNXiy8jYhDZXSk1CO98Bpw.dByX0FgdyLMeu2','2019-05-15 12:10:53','Website','About','Job','Phone','Gender'),(100,'Name','etiler@gmail.com','etiler','$5$rounds=535000$CKwYNtxW2YOzTsZV$biQa97zvha.CdGLSOivl3RdJRHkFfMgNxNIx3oWcylC','2019-05-17 08:15:12','Website','About','Job','Phone','Gender'),(101,'Name','qweqwe','qweqw','$5$rounds=535000$XzNgP8ORj1aWNA68$vyNamHA8xtszSJZLCFsGkX50y6kCGSaBmNZ.h/DexA9','2019-05-17 13:18:59','Website','About','Job','Phone','Gender'),(102,'Name','maltepeStarbucks@gmail.com','maltepeStarbucks','$5$rounds=535000$QeXYB/SwfNaHs4E7$bLmrP8CWaSIRgiJy942iT4liR0Qqy0K90wlnkHJVcYB','2019-05-17 15:27:08','Website','About','Job','Phone','Gender'),(103,'Name','Email','Gg','123456','2019-05-03 15:07:52','Website','About','Job','Phone','Gender'),(104,'Name','Email','Sawyer2','123456','2019-05-03 15:07:52','Website','About','Job','Phone','Gender'),(105,'Name','Email','HilalHanim','123456','2019-05-03 15:07:52','Website','About','Job','Phone','Gender'),(106,'Name','merve@gmail.com','merve','$5$rounds=535000$9vL1NbkDaIM.S2Ce$grP4Rwop4WXdUVXLM86dh7UcmRe8v219TC3zrWEb3WA','2019-05-30 11:00:24','Website','About','Job','Phone','Gender'),(107,'Name','Email','Mervee','123456','2019-05-03 15:07:52','Website','About','Job','Phone','Gender'),(108,'Name','Email','test_face','123456','2019-05-03 15:07:52','Website','About','Job','Phone','Gender');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-31 14:18:23
