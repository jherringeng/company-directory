-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for companydirectory
CREATE DATABASE IF NOT EXISTS `companydirectory` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `companydirectory`;

-- Dumping structure for table companydirectory.department
CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `departmentManager` int(4) DEFAULT NULL,
  `locationID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.department: ~12 rows (approximately)
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`id`, `name`, `departmentManager`, `locationID`) VALUES
	(1, 'Human Resources', 111, 1),
	(2, 'Sales', 112, 2),
	(3, 'Marketing', 113, 2),
	(4, 'Legal', default, 1),
	(5, 'Services', default, 1),
	(6, 'Research and Development', default, 3),
	(7, 'Product Management', default, 3),
	(8, 'Training', default, 4),
	(9, 'Support', default, 4),
	(10, 'Engineering', default, 5),
	(11, 'Accounting', default, 5),
	(12, 'Business Development', default, 3),
	(13, 'Upper Management', 110, 1);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;

-- Dumping structure for table companydirectory.location
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `postcode` varchar(12) DEFAULT NULL,
  `manager` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.location: ~4 rows (approximately)
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`id`, `name`, `address`, `postcode`, `manager`) VALUES
	(1, 'London', '80 Park Lane', 'W1K 7TT', default),
	(2, 'New York', '30 Cooper Square', 'NY 10003', default),
	(3, 'Paris', '19 Champs-Elysees', '75008', 101),
	(4, 'Munich', '10 Maximilianstrasse', '80331', 102),
	(5, 'Rome', '13 Via del Corso', '00118', 103);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table companydirectory.personnel
CREATE TABLE IF NOT EXISTS `personnel` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `jobTitle` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `departmentID` int(11) DEFAULT NULL,
  `jobTier` int(2) DEFAULT 4
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.personnel: ~100 rows (approximately)
/*!40000 ALTER TABLE `personnel` DISABLE KEYS */;
INSERT INTO `personnel` (`id`, `firstName`, `lastName`, `jobTitle`, `email`, `departmentID`, `jobTier`) VALUES
	(1, 'Rosana', 'Heffron', '', 'rheffron0@ibm.com', 1, default),
	(2, 'Kris', 'Kovnot', '', 'kkovnot1@google.nl', 2, default),
	(3, 'Vera', 'Kisbee', '', 'vkisbee2@nih.gov', 2, default),
	(4, 'Aveline', 'Edgson', '', 'aedgson3@wikispaces.com', 3, default),
	(5, 'Bertie', 'Wittke', '', 'bwittke4@yahoo.com', 4, default),
	(6, 'Demetre', 'Cossam', '', 'dcossam5@washington.edu', 5, default),
	(7, 'Annabela', 'McGavigan', '', 'amcgavigan6@wp.com', 4, default),
	(8, 'Crichton', 'McAndrew', '', 'cmcandrew7@zdnet.com', 1, default),
	(9, 'Cordula', 'Plain', '', 'cplain8@google.ca', 5, default),
	(10, 'Glen', 'McDougle', '', 'gmcdougle9@meetup.com', 6, default),
	(11, 'Theo', 'Audas', '', 'taudasa@newsvine.com', 7, default),
	(12, 'Spense', 'Jolliss', '', 'sjollissb@wufoo.com', 8, default),
	(13, 'Leopold', 'Carl', '', 'lcarlc@paginegialle.it', 9, default),
	(14, 'Barr', 'MacAllan', '', 'bmacalland@github.com', 5, default),
	(15, 'Suzie', 'Cromer', '', 'scromere@imageshack.us', 1, default),
	(16, 'Tracee', 'Gisbourn', '', 'tgisbournf@bloglines.com', 10, default),
	(17, 'Taylor', 'St. Quintin', '', 'tstquinting@chronoengine.com', 10, default),
	(18, 'Lin', 'Klassmann', '', 'lklassmannh@indiatimes.com', 10, default),
	(19, 'Lay', 'Fintoph', '', 'lfintophi@goo.gl', 11, default),
	(20, 'Moishe', 'Flinn', '', 'mflinnj@list-manage.com', 12, default),
	(21, 'Gay', 'Bickford', '', 'gbickfordk@scientificamerican.com', 6, default),
	(22, 'Erik', 'Lindback', '', 'elindbackl@virginia.edu', 8, default),
	(23, 'Tamarra', 'Ace', '', 'tacem@vinaora.com', 9, default),
	(24, 'Barbara-anne', 'Rooksby', '', 'brooksbyn@issuu.com', 12, default),
	(25, 'Lucien', 'Allsup', '', 'lallsupo@goo.ne.jp', 9, default),
	(26, 'Jackelyn', 'Imlach', '', 'jimlachp@google.it', 11, default),
	(27, 'Virge', 'Bootes', '', 'vbootesq@oracle.com', 2, default),
	(28, 'Rafferty', 'Matasov', '', 'rmatasovr@4shared.com', 4, default),
	(29, 'Vanya', 'Goulder', '', 'vgoulders@phoca.cz', 9, default),
	(30, 'Bonita', 'McGonagle', '', 'bmcgonaglet@microsoft.com', 1, default),
	(31, 'Allx', 'Whaley', '', 'awhaleyu@bbb.org', 1, default),
	(32, 'Mavis', 'Lernihan', '', 'mlernihanv@netscape.com', 5, default),
	(33, 'Vern', 'Durling', '', 'vdurlingw@goo.gl', 1, default),
	(34, 'Myles', 'Minchi', '', 'mminchix@smugmug.com', 7, default),
	(35, 'Anitra', 'Coleridge', '', 'acoleridgey@nbcnews.com', 6, default),
	(36, 'Ailis', 'Brewster', '', 'abrewsterz@businesswire.com', 7, default),
	(37, 'Rahal', 'Tute', '', 'rtute10@pinterest.com', 6, default),
	(38, 'Warner', 'Blonden', '', 'wblonden11@spiegel.de', 12, default),
	(39, 'Melvyn', 'Canner', '', 'mcanner12@eepurl.com', 4, default),
	(40, 'Ryann', 'Giampietro', '', 'rgiampietro13@theguardian.com', 4, default),
	(41, 'Harwell', 'Jefferys', '', 'hjefferys14@jimdo.com', 10, default),
	(42, 'Lanette', 'Buss', '', 'lbuss15@51.la', 4, default),
	(43, 'Lissie', 'Reddington', '', 'lreddington16@w3.org', 9, default),
	(44, 'Dore', 'Braidford', '', 'dbraidford17@google.com.br', 11, default),
	(45, 'Lizabeth', 'Di Franceshci', '', 'ldifranceshci18@mediafire.com', 8, default),
	(46, 'Felic', 'Sharland', '', 'fsharland19@myspace.com', 12, default),
	(47, 'Duff', 'Quail', '', 'dquail1a@vimeo.com', 9, default),
	(48, 'Brendis', 'Shivell', '', 'bshivell1b@un.org', 1, default),
	(49, 'Nevile', 'Schimaschke', '', 'nschimaschke1c@hexun.com', 10, default),
	(50, 'Jon', 'Calbaithe', '', 'jcalbaithe1d@netvibes.com', 4, default),
	(51, 'Emmery', 'Darben', '', 'edarben1e@mapquest.com', 10, default),
	(52, 'Staford', 'Whitesel', '', 'swhitesel1f@nasa.gov', 6, default),
	(53, 'Benjamin', 'Hawkslee', '', 'bhawkslee1g@hubpages.com', 7, default),
	(54, 'Myrle', 'Speer', '', 'mspeer1h@tripod.com', 3, default),
	(55, 'Matthus', 'Banfield', '', 'mbanfield1i@angelfire.com', 3, default),
	(56, 'Annadiana', 'Drance', '', 'adrance1j@omniture.com', 3, default),
	(57, 'Rinaldo', 'Fandrey', '', 'rfandrey1k@bbc.co.uk', 2, default),
	(58, 'Roanna', 'Standering', '', 'rstandering1l@cocolog-nifty.com', 3, default),
	(59, 'Lorrie', 'Fattorini', '', 'lfattorini1m@geocities.jp', 9, default),
	(60, 'Talbot', 'Andrassy', '', 'tandrassy1n@bigcartel.com', 4, default),
	(61, 'Cindi', 'O\'Mannion', '', 'comannion1o@ameblo.jp', 11, default),
	(62, 'Pancho', 'Mullineux', '', 'pmullineux1p@webmd.com', 1, default),
	(63, 'Cynthy', 'Peyntue', '', 'cpeyntue1q@amazon.co.jp', 6, default),
	(64, 'Kristine', 'Christal', '', 'kchristal1r@behance.net', 8, default),
	(65, 'Dniren', 'Reboulet', '', 'dreboulet1s@360.cn', 7, default),
	(66, 'Aggy', 'Napier', '', 'anapier1t@sciencedirect.com', 3, default),
	(67, 'Gayleen', 'Hessay', '', 'ghessay1u@exblog.jp', 4, default),
	(68, 'Cull', 'Snoden', '', 'csnoden1v@so-net.ne.jp', 1, default),
	(69, 'Vlad', 'Crocombe', '', 'vcrocombe1w@mtv.com', 7, default),
	(70, 'Georgeanna', 'Joisce', '', 'gjoisce1x@google.com.au', 6, default),
	(71, 'Ursola', 'Berthomieu', '', 'uberthomieu1y@un.org', 4, default),
	(72, 'Mair', 'McKirdy', '', 'mmckirdy1z@ovh.net', 1, default),
	(73, 'Erma', 'Runnalls', '', 'erunnalls20@spiegel.de', 8, default),
	(74, 'Heida', 'Gallone', '', 'hgallone21@hostgator.com', 10, default),
	(75, 'Christina', 'Denge', '', 'cdenge22@canalblog.com', 12, default),
	(76, 'Wilone', 'Fredi', '', 'wfredi23@gizmodo.com', 7, default),
	(77, 'Stormie', 'Bolderstone', '', 'sbolderstone24@globo.com', 11, default),
	(78, 'Darryl', 'Pool', '', 'dpool25@vistaprint.com', 11, default),
	(79, 'Nikolas', 'Mager', '', 'nmager26@nifty.com', 5, default),
	(80, 'Brittney', 'Gaskal', '', 'bgaskal27@weather.com', 10, default),
	(81, 'Field', 'Gresty', '', 'fgresty28@networkadvertising.org', 4, default),
	(82, 'Martina', 'Tremoulet', '', 'mtremoulet29@sciencedaily.com', 3, default),
	(83, 'Robena', 'Ivanyutin', '', 'rivanyutin2a@mozilla.org', 2, default),
	(84, 'Reagen', 'Corner', '', 'rcorner2b@qq.com', 11, default),
	(85, 'Eveleen', 'Sulter', '', 'esulter2c@nature.com', 6, default),
	(86, 'Christy', 'Dunbobbin', '', 'cdunbobbin2d@feedburner.com', 8, default),
	(87, 'Winthrop', 'Lansley', '', 'wlansley2e@alibaba.com', 8, default),
	(88, 'Lissa', 'Insley', '', 'linsley2f@friendfeed.com', 3, default),
	(89, 'Shell', 'Risebarer', '', 'srisebarer2g@patch.com', 10, default),
	(90, 'Cherianne', 'Liddyard', '', 'cliddyard2h@com.com', 2, default),
	(91, 'Brendan', 'Fooks', '', 'bfooks2i@utexas.edu', 2, default),
	(92, 'Edmund', 'Tace', '', 'etace2j@hatena.ne.jp', 9, default),
	(93, 'Ki', 'Tomasini', '', 'ktomasini2k@cnbc.com', 10, default),
	(94, 'Chadd', 'McGettrick', '', 'cmcgettrick2l@simplemachines.org', 10, default),
	(95, 'Dulcie', 'Baudi', '', 'dbaudi2m@last.fm', 3, default),
	(96, 'Barnebas', 'Mowbray', '', 'bmowbray2n@cbslocal.com', 1, default),
	(97, 'Stefanie', 'Anker', '', 'sanker2o@hud.gov', 5, default),
	(98, 'Cherye', 'de Cullip', '', 'cdecullip2p@loc.gov', 10, default),
	(99, 'Sinclare', 'Deverall', '', 'sdeverall2q@ow.ly', 6, default),
	(100, 'Shae', 'Johncey', '', 'sjohncey2r@bluehost.com', 10, default),
	(101, 'Jill', 'Valentine', '', 'jvalentine@scorchio.com', 13, 2),
	(102, 'Buzz', 'Lightyear', '', 'blightyear@scorchio.com', 13, 2),
	(103, 'Steve', 'Rogers', '', 'srogers@scorchio.com', 13, 2),
	(110, 'Tony', 'Stark', 'CEO', 'tstark@scorchio.com', 13, 1),
	(111, 'Jill', 'Valentine', '', 'jvalentine@scorchio.com', 1, 3),
	(112, 'Buzz', 'Lightyear', '', 'blightyear@scorchio.com', 2, 3),
	(113, 'Steve', 'Rogers', '', 'srogers@scorchio.com', 3, 3);
/*!40000 ALTER TABLE `personnel` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
