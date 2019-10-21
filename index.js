const download = require('image-downloader');
const actas = require('./actas.datos');

 var imagenes = actas.array_actas;
 const url = "https://trep.oep.org.bo";
 const path = "D:\actas-elecciones";
 async function downloadIMG() {
    for (var i = 0; i < imagenes.length; i++) {
        try {
            const options = {
                url: `${url}/resul/imgActa/${imagenes[i]}.jpg`,
                dest: path
            }
                const { filename, image } = await download.image(options);
                console.log(filename, i);
        } catch (e) {
          console.error(e)
        }
       };
  }
 downloadIMG();