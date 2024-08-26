
CREATE DATABASE pd_solucoes;

USE pd_solucoes
CREATE TABLE squad (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
    );

USE pd_solucoes
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    estimatedHours INT NOT NULL,
    squadId INT NOT NULL,
    foreign key (squadId) references squad(id)
    );

USE pd_solucoes
CREATE TABLE report (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    spentHours INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    employeeId INT NOT NULL,
    FOREIGN KEY (employeeId) REFERENCES employee(id) ON DELETE CASCADE
    );
