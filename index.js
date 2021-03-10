const download = require("image-downloader");
const actas = require("./actas.datos");
const fs = require("fs");
var imagenes = actas.array_actas;
// const url = "https://trep.oep.org.bo";
const url = "https://s3.amazonaws.com/sn-archivo-computo/actas";
const path = "E:\\actas-elecciones";
let pathFile = "";

const tipo = 2; // 6 = alcalde ,   2 = Gobernador
async function downloadIMG() {
  var logger = fs.createWriteStream("log.txt", {
    flags: "a", // 'a' means appending (old data will be preserved)
  });
  for (let i = 0; i < imagenes.length; i++) {
    try {
      pathFile = `${path}\\${imagenes[i]}.jpg`;
      if (!fs.existsSync(pathFile)) {
        const options = {
          //  url: `${url}/resul/imgActa/${imagenes[i]}1.jpg`,
          url: `${url}/${imagenes[i]}${tipo}.jpg`,
          dest: path,
        };
        const { filename, image } = await download.image(options);
        console.log(filename, i + 1);
      } else {
        console.log(`El archivo ya existe ${imagenes[i]}.jpg`);
      }
    } catch (e) {
      logger.write(imagenes[i].toString() + '\n')
      console.error(`El acta no ha sido cargada${imagenes[i]}`);
    }
  }
  logger.end()
}
downloadIMG();
