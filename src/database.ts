import { createPool } from "mysql2/promise";
import config from "./config";

const db = createPool({
	host: config.host,
	user: config.user,
	port: config.port,
	password: config.password,
	database: config.database,
});
export default db;
