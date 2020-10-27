const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', validateSearch);
})

function validateSearch(e) {
    e.preventDefault();

    const search = document.querySelector('#busqueda').value;

    if(search === ''){
        showAlert('Agrega un término de búsqueda');
        return;
    } 

    consultAPI(search);
}

function consultAPI(search){
    const githubURL = `https://jobs.github.com/positions.json?search=${search}`;
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(githubURL)}`;

    axios.get(url)
        .then(response => showVacancy(JSON.parse(response.data.contents)))
}

function showAlert(message) {
    const previewAlert = document.querySelector('.alert');

    if(!previewAlert){
        const alert = document.createElement('div');
        alert.classList.add('bg-gray-100','p-3','text-center','mt-3','alert');
        alert.textContent = message;

        form.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        },3000);
    }
}


function showVacancy(vacancies) {
    while(result.firstChild){
        result.removeChild(result.firstChild)
    }

    if(vacancies.length > 0){
        result.classList.add('grid');
        vacancies.forEach(vacancy => {

            const { company, company_logo, title, type, url } = vacancy;
            result.innerHTML += `
            <div class="shadow bg-white p-6 rounded">
                <img class="w-24 mx-auto mb-4" src="${company_logo}" />
                <h2 class="text-2xl font-light mb-4">${title}</h2>
                <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
            </div>
            `;
        })
    } else {
        const noResult = document.createElement('p');
        noResult.classList.add('text-center','mt-10','text-gray-600','w-full');
        noResult.textContent = 'No hay vacantes, intenta con otro término de búsqueda';
        result.classList.remove('grid');
        result.appendChild(noResult);
    }
}