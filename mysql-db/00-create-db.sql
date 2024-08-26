
CREATE DATABASE pd_solucoes;

USE pd_solucoes
CREATE TABLE squad (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    );

USE pd_solucoes
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    estimatedHours INT NOT NULL,
    squadId INT NOT NULL,
    foreign key (squadId) references squad(id)
    );

