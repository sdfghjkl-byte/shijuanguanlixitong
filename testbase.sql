/*
Navicat MySQL Data Transfer

Source Server         : cjlm
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : testbase

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001
编码

Date: 2022-03-02 21:25:43
表: 
学科bank  
创建的试卷paper  
paper_question  
创建题目question  
创建的用户user 
*/

SET FOREIGN_KEY_CHECKS=0;
-- 设置外键格子

-- ----------------------------
-- Table structure for bank
-- ----------------------------
DROP TABLE IF EXISTS `bank`;
CREATE TABLE `bank` (
  `Bank_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bank
-- ----------------------------
INSERT INTO `bank` VALUES ('语文');
INSERT INTO `bank` VALUES ('数学');
INSERT INTO `bank` VALUES ('历史');

-- ----------------------------
-- Table structure for paper
-- ----------------------------
DROP TABLE IF EXISTS `paper`;
CREATE TABLE `paper` (
  `Paper_level` varchar(255) DEFAULT NULL,
  `Paper_name` varchar(255) DEFAULT NULL,
  `Course` varchar(255) DEFAULT NULL,
  `User_id` int(11) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Paper_id` int(1) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Paper_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of paper
-- ----------------------------
INSERT INTO `paper` VALUES ('简单', '第三次考试', '前端', '123', '2022-02-12 00:00:00', '14');
INSERT INTO `paper` VALUES ('简单', '123', '前端', '124', '2022-02-12 00:00:00', '9');
INSERT INTO `paper` VALUES ('简单', '第一次测试题目', '前端', '123', '2022-02-12 00:00:00', '13');
INSERT INTO `paper` VALUES ('简单', '第二次测试', '前端', '123', '2022-02-12 00:00:00', '12');
INSERT INTO `paper` VALUES ('简单', 'rrrrr', '前端', '123', '2022-02-12 00:00:00', '15');

-- ----------------------------
-- Table structure for paper_question
-- ----------------------------
DROP TABLE IF EXISTS `paper_question`;
CREATE TABLE `paper_question` (
  `Paper_id` int(11) NOT NULL AUTO_INCREMENT,
  `Question_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Paper_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of paper_question
-- ----------------------------
INSERT INTO `paper_question` VALUES ('7', '7');
INSERT INTO `paper_question` VALUES ('11', '9');
INSERT INTO `paper_question` VALUES ('12', '9');
INSERT INTO `paper_question` VALUES ('13', '11');
INSERT INTO `paper_question` VALUES ('14', '12');
INSERT INTO `paper_question` VALUES ('15', '12');

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `Type` varchar(255) DEFAULT NULL,
  `Describtion` varchar(255) DEFAULT '',
  `Anser` varchar(255) DEFAULT NULL,
  `Bank_name` varchar(255) DEFAULT NULL,
  `Question_level` varchar(255) DEFAULT NULL,
  `User_id` int(11) DEFAULT NULL,
  `Picture` mediumblob,
  `Question_id` int(1) unsigned zerofill NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Question_id`)
  -- 关键字
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
-- 数据库引擎MyISAM 自动增量15 默认字符集utf8

-- ----------------------------
-- Records of question 记录
-- ----------------------------
INSERT INTO `question` VALUES ('选择题', '我', ' 我', '前端', '简单', '123', null, '14');
INSERT INTO `question` VALUES ('简答题', '二', '二', '前端', '简单', '123', null, '13');
INSERT INTO `question` VALUES ('填空题', '文化课', ' 地方', '前端', '简单', '123', null, '12');
INSERT INTO `question` VALUES ('填空题', '44444444444444444', '444444444444', 'UI', '简单', '123', null, '11');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `User_name` varchar(255) DEFAULT NULL,
  `User_id` int(11) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Power` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('www', '123', 'www', '3206774306@qq.com', '管理员');
INSERT INTO `user` VALUES ('11', '124', '11', '3206774306@qq.com', '查改');
