-- User Table to Maintain User Information

CREATE TABLE tbl_users (
id bigint NOT NULL primary key,
  firstName varchar(150) DEFAULT NULL,
  lastName varchar(100) DEFAULT NULL,
  displayName varchar(255) DEFAULT NULL,
  email varchar(255) NOT NULL,
  username varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  salt varchar(255) NOT NULL,
  updated timestamp DEFAULT NULL,
  created timestamp NOT NULL,
  resetPasswordToken varchar(255) DEFAULT NULL,
  resetPasswordExpires timestamp DEFAULT NULL,
  token char(36) DEFAULT NULL
)