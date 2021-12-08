axios.get('/visualizacoes')
    .then(function (response) {
        console.log(response);
        //Sessao ativa e administrador
        if (response.status == 200) {
            let visualizacoes = document.querySelector('.visualizacoes');
            visualizacoes.innerHTML = "Visualizações: " + response.data;
        }
    })
    .catch(function (error) {
    });

//Verifica se usuario tem sessão ativa e monta design do index
if (localStorage.getItem('usuario') != null) {
    //Verifica se usuario tem sessão ativa
    axios.get('/usuario_logado')
        .then(function (response) {
            //console.log(response);
            //Sessao ativa e administrador
            if (response.status == 200) {
                usuario();
                if (response.data == true) {
                    axios.get('/num_post').then(function (response2) {
                        console.log(response2);
                        let num_post = document.querySelector('.num_post');
                        if (response2.data == "")
                            response2.data = 0;
                        num_post.innerHTML = "Número de postagens na sessão: " + response2.data;
                    })
                        .catch(function (error) {
                        });
                    usuario_admin();
                }
                sair();
                area_post();
                getPosts();
            }
        })
        .catch(function (error) {
            //console.log("caiu catch");
            deslogado();
            localStorage.clear();
            console.log(error.response.data.message);
        });
}
else
    deslogado();

//Insere Botão Logar e Cadastrar
function deslogado() {
    //Não está logado

    let esp = document.querySelector('.espc');
    //Insere Botão Logar e Cadastrar
    let logar = document.createElement("button");
    logar.innerHTML = "Logar";
    esp.appendChild(logar);
    logar.addEventListener('click', async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        window.location.href = "/views/login.html";
    });

    let cadastrar = document.createElement("button");
    cadastrar.innerHTML = "Cadastrar";
    esp.appendChild(cadastrar);
    cadastrar.addEventListener('click', async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        window.location.href = "/views/cadastro.html";
    });
}

//Insere Busca
function usuario() {
    let esp = document.querySelector('.espc');
    let categoria = document.createElement("input");
    categoria.setAttribute("type", "text");
    categoria.setAttribute("name", "categoria");
    categoria.setAttribute("placeholder", "Buscar por categoria...");
    esp.appendChild(categoria);

    let buscar = document.createElement("button");
    buscar.innerHTML = "Buscar";
    esp.appendChild(buscar);
    buscar.addEventListener('click', async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        try {
            const response = await axios.get('/posts', {
                params: {
                    categoria: categoria.value
                }
            });
            console.log(response);
            if (response.status == 200) {
                imprimeDados(response);
            }
        } catch (e) {
            //alert(e.response.data.message);
        }
        return false;
    });
}

//Insere Botão Novo Post
function usuario_admin() {
    let esp = document.querySelector('.espc');
    let novopost = document.createElement("button");
    novopost.innerHTML = "Nova postagem";
    esp.appendChild(novopost);
    novopost.addEventListener('click', async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        window.location.href = "/views/novopost.html";
    });
}

//Insere Botão para Logout - //Verificar
function sair() {
    let esp = document.querySelector('.espc');
    let sair = document.createElement("button");
    sair.innerHTML = "Sair";
    esp.appendChild(sair);
    sair.addEventListener('click', async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        localStorage.clear();
        window.location.href = "/usuario_logout";

    });
}

//Insere Div de Postagens
function area_post() {
    let esp = document.querySelector('.espc');
    let linha_final = document.createElement("div");
    linha_final.setAttribute("class", "linha_final");
    esp.appendChild(linha_final);
    let containerBusca = document.createElement("div");
    containerBusca.setAttribute("class", "containerBusca");
    linha_final.appendChild(containerBusca);
}

//Buscas as Postagens
function getPosts() {
    axios.get('/posts')
        .then(function (response) {
            console.log(response);
            imprimeDados(response);
        })
        .catch(function (error) {
            console.log(error.response.data.message);
        });
}

//Imprime as Postagens
function imprimeDados(response) {
    var docs = response.data;
    var container = document.querySelector(".containerBusca");
    container.innerHTML = "";
    for (let i = 0; i < docs.length; i++) {
        var titulo = document.createElement("h2");
        titulo.classList.add("busca");
        titulo.innerHTML = 'Jogo: ' + docs[i].titulo;
        var categoria = document.createElement("span");
        categoria.classList.add("desc");
        categoria.innerHTML = 'Categoria: ' + docs[i].categoria;
        var img = document.createElement("img");
        img.src = "../" + docs[i].thumbnail;
        container.appendChild(titulo);
        container.appendChild(categoria);
        container.appendChild(img);
    }
}