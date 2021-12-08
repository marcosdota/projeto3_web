if (localStorage.getItem('usuario') != null) {
    //Verifica se usuario tem sessão ativa, se tiver redireciona index
    axios.get('/usuario_logado')
        .then(function (response) {
            //console.log(response);
            //Sessao ativa - Logado Corretamente - Redireciona
            window.location.href = "/";
        })
        .catch(function (error) {
            //console.log("caiu catch");
        });
}

//Reaproveitado Projeto 2
const email = document.querySelector('input[name=email]'),
    password = document.querySelector('input[name=password]'),
    submit = document.querySelector('input[type=submit]'),
    container = document.querySelector(".apresentaErro");

//Realiza Login
submit.addEventListener('click', async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    container.innerHTML = "";

    if (email.value.length < 3) {
        apresentaErro('Email >= 3 caracteres');
        return;
    }
    if (password.value.length < 3) {
        apresentaErro('Senha >= 3 caracteres');
        return;
    }

    try {
        const response = await axios.post('/usuario/login', {
            email: email.value,
            password: password.value,
        });
        console.log(response);
        if (response.status == 200) {
            //console.log(response.data.user.usuarioId);
            localStorage.setItem('usuario', response.data)
            window.location.href = "/views/index.html";
        }
    } catch (e) {
        //https://codepen.io/pivkhan/pen/aOBZxg
        apresentaErro(e.response.data.message);
    }
    return false;
});

//Verifica se o campo Email tem menos de 3 caracteres - tempo real
document.getElementById("email").addEventListener(
    "keyup",
    (event) => {
        container.innerHTML = "";
        if (email.value.length < 3)
            apresentaErro('Email >= 3 caracteres');
    },
    false
);

//Verifica se o campo Senha tem menos de 3 caracteres - tempo real
document.getElementById("password").addEventListener(
    "keyup",
    (event) => {
        container.innerHTML = "";
        if (password.value.length < 3)
            apresentaErro('Senha >= 3 caracteres');

    },
    false
);

function apresentaErro(msg) {
    container.innerHTML = '<label><input type="checkbox" class="alertCheckbox" autocomplete="off" /><div class="alert error"><span class="alertClose">X</span><span class="alertText">' + msg + '<br class="clear"/></span></div></label>';
}