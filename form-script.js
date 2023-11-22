// Lista vazia
var formList = [];
var count = 1;

// Função para adicionar um novo comentário
function addOpinion(name, lastname, age, email, opinion) {
    var newOpinion = { 
        id: count++,
        name: name,
        lastname: lastname,
        age: age,
        email: email,
        opinion: opinion
    }

    formList.push(newOpinion);
    localStorage.setItem('formList', JSON.stringify(formList));
    renderFormList();
}

// Função para excluir um comentário
function deleteOpinion(opinionId) {
    var updatedFormList = formList.filter( function (opinion) {
        return opinion.id !== opinionId;
    })

    if (updatedFormList.length < formList.length) {
        formList = updatedFormList;
        localStorage.setItem('formList', JSON.stringify(formList));
        renderFormList;
    } else {
        alert('Opinião não encontrada.');
    }
}

// Função para recuperar a lista de comentários do localStorage 
function getFormList() {
    var storedList = JSON.parse(localStorage.getItem('formList'));
    formList = storedList || [];
}

// Função para renderizar a lista
function renderFormList() {
    var formListElement = document.getElementById('list');
    formListElement.innerHTML = '';

    formList.forEach( function (opinion) {
        var listItem = document.createElement('li');
        var content =
            `<span class="form-name">${opinion.name}</span><br>` +
            `<span class="form-email">${opinion.email}</span><br>` +
            `<span class="form-opinion">${opinion.opinion}</span>`;

        listItem.innerHTML = content;
        formListElement.appendChild(listItem);
    })
}

// Recuperar a lista de comentário do localStorage
getFormList();

// Renderizar a lista no HTML
renderFormList();

// Event listener para o formulário do novo comentário
document.getElementById('form-inputs').addEventListener('submit', function (event) {
    event.preventDefault();
    var nameInput = document.getElementById('name');
    var lastnameInput = document.getElementById('lastname');
    var ageInput = document.getElementById('age');
    var emailInput = document.getElementById('email');
    var opinionInput = document.getElementById('opinion');
    addOpinion(
        nameInput.value,
        lastnameInput.value,
        ageInput.value,
        emailInput.value,
        opinionInput.value
    )

    nameInput.value = '';
    lastnameInput.value = '';
    ageInput.value = 16; // Idade mínima
    emailInput.value = '';
    opinionInput.value = '';
})