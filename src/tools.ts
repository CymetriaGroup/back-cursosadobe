import fs from "fs";
import Youtube from "youtube-sr";
export const logger = (error: any) => {
	if (!fs.existsSync("logs.txt")) {
		fs.writeFile("logs.txt", "", (err) => {
			if (err) throw err;
		});
	}

	const date = new Date();
	const dateNow = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
	const timeNow = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	const dateTime = `${dateNow} ${timeNow}`;

	const log = `[${dateTime}] ${error}\n`;

	fs.appendFile("logs.txt", log, (err) => {
		if (err) throw err;
	});
};
export const generateRandomCode = () => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let code = "";

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		code += characters.charAt(randomIndex);
	}
	return code;
};
export const formatearFechaEnEspanol = (fechaMySQL) => {
	// Convierte la fecha de MySQL a un objeto Date
	const fecha = new Date(fechaMySQL);

	// Nombres de los meses en español
	const meses = [
		"ENERO",
		"FEBRERO",
		"MARZO",
		"ABRIL",
		"MAYO",
		"JUNIO",
		"JULIO",
		"AGOSTO",
		"SEPTIEMBRE",
		"OCTUBRE",
		"NOVIEMBRE",
		"DICIEMBRE",
	];

	// Obtiene el día, mes y año de la fecha
	const dia = fecha.getDate();
	const mes = meses[fecha.getMonth()];
	const año = fecha.getFullYear();

	// Formatea la fecha en español
	const fechaFormateada = `${dia} de ${mes} del ${año}`;

	return fechaFormateada;
};
export const getDuracionVideo = async (url: string) => {
	const video = await Youtube.getVideo(
		"https://youtu.be/" + extractYouTubeId(url),
	);
	return video.durationFormatted;
};
function extractYouTubeId(url) {
	const regex =
		/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
	const match = url.match(regex);
	// https://youtu.be/
	return match && match[1] ? match[1] : null;
}
