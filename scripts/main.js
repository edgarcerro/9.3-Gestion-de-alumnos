'use strict'

const SERVER = 'http://localhost:3000'

async function getAlumnos() {
    const response = await fetch(SERVER + '/alumnos')
    const myData = await response.json();
    return myData;
}

async function createAlumno(newAlumno) {
    const response = await fetch(SERVER + '/alumnos', {
        method: 'POST',
        body: JSON.stringify(newAlumno),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const myData = await response.json();
    return myData;
}

async function deleteAlumno(id) {
    const response = await fetch(SERVER + '/alumnos/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    })
    return response
}
window.addEventListener('load', () => {
    init()
    setListeners()
})

async function init() {
    try {
        let alumnos = await getAlumnos()
        alumnos.forEach(alumno => {
            renderNewAlumno(alumno)
        })
    } catch (error) {
        throw (error)
    }
   
}

function setListeners() {
    let addform = document.getElementById('new-student');
    let delform = document.getElementById('del-student');

    addform.addEventListener('submit', async (event) => {
        event.preventDefault()

        let alumName = document.getElementById('name').value
        let alumSurname = document.getElementById('surname').value
        let alumEmail = document.getElementById('email').value
        let alumfecnac = document.getElementById('fecnac').value

        let newAlumno = {
            nombre: alumName,
            apellido: alumSurname,
            email: alumEmail,
            fecnac: alumfecnac,
            grupo: 0
        }

        try {
            await renderNewAlumno(await createAlumno(newAlumno))
        } catch (error) {
            throw (error)
        }

    })

    delform.addEventListener('submit', async (event) => {
        event.preventDefault()
        let alumId = document.getElementById('id').value
        try {
            await deleteAlumno(alumId)

        } catch (error) {
            throw (error)
        }
        renderDelAlumno(alumId)
    })
}



function renderNewAlumno(alumno) {
    let body = document.querySelector('#alumnos tbody')
    let alumnoTr = document.createElement('tr')
    alumnoTr.id = 'alumno-' + alumno.id
    alumnoTr.innerHTML = `
    <td>${alumno.id}</td>
    <td>${alumno.nombre} ${alumno.apellido}</td>
    <td>${alumno.email}</td>
    <td>${alumno.fecnac}</td>
    `
    body.appendChild(alumnoTr)
}

function renderDelAlumno(id) {
    const $alumnoUI = document.getElementById('alumno-' + id)
    if ($alumnoUI) {
        $alumnoUI.parentElement.removeChild($alumnoUI)
    }
}
