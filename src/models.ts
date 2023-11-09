export interface Config {
	host: string;
	user: string;
	port: number;
	password: string;
	database: string;
	secretkey: string;
	urlBakend: string;
	urlFrontend: string;
	assetsPath: string;
	uploadsPath: string;
}
export interface Cliente {
	id: number | null;
	nombre: string;
	nit: string;
	codigo: string | null;
	nombre_path: string;
	url_imagen: string | null;
	max_usuarios: number;
	usuarios: Usuario[];
	cursos: Curso[];
}
export interface Usuario {
	id: number | null;
	id_cliente: number;
	nombre: string;
	email: string;
	empresa: string;
	ip: string | null;
}
export interface Curso {
	id: number | null;
	nombre: string;
	descripcion: string;
	url_imagen: string | null;
	nombre_docente: string;
	precio: string;
	contenido: Modulo[];
	nombre_certificado: string;
}
export interface Modulo {
	lecciones: Leccion[];
	nombre: string;
}
export interface Leccion {
	nombre: string;
	descripcion: string;
	url_video: string | null;
	posicion: number;
}
