const Tarea = require("./tarea");

/**
 * _listado:
 *  {'uuid-1234-1234: {id:12, desc:asd, completadoEn: 20210982}'},
 */
class Tareas {
    //#Props
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });        
        return listado;
    }

    constructor () {
        this._listado = {};
    }
    
    //#Method
    crearTarea(descr){
        const tarea = new Tarea(descr);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea (id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
            console.log('La tarea ha sido borrada correctamente');
        }
        else {
            console.log('La tarea no existe o ya ha sido borrada');
        }
    }

    /**
     * Genera instancias del objeto tareas a partir de un arreglo.
     * @param {*} tareas 
     */
    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        //# Forma 1.
        /* let info = '' ;
        let i = 1;
        this.listadoArr.forEach( tarea => {
            info = `${i}.`.green;
            info = info + ' ' + tarea.desc + ' :: ';
            info = info + (tarea.completadoEn == null ? 'Pendiente'.red   : 'Completado'.green);
            console.log(info);
            i++;
        }); */

        //# Forma 2.
        console.log();
        this.listadoArr.forEach( (tarea,i) => {
            const idx = `${i + 1 }`.green;
            const { desc , completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        } );
    }
    /**
     * Listado de los pendientes que hayan sido completadas.
     * @param {*Si han sido completadas o no} completadas 
     */
    listarPendientesCompletados( completadas = true) {
        console.log();
        //# Forma 1.
        /* this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i + 1 }`.green;
            const { desc , completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            
            if (completadas) {
                if (completadoEn) 
                    console.log(`${idx} ${desc} :: ${estado}`);
            } else {
                if (!completadoEn)
                    console.log(`${idx} ${desc} :: ${estado}`);
            }
        }) */

        //# Forma 2.
        let idx = 0;
        this.listadoArr.forEach(( tarea) => {
            const { desc , completadoEn } = tarea;
            const estado = (completadoEn) ? completadoEn.green : 'Pendiente'.red;

            if ( completadas ) {
                if ( completadoEn ) {
                    idx += 1;
                    console.log(`${(idx + '.').green} ${desc} :: ${estado}`);
                }
            } else {
                if ( !completadoEn ) {
                    idx += 1;
                    console.log(`${(idx + '.').green} ${desc} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas ( ids = []) {
        //# Marcamos los ids
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        //# Desmarcamos los que no se hayan asignado.
        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });
    }

}

module.exports = Tareas;