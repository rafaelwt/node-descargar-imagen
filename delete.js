const fs = require('fs');
const actas = require('./actas.datos');
const path = "D:\\actas-elecciones";
var imagenes = actas.array_actas;
let sizeFile = 0;
let filename = '';

for (var i = 0; i < imagenes.length; i++) {
    try {
        filename = `${path}\\${imagenes[i]}.jpg`
        if(fs.existsSync(filename)){
            sizeFile = getFilesizeInBytes(filename)
            console.log(sizeFile);
            if(sizeFile <  50) {
                fs.unlink(filename, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                  });
            }
        }
    } catch (e) {
      console.error(e)
    }
   };

function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}