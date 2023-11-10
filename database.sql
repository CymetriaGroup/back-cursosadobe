CREATE TABLE IF NOT EXISTS curso (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	url_imagen VARCHAR(255) NOT NULL,
	modulos JSON,
	docente VARCHAR(255) NOT NULL,
	color VARCHAR(255),
	certificado JSON NOT NULL,
	-- nombre de certificado, url de certificado
	posicionLanding INT,
	PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS cliente (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL UNIQUE,
	nit VARCHAR(255) NOT NULL UNIQUE,
	codigo VARCHAR(255) NOT NULL UNIQUE,
	nombre_path VARCHAR(255) NOT NULL UNIQUE,
	url_imagen VARCHAR(255) NOT NULL,
	max_usuarios INT NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS cliente_curso (
	id INT NOT NULL AUTO_INCREMENT,
	id_cliente INT NOT NULL,
	id_curso INT NOT NULL,
	precio INT NOT NULL,
	certificado JSON NOT NULL,
	-- nobre de certificado, url de certificado
	PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS cliente_usuario (
	id INT NOT NULL AUTO_INCREMENT,
	id_cliente INT NOT NULL,
	nombre_path VARCHAR(255) NOT NULL,
	id_usuario INT NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS usuario (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	url_imagen VARCHAR(255),
	telefono VARCHAR(255),
	empresa VARCHAR(255),
	cargo VARCHAR(255) NOT NULL,
	verificado TINYINT(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS usuario_progreso (
	id INT NOT NULL AUTO_INCREMENT,
	id_curso INT NOT NULL,
	id_usuario INT NOT NULL,
	progreso JSON NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS super_usuario (
	id INT NOT NULL AUTO_INCREMENT,
	usuario VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	permisos JSON,
	PRIMARY KEY (id)
);