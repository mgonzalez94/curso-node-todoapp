const fs = require('fs');
const archivo = './db/data.json';

const guardarDB = (data) => {    
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    //# Validamos si existe el archivo-
    if(!fs.existsSync(archivo)){
        return null;
    }
    //# Leemos la información.
    const info = fs.readFileSync(archivo, { encoding: 'utf8' });
    //# Parseamos la info.
    const data = JSON.parse( info );
    //# Devolvemos el resultado.
    //console.log(data);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}