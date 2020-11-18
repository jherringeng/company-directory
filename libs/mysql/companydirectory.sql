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
-- CREATE DATABASE IF NOT EXISTS `companydirectory` /*!40100 DEFAULT CHARACTER SET utf8 */;
-- USE `companydirectory`;

CREATE DATABASE IF NOT EXISTS `dbs1014755` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dbs1014755`;


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
	(4, 'Legal', 114, 1),
	(5, 'Services', 115, 1),
	(6, 'Research and Development', 116, 3),
	(7, 'Product Management', 117, 3),
	(8, 'Training', 118, 4),
	(9, 'Support', 119, 4),
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
  (0, 'Home Address', default, default, default),
  (1, 'London', '80 Park Lane', 'W1K 7TT', default),
	(2, 'New York', '30 Cooper Square', 'NY 10003', default),
	(3, 'Paris', '19 Champs-Elysees', '75008', 101),
	(4, 'Munich', '10 Maximilianstrasse', '80331', 102),
	(5, 'Rome', '13 Via del Corso', '00118', 103);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table companydirectory.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.location: ~4 rows (approximately)
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `status` (`id`, `name`) VALUES
  (1, 'Working'),
	(2, 'Sick Leave'),
	(3, 'Holiday'),
	(4, 'Paternity Leave'),
	(5, 'Absent');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table companydirectory.personnel
CREATE TABLE IF NOT EXISTS `personnel` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `jobTitle` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `departmentID` int(11) DEFAULT NULL,
  `currentLocationId` int(2) DEFAULT NULL,
  `jobTier` int(2) DEFAULT 4,
  `status` int(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.personnel: ~100 rows (approximately)
/*!40000 ALTER TABLE `personnel` DISABLE KEYS */;
INSERT INTO `personnel` (`id`, `firstName`, `lastName`, `jobTitle`, `email`, `departmentID`, `currentLocationId`, `jobTier`) VALUES
	(1, 'Rosana', 'Heffron', 'HR Administrator', 'rheffron0@ibm.com', 1, 1, default),
	(2, 'Kris', 'Kovnot', 'Sales Executive', 'kkovnot1@google.nl', 2, 2, default),
	(3, 'Vera', 'Kisbee', 'Sales Manager', 'vkisbee2@nih.gov', 2, 2, default),
	(4, 'Aveline', 'Edgson', 'Marketing Executive', 'aedgson3@wikispaces.com', 3, 2, default),
	(5, 'Bertie', 'Wittke', 'Legal Secretary', 'bwittke4@yahoo.com', 4, 1, default),
	(6, 'Demetre', 'Cossam', 'Customer Service Representative', 'dcossam5@washington.edu', 5, 1, default),
	(7, 'Annabela', 'McGavigan', 'Legal Counsel', 'amcgavigan6@wp.com', 4, 1, default),
	(8, 'Crichton', 'McAndrew', 'HR Advisor', 'cmcandrew7@zdnet.com', 1, 1, default),
	(9, 'Cordula', 'Plain', 'Customer Service Advisor', 'cplain8@google.ca', 5, 1, default),
	(10, 'Glen', 'McDougle', 'R&D Engineer', 'gmcdougle9@meetup.com', 6, 3, default),
	(11, 'Theo', 'Audas', 'Service Product Manager', 'taudasa@newsvine.com', 7, 3, default),
	(12, 'Spense', 'Jolliss', 'Training Administrator', 'sjollissb@wufoo.com', 8, 4, default),
	(13, 'Leopold', 'Carl', 'Sales Support', 'lcarlc@paginegialle.it', 9, 4, default),
	(14, 'Barr', 'MacAllan', 'Operational Support', 'bmacalland@github.com', 5, 1, default),
	(15, 'Suzie', 'Cromer', 'HR Administrator', 'scromere@imageshack.us', 1, 1, default),
	(16, 'Tracee', 'Gisbourn', 'CAD Engineer', 'tgisbournf@bloglines.com', 10, 5, default),
	(17, 'Taylor', 'St. Quintin', 'Systems Engineer', 'tstquinting@chronoengine.com', 10, 5, default),
	(18, 'Lin', 'Klassmann', 'Maintenance Engineer', 'lklassmannh@indiatimes.com', 10, 5, default),
	(19, 'Lay', 'Fintoph', 'General Ledger Accountant', 'lfintophi@goo.gl', 11, 5, default),
	(20, 'Moishe', 'Flinn', 'Telesales Representative', 'mflinnj@list-manage.com', 12, 3, default),
	(21, 'Gay', 'Bickford', 'Power Electronics Developer', 'gbickfordk@scientificamerican.com', 6, 3, default),
	(22, 'Erik', 'Lindback', 'Online Training Administer', 'elindbackl@virginia.edu', 8, 4, default),
	(23, 'Tamarra', 'Ace', 'Senior IT Technician', 'tacem@vinaora.com', 9, 4, default),
	(24, 'Barbara-anne', 'Rooksby', 'Logistics Management', 'brooksbyn@issuu.com', 12, 3, default),
	(25, 'Lucien', 'Allsup', 'Office Support', 'lallsupo@goo.ne.jp', 9, 4, default),
	(26, 'Jackelyn', 'Imlach', 'Accounts Assistant', 'jimlachp@google.it', 11, 5, default),
	(27, 'Virge', 'Bootes', 'Sales Associate', 'vbootesq@oracle.com', 2, 2, default),
	(28, 'Rafferty', 'Matasov', 'Litigation Solicitor', 'rmatasovr@4shared.com', 4, 1, default),
	(29, 'Vanya', 'Goulder', 'Customer Support', 'vgoulders@phoca.cz', 9, 4, default),
	(30, 'Bonita', 'McGonagle', 'HR Services', 'bmcgonaglet@microsoft.com', 1, 1, default),
	(31, 'Allx', 'Whaley', 'HR Manager', 'awhaleyu@bbb.org', 1, 1, default),
	(32, 'Mavis', 'Lernihan', 'Customer Service Representative', 'mlernihanv@netscape.com', 5, 1, default),
	(33, 'Vern', 'Durling', 'HR Respresentative', 'vdurlingw@goo.gl', 1, 1, default),
	(34, 'Myles', 'Minchi', 'Senior Product Manager', 'mminchix@smugmug.com', 7, 3, default),
	(35, 'Anitra', 'Coleridge', 'R&D Project Manager', 'acoleridgey@nbcnews.com', 6, 3, default),
	(36, 'Ailis', 'Brewster', 'Junior Product Manager', 'abrewsterz@businesswire.com', 7, 3, default),
	(37, 'Rahal', 'Tute', 'Research Engineer', 'rtute10@pinterest.com', 6, 3, default),
	(38, 'Warner', 'Blonden', 'Business Development Representative', 'wblonden11@spiegel.de', 12, 3, default),
	(39, 'Melvyn', 'Canner', 'Private Client Solicitor', 'mcanner12@eepurl.com', 4, 1, default),
	(40, 'Ryann', 'Giampietro', 'Senior Legal Counsel', 'rgiampietro13@theguardian.com', 4, 1, default),
	(41, 'Harwell', 'Jefferys', 'Systems Engineer', 'hjefferys14@jimdo.com', 10, 5, default),
	(42, 'Lanette', 'Buss', 'Commercial Litigation Solicitor', 'lbuss15@51.la', 4, 1, default),
	(43, 'Lissie', 'Reddington', '1st Line Support', 'lreddington16@w3.org', 9, 4, default),
	(44, 'Dore', 'Braidford', 'Senior Accountant', 'dbraidford17@google.com.br', 11, 5, default),
	(45, 'Lizabeth', 'Di Franceshci', 'Online Training Developer', 'ldifranceshci18@mediafire.com', 8, 4, default),
	(46, 'Felic', 'Sharland', 'New Business Development', 'fsharland19@myspace.com', 12, 3, default),
	(47, 'Duff', 'Quail', 'IT Support Analyst', 'dquail1a@vimeo.com', 9, 4, default),
	(48, 'Brendis', 'Shivell', 'Group HR Manager', 'bshivell1b@un.org', 1, 1, default),
	(49, 'Nevile', 'Schimaschke', 'Manufacturing Engineer', 'nschimaschke1c@hexun.com', 10, 5, default),
	(50, 'Jon', 'Calbaithe', 'Property Solicitor', 'jcalbaithe1d@netvibes.com', 4, 1, default),
	(51, 'Emmery', 'Darben', 'Senior Engineer', 'edarben1e@mapquest.com', 10, 5, default),
	(52, 'Staford', 'Whitesel', 'R&D Manager', 'swhitesel1f@nasa.gov', 6, 3, default),
	(53, 'Benjamin', 'Hawkslee', 'Software Product Manager', 'bhawkslee1g@hubpages.com', 7, 3, default),
	(54, 'Myrle', 'Speer', 'Marketing Assistant', 'mspeer1h@tripod.com', 3, 2, default),
	(55, 'Matthus', 'Banfield', 'Digital Marketing Manager', 'mbanfield1i@angelfire.com', 3, 2, default),
	(56, 'Annadiana', 'Drance', 'Marketing Intern', 'adrance1j@omniture.com', 3, 2, default),
	(57, 'Rinaldo', 'Fandrey', 'Sales Representative', 'rfandrey1k@bbc.co.uk', 2, 2, default),
	(58, 'Roanna', 'Standering', 'Marketing Content Officer', 'rstandering1l@cocolog-nifty.com', 3, 2, default),
	(59, 'Lorrie', 'Fattorini', 'Business Support', 'lfattorini1m@geocities.jp', 9, 4, default),
	(60, 'Talbot', 'Andrassy', 'Legal Executive', 'tandrassy1n@bigcartel.com', 4, 1, default),
	(61, 'Cindi', 'O\'Mannion', 'Commercial Accountant', 'comannion1o@ameblo.jp', 11, 5, default),
	(62, 'Pancho', 'Mullineux', 'HR Assistant', 'pmullineux1p@webmd.com', 1, 1, default),
	(63, 'Cynthy', 'Peyntue', 'R&D Tool Maker', 'cpeyntue1q@amazon.co.jp', 6, 3, default),
	(64, 'Kristine', 'Christal', 'Personal Development Trainer', 'kchristal1r@behance.net', 8, 4, default),
	(65, 'Dniren', 'Reboulet', 'Hardware Product Manager', 'dreboulet1s@360.cn', 7, 3, default),
	(66, 'Aggy', 'Napier', 'Meeting and Events Executive', 'anapier1t@sciencedirect.com', 3, 2, default),
	(67, 'Gayleen', 'Hessay', 'Debt Recovery Executive', 'ghessay1u@exblog.jp', 4, 1, default),
	(68, 'Cull', 'Snoden', 'HR Coordinator', 'csnoden1v@so-net.ne.jp', 1, 1, default),
	(69, 'Vlad', 'Crocombe', 'Parts Product Manager', 'vcrocombe1w@mtv.com', 7, 3, default),
	(70, 'Georgeanna', 'Joisce', 'Research Manager', 'gjoisce1x@google.com.au', 6, 3, default),
	(71, 'Ursola', 'Berthomieu', 'Employment Solicitor', 'uberthomieu1y@un.org', 4, 1, default),
	(72, 'Mair', 'McKirdy', 'HR Policy Advisor', 'mmckirdy1z@ovh.net', 1, 1, default),
	(73, 'Erma', 'Runnalls', 'Training Operations Specialist', 'erunnalls20@spiegel.de', 8, 4, default),
	(74, 'Heida', 'Gallone', 'Automation Engineer', 'hgallone21@hostgator.com', 10, 5, default),
	(75, 'Christina', 'Denge', 'Business Development Representative', 'cdenge22@canalblog.com', 12, 3, default),
	(76, 'Wilone', 'Fredi', 'Product Lead', 'wfredi23@gizmodo.com', 7, 3, default),
	(77, 'Stormie', 'Bolderstone', 'Ledger Clerk', 'sbolderstone24@globo.com', 11, 5, default),
	(78, 'Darryl', 'Pool', 'Bookkeeper', 'dpool25@vistaprint.com', 11, 5, default),
	(79, 'Nikolas', 'Mager', 'Online Service Representative', 'nmager26@nifty.com', 5, 1, default),
	(80, 'Brittney', 'Gaskal', 'SAS Engineer', 'bgaskal27@weather.com', 10, 5, default),
	(81, 'Field', 'Gresty', 'Commercial Solicitor', 'fgresty28@networkadvertising.org', 4, 1, default),
	(82, 'Martina', 'Tremoulet', 'Marketing Data Analyst', 'mtremoulet29@sciencedaily.com', 3, 2, default),
	(83, 'Robena', 'Ivanyutin', 'Sales Consultant', 'rivanyutin2a@mozilla.org', 2, 2, default),
	(84, 'Reagen', 'Corner', 'Finance Manager', 'rcorner2b@qq.com', 11, 5, default),
	(85, 'Eveleen', 'Sulter', 'R&D Business Analyst', 'esulter2c@nature.com', 6, 3, default),
	(86, 'Christy', 'Dunbobbin', 'E2 Training Planner', 'cdunbobbin2d@feedburner.com', 8, 4, default),
	(87, 'Winthrop', 'Lansley', 'Training and Development Manager', 'wlansley2e@alibaba.com', 8, 4, default),
	(88, 'Lissa', 'Insley', 'B2B Marketing Manager', 'linsley2f@friendfeed.com', 3, 2, default),
	(89, 'Shell', 'Risebarer', 'Hardware Engineer', 'srisebarer2g@patch.com', 10, 5, default),
	(90, 'Cherianne', 'Liddyard', 'B2B Sales Executive', 'cliddyard2h@com.com', 2, 2, default),
	(91, 'Brendan', 'Fooks', 'International Sales Manager', 'bfooks2i@utexas.edu', 2, 2, default),
	(92, 'Edmund', 'Tace', 'IT Support', 'etace2j@hatena.ne.jp', 9, 4, default),
	(93, 'Ki', 'Tomasini', 'Design and Style Engineer', 'ktomasini2k@cnbc.com', 10, 5, default),
	(94, 'Chadd', 'McGettrick', 'Software Engineer', 'cmcgettrick2l@simplemachines.org', 10, 5, default),
	(95, 'Dulcie', 'Baudi', 'Digital Content Creator', 'dbaudi2m@last.fm', 3, 2, default),
	(96, 'Barnebas', 'Mowbray', 'Payroll Coordinator', 'bmowbray2n@cbslocal.com', 1, 1, default),
	(97, 'Stefanie', 'Anker', 'Service Delivery Manager', 'sanker2o@hud.gov', 5, 1, default),
	(98, 'Cherye', 'de Cullip', 'Electronics Engineer', 'cdecullip2p@loc.gov', 10, 5, default),
	(99, 'Sinclare', 'Deverall', 'R&D Systems Engineer', 'sdeverall2q@ow.ly', 6, 3, default),
	(100, 'Shae', 'Johncey', 'Test Development Engineer', 'sjohncey2r@bluehost.com', 10, 5, default),
	(101, 'Michael', 'Myers', 'Head of Paris Branch', 'mmyers@scorchio.com', 13, 1, 2),
	(102, 'Jason', 'Bourne', 'Head of Munich Branch', 'jbourne@scorchio.com', 13, 1, 2),
	(103, 'Steve', 'Rogers', 'Head of Rome Branch', 'srogers@scorchio.com', 13, 1, 2),
	(110, 'Tony', 'Stark', 'CEO', 'tstark@scorchio.com', 13, 1, 1),
	(111, 'Jill', 'Valentine', 'Head of Human Resources', 'jvalentine@scorchio.com', 1, 1, 3),
	(112, 'Buzz', 'Lightyear', 'Head of Sales', 'blightyear@scorchio.com', 2, 2, 3),
	(113, 'Buckford', 'Barnes', 'Head of Marketing', 'bbarnes@scorchio.com', 3, 2, 3),
  (114, 'Gary', 'Neville', 'Head of Legal', 'gneville@scorchio.com', 4, 1, 3),
  (115, 'Buzz', 'Lightyear', 'Head of Services', 'blightyear@scorchio.com', 5, 1, 3),
  (116, 'James', 'Morrison', 'Head of Research & Development', 'jmorrison@scorchio.com', 6, 3, 3),
  (117, 'Gwen', 'Stacey', 'Head of Product Management', 'gstacey@scorchio.com', 7, 3, 3),
  (118, 'Simone', 'Biles', 'Head of Training', 'sbiles@scorchio.com', 8, 4, 3),
  (119, 'Megan', 'Rapinoe', 'Head of Support', 'mrapinoe@scorchio.com', 9, 4, 3);
/*!40000 ALTER TABLE `personnel` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
