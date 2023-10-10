import { Config } from "./models";
import dotenv from "dotenv";

dotenv.config();

const configProduction: Config = {
	host: "localhost",
	user: "cursosadobe_cursosadobe",
	port: 3306,
	password: "4LrK#7KQk?Re",
	database: "cursosadobe_CursosAdobe",
};

const configPrueba: Config = {
	host: "localhost",
	user: "cursosadobe_cursosadobe",
	password: "4LrK#7KQk?Re",
	database: "cursosadobe_prueba",
	port: 3306,
};

const configLocal: Config = {
	host: "localhost",
	user: "root",
	password: "skate12345",
	database: "cursosadobe",
	port: 3306,
};
export let config: Config;

if (process.env.NODE_ENV === "development") {
	config = configLocal;
} else if (process.env.NODE_ENV === "prueba") {
	config = configPrueba;
} else if (process.env.NODE_ENV === "production") {
	config = configProduction;
} else {
	config = configLocal;
}
