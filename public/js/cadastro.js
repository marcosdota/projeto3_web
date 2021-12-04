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

const login = document.querySelector('input[name=login]'),
    email = document.querySelector('input[name=email]'),
    password = document.querySelector('input[name=password]'),
    confirmPassword = document.querySelector('input[name=confirmPassword]'),
    submit = document.querySelector('input[type=submit]'),
    container = document.querySelector(".apresentaErro");

submit.addEventListener('click', async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    container.innerHTML = "";

    if (login.value.length < 3) {
        apresentaErro('Login <= 3 caracteres!');
        return;
    }

    if (email.value.length < 3) {
        apresentaErro('Email <= 3 caracteres!');
        return;
    }

    if (password.value.length < 3) {
        apresentaErro('Senha <= 3 caracteres!');
        return;
    }

    if (confirmPassword.value.length < 3) {
        apresentaErro('Senha Confirma <= 3 caracteres!');
        return;
    }

    if (password.value != confirmPassword.value) {
        apresentaErro('Senhas Diferentes!');
        return;
    }

    try {
        const response = await axios.post('/usuario/cadastrar', {
            login: login.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        });
        console.log(response);
        if (response.status == 200) {
            container.innerHTML = '<label><input type="checkbox" class="alertCheckbox" autocomplete="off" /><div class="alert success"><span class="alertClose">X</span><span class="alertText">Cadastrado com sucesso! Você será redirecionado em 5s!<br class="clear"/></span></div></label>';
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(5000);
            //Redireciona
            window.location.href = "/";
        }
    } catch (e) {
        //alert(e.response.data.message);
        apresentaErro(e.response.data.message);
    }
    return false;
});

//Verifica se o campo Login tem menos de 3 caracteres - tempo real
document.getElementById("login").addEventListener(
    "keyup",
    (event) => {
        container.innerHTML = "";
        if (login.value.length < 3)
            apresentaErro('Login <= 3 caracteres!');
    },
    false
);

//Verifica se o campo Email tem menos de 3 caracteres - tempo real
document.getElementById("email").addEventListener(
    "keyup",
    (event) => {
        container.innerHTML = "";
        if (email.value.length < 3)
            apresentaErro('Email <= 3 caracteres!');
    },
    false
);

//Verifica se o campo Senha tem menos de 3 caracteres - tempo real
document.getElementById("password").addEventListener(
    "keyup",
    (event) => {
        container.innerHTML = "";
        if (password.value.length < 3)
            apresentaErro('Senha <= 3 caracteres!');
    },
    false
);

//Verifica se o campo Senha Confirma tem menos de 3 caracteres - tempo real
document.getElementById("confirmPassword").addEventListener(
    "keyup",
    (event) => {
        container.innerHTML = "";
        if (confirmPassword.value.length < 3) {
            apresentaErro('Senha Confirma <= 3 caracteres!');
            return;
        }
        else if (password.value != confirmPassword.value)
            apresentaErro('Senhas Diferentes!');

    },
    false
);

function apresentaErro(msg) {
    container.innerHTML = '<label><input type="checkbox" class="alertCheckbox" autocomplete="off" /><div class="alert error"><span class="alertClose">X</span><span class="alertText">' + msg + '<br class="clear"/></span></div></label>';
}