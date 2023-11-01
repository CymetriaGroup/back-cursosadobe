CREATE TABLE Curso (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	url_imagen VARCHAR(255) NOT NULL,
	lecciones JSON NOT NULL,
	docente VARCHAR(255) NOT NULL,
	color VARCHAR(255),
	certificado JSON NOT NULL, -- nobre de certificado, url de certificado
	PRIMARY KEY (id)
);

CREATE TABLE Cliente (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	nit VARCHAR(255) NOT NULL,
	codigo VARCHAR(255) NOT NULL UNIQUE,
	nombre_path VARCHAR(255) NOT NULL,
	url_imagen VARCHAR(255) NOT NULL,
	max_usuarios INT NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Cliente_Curso (
	id INT NOT NULL AUTO_INCREMENT,
	id_cliente INT NOT NULL,
	id_curso INT NOT NULL,
	precio INT NOT NULL,
	certificado JSON NOT NULL, -- nobre de certificado, url de certificado
	PRIMARY KEY (id)
);


CREATE TABLE Cliente_Usuario (
	id INT NOT NULL AUTO_INCREMENT,
	id_cliente INT NOT NULL,
	id_usuario INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Usuario (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	url_imagen VARCHAR(255),
	telefono VARCHAR(255),
	empresa VARCHAR(255),
	cargo VARCHAR(255) NOT NULL,
	verificado TINYINT(1) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Usuario_Progreso (
	id INT NOT NULL AUTO_INCREMENT,
	id_curso INT NOT NULL,
	id_usuario INT NOT NULL,
	progreso JSON NOT NULL,
	PRIMARY KEY (id)
);