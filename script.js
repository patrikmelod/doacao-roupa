function salvarUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    if (nome == "" || email == "") {
        alert("Preencher nome e email.");
    } else if(localStorage.getItem(nome) != null) {
        alert("Usuário já cadastrado.")
    } else {
        const id = Date.now();
        const dataInclusao = getDataAtual();

        const dados = {
            id: id,
            nome: nome,
            email: email,
            dataInclusao: dataInclusao
        };

        localStorage.setItem(nome, JSON.stringify(dados));

        addUsuarioLista(nome);

        document.getElementById('nome').value = "";
        document.getElementById('email').value = "";
    }
}

function removerTodosUsuarios() {
    localStorage.clear();
    limparLista();
}

function removerUsuario(nome) {
    localStorage.removeItem(nome);
}

function configurarRemocao() {
    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            removerUsuario(div.querySelector('.user').textContent);
            div.style.display = "none";
        }
    }
}

function addUsuarioLista(nome) {
    let li = document.createElement("li");
    let inputValue = JSON.parse(localStorage.getItem(nome));

    let idUser = document.createElement("span");
    idUser.className = "id";
    idUser.appendChild(document.createTextNode(inputValue.id));
    li.appendChild(idUser);

    let nomeUser = document.createElement("span");
    nomeUser.className = "user";
    nomeUser.appendChild(document.createTextNode(inputValue.nome));
    li.appendChild(nomeUser);

    let emailUser = document.createElement("span");
    emailUser.className = "email";
    emailUser.appendChild(document.createTextNode(inputValue.email));
    li.appendChild(emailUser);

    let dataUser = document.createElement("span");
    dataUser.className = "data";
    dataUser.appendChild(document.createTextNode(inputValue.dataInclusao));
    li.appendChild(dataUser);

    let span = document.createElement("span");
    span.className = "close";
    span.appendChild(document.createTextNode("\u00D7"));
    li.appendChild(span);

    document.getElementById("listaUsers").appendChild(li);

    configurarRemocao();
}

function limparLista() {
    var tarefas = document.querySelectorAll("li");
    tarefas.forEach(function (tarefa) {
        console.log(tarefa.id);
        if (tarefa.id != "header")
            tarefa.remove();
    });
}

function exibirDados() {
    limparForm();

    const ul = document.getElementById('listaUsers');
    const headerLi = ul.firstElementChild;
    ul.innerHTML = '';
    ul.appendChild(headerLi);

    for (let i = 0; i < localStorage.length; i++) {
        const nome = localStorage.key(i);
        addUsuarioLista(nome);
    }
}

function procurarPorNome() {
    const nome = document.getElementById('searchNome').value;

    if (localStorage.getItem(nome) == null) {
        alert("Não existe usuário cadastrado com esse nome.")
    } else {
        const ul = document.getElementById('listaUsers');
        const headerLi = ul.firstElementChild;
        ul.innerHTML = '';
        ul.appendChild(headerLi);

        addUsuarioLista(nome);
    }

    document.getElementById('searchNome').value = "";
}

function limparForm() {
    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";
    document.getElementById('searchNome').value = "";
}

function getDataAtual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy + " ";
}

exibirDados();
configurarRemocao();