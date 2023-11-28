// Lista vazia
var formList = [];
var count = 1;

// Função para adicionar um novo comentário
function addOpinion(name, lastname, age, email, opinion) {
    var date = new Date();
    var dateString = 
            date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ' ' +
            date.getHours() + ':' + date.getMinutes() ;

    var newOpinion = { 
        id: count++,
        name: name,
        lastname: lastname,
        age: parseInt(age),
        email: email,
        opinion: opinion,
        date: dateString
    }

    formList.push(newOpinion);
    localStorage.setItem('formList', JSON.stringify(formList));
    renderFormList();
}

// Função para excluir um comentário
function deleteOpinion(opinionId) {
    var updatedFormList = formList.filter( function (opinion) {
        return opinion.id !== opinionId;
    });

    if (updatedFormList.length < formList.length) {
        formList = updatedFormList;
        localStorage.setItem('formList', JSON.stringify(formList));
        renderFormList();
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

    // List
    formList.forEach( function (opinion) {
        var listItem = document.createElement('li');
        var content =
            `<div class="opinion-header">
                <span class="form-name">${opinion.name}</span>
                <button type="submit" class="delete-button" onclick="deleteOpinion(${opinion.id})">X</button>  
            </div>` +
            `<span class="form-email">${opinion.email}</span><br>` +
            `<span class="form-opinion">${opinion.opinion} </span><br><br>` +
            `<span class="form-date">(${opinion.date})</span>`;

        listItem.innerHTML = content;
        formListElement.appendChild(listItem);
    })

    // Buttons display
    var deleteButtonElement = document.getElementById('deleteAll-button');
    var searchByNameElement = document.getElementById('search-name');
    var searchByEmailElement = document.getElementById('search-email');

    if(formList.length > 0) {
        deleteButtonElement.style.display = 'block';
        searchByNameElement.style.display = 'block';
        searchByEmailElement.style.display = 'block';
    } else {
        deleteButtonElement.style.display = 'none';
        searchByNameElement.style.display = 'none';
        searchByEmailElement.style.display = 'none';
    }
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
    if(!opinionInput.value) opinionInput.value = "Sem opinião!";

    addOpinion(
        nameInput.value,
        lastnameInput.value,
        ageInput.value,
        emailInput.value,
        opinionInput.value
    )

    cleanFields();
})

// Função para limpar os campos do formulário
function cleanFields() {
    document.getElementById('name').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('age').value = null;
    document.getElementById('email').value = '';
    document.getElementById('opinion').value = '';
}

// Função para deletar todos os elementos
function deleteAll() {
    localStorage.clear();
    document.getElementById('list').innerHTML = '';
    formList = [];
    count = 1;
    renderFormList();
}

// Event listener para procurar uma opinião por id
document.getElementById('search-name').addEventListener('click', function() {
    var nome = prompt('Digite o nome que você deseja procurar');

    if (nome !== null) {
        var found = false;

        for (var i = 0; i < formList.length; i++) {
            if (formList[i].name.toLowerCase() === nome.toLowerCase()) {
                alert(
                    `Nome: ${formList[i].name}\n` +
                    `Sobrenome: ${formList[i].lastname}\n` +
                    `Idade: ${formList[i].age}\n` +
                    `E-mail: ${formList[i].email}\n` +
                    `Opinião: ${formList[i].opinion}\n`
                    )
                    found = true;
            }
        }
        
        if (!found) {
            alert("Nome não encontrado!");
        }     
    } else {
        alert("Nenhum nome inserido!");
    }
})

// Event listener para procurar uma opinião por email
document.getElementById('search-email').addEventListener('click', function() {
    var email = prompt('Digite o email que você deseja procurar');

    if (email !== null) {
        var found = false;

        for (var i = 0; i < formList.length; i++) {
            if (formList[i].email === email) {
                alert(
                    `Nome: ${formList[i].name}\n` +
                    `Sobrenome: ${formList[i].lastname}\n` +
                    `Idade: ${formList[i].age}\n` +
                    `E-mail: ${formList[i].email}\n` +
                    `Opinião: ${formList[i].opinion}\n`
                    )
                    found = true;
            }
        }
        
        if (!found) {
            alert("Email não encontrado!");
        }     
    } else {
        alert("Nenhum email inserido!");
    }
})


