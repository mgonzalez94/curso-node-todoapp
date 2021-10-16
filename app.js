const { inquirerMenu, 
        inquirerPausa, 
        inquirerLeerInput,
        inquirerListadoTareasBorrar,
        inquirerConfirmar,
        inquirerMostrarListadoChecklist
     } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { mostrarMenu, pausa } = require('./helpers/mensajes');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //opt = await mostrarMenu();
        opt = await inquirerMenu();
        //console.log({opt});

        switch (opt) {
            case '1': //#Crear tarea
                const desc = await inquirerLeerInput('Descripción: ');
                tareas.crearTarea(desc);
                guardarDB(tareas.listadoArr);
                //console.log(desc);
                break;
            case '2': //#Listar opciones
                tareas.listadoCompleto();
                break;
            case '3': //#Listamos tareas completadas.
                tareas.listarPendientesCompletados(true);
                break;
            case '4': //#Listamos tareas pendientes.
                tareas.listarPendientesCompletados(false);
                break;
            case '5': //#Completar tareas.
                const ids = await inquirerMostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //#Borrar
                //# Listamos las opciones...
                const id = await inquirerListadoTareasBorrar(tareas.listadoArr);
                //# Solicitar la confirmación.
                if (id !== '0') {
                    const confirmar = await inquirerConfirmar('¿Esta seguro?');
                    if (confirmar) {
                        tareas.borrarTarea(id);
                    }
                }
                break;
        }

        //#Guardamos las tareas en formato de array.
        guardarDB( tareas.listadoArr );
        await inquirerPausa();
        

    } while( opt !== '0');
}

main();