CREATE DATABASE year_in_pixels_db;

USE year_in_pixels_db;

CREATE TABLE users(
    id INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    pass VARCHAR(50) NOT NULL,
    emociones TEXT
);
