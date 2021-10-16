const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
                    {
                        value: '1',
                        name : `${'1.'.green} Crear tarea`
                    },
                    {
                        value: '2',
                        name : `${'2.'.green} Listar tareas`
                    },
                    {
                        value: '3',
                        name : `${'3.'.green} Listar tareas completadas`
                    },
                    {
                        value: '4',
                        name : `${'4.'.green} Listar tareas pendientes`
                    },
                    {
                        value: '5',
                        name : `${'5.'.green} Completar tarea(s)`
                    },
                    {
                        value: '6',
                        name : `${'6.'.green} Borrar`
                    },
                    {
                        value: '0',
                        name : `${'0.'.green} Salir`
                    }
        ]
    }
];

const pausa = [
    {
        type: 'input',
        name: 'opcion',
        message : `Presione ${'ENTER'.green} para continuar...`
    }
]

const inquirerPausa = async() => {
    console.log('\n');
    const { opcion } = await inquirer.prompt(pausa);
    return opcion;
}

const inquirerLeerInput = async( msj = '') => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: msj,
            validate( value ) {
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt (question);
    return desc;
}

const inquirerMenu = async() => {
    //console.clear();
    console.log('==========================='.green);
    console.log('  Seleccione una opción:   '.white);
    console.log('=========================== \n'.green);

    const { opcion } = await inquirer.prompt( preguntas);
    return opcion;

}

const inquirerListadoTareasBorrar = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.toString().green;
        return {
            value : tarea.id,
            name  : `${ idx } ${ tarea.desc } `
        }
    });

    choices.push ({
        value : '0',
        name  : `${'0.'.green} Cancelar`
    });

    const preguntas = [
         {
             type    : 'list',
             name    : 'id',
             message : 'Seleccione una opción para borrarla',
             choices
         }
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
    //console.log(choices);
}

const inquirerConfirmar = async(message) => {
    const question  = {
        type    : 'confirm',
        name    : 'ok',
        message
    };

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const inquirerMostrarListadoChecklist = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.toString().green;
        return {
            value   : tarea.id,
            name    : `${ idx } ${ tarea.desc } `,
            checked : ( tarea.completadoEn ) ? true : false
        }
    });

    /* choices.push ({
        value : '0',
        name  : `${'0.'.green} Cancelar`
    });
 */
    const pregunta = [
         {
             type    : 'checkbox',
             name    : 'ids',
             message : 'Selecciones',
             choices
         }
    ];
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    inquirerLeerInput,
    inquirerListadoTareasBorrar,
    inquirerConfirmar,
    inquirerMostrarListadoChecklist
}



