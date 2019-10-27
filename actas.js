const fs = require('fs');
const csv = require('fast-csv');
const axios = require('axios');
const url = 'https://computo.oep.org.bo/resul/resulActa';
const actas = require('./actas.datos');
let array = [];
var mesas = actas.array_actas;

const ws = fs.createWriteStream('mesas.csv');
async function obternerJson() {
    array.push(['numMesa','numMesaEnReci','numElec','elecActa','dep','prov','muni','circun','loc','reci','CC','FPV','MTS','UCS','MAS-IPSP','21F','PDC','MNR','PAN-BOL','VALIDOS','BLANCOS','NULOS'])
    for (let i = 0; i < mesas.length; i++) {
        try {
            const response = await axios({
                method: 'get',
                url: `${url}/${mesas[i]}/1`,
                responseType: 'application/json'
            });
            formatearArray(response.data.resulActa);
            console.log(`Registro ${i+1}`);
        } catch (error) {
            console.error(error);
        }
    }

    csv.write(array, {headers: true, encoding: 'utf8'})
    .pipe(ws);
    
}
obternerJson();



async function formatearArray(data){
    const aux_array = []
    for(let key in data){
        if (data.hasOwnProperty(key)){
            if(key !== 'resul'){
                aux_array.push(data[key]);
            } else {
                const result = data['resul'];
                for(let i = 0 ; i < result.length ; i++){
                    aux_array.push(data[key][i].votos);
                }
            }

        }
    }
    array.push(aux_array);

}