const download = require('image-downloader');
const actas = require('./actas.datos');
const fs = require('fs');
var imagenes = actas.array_actas;
// const url = "https://trep.oep.org.bo";
const url = "https://s3.amazonaws.com/sn-archivo-computo/actas"
const path = "E:\\actas-elecciones";
let pathFile = '';

const tipo = 6;              // 6 = alcalde ,   2 = Gobernador
 async function downloadIMG() {
    for (let i = 0; i < imagenes.length; i++) {
        try {
            pathFile = `${path}\\${imagenes[i]}.jpg`
            if(!fs.existsSync(pathFile)){
                const options = {
                   //  url: `${url}/resul/imgActa/${imagenes[i]}1.jpg`,
                   url: `${url}/${imagenes[i]}${tipo}.jpg`,
                    dest: path
                }
                const { filename, image } = await download.image(options);
                console.log(filename, i);
            } else {
                console.log(`El archivo ya existe ${imagenes[i]}.jpg`)
            }
        } catch (e) {
          console.error(e)
        }
       };
  }
 downloadIMG();