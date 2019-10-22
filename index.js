const download = require('image-downloader');
const actas = require('./actas.datos');
const fs = require('fs');
var imagenes = actas.array_actas;
const url = "https://trep.oep.org.bo";
const path = "D:\\actas-elecciones";
let pathFile = '';
 async function downloadIMG() {
    for (var i = 0; i < imagenes.length; i++) {
        try {
            pathFile = `${path}\\${imagenes[i]}.jpg`
            if(!fs.existsSync(pathFile)){
                const options = {
                    url: `${url}/resul/imgActa/${imagenes[i]}.jpg`,
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