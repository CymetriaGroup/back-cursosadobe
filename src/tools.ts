import fs from "fs";

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
    
}
export const generateRandomCode = ()=> {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}
