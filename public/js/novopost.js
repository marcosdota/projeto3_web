if (localStorage.getItem('usuario') != null) {
    //Verifica se usuario tem sessão ativa
    axios.get('/usuario_logado')
        .then(function (response) {
            //console.log(response);
            //Sessao ativa - Logado Corretamente
        })
        .catch(function (error) {
            //console.log("caiu catch");
            window.location.href = "/";
        });
}
else {
    //Não está logado - redireciona
    window.location.href = "/";
}

const titulo = document.querySelector('input[name=titulo]'),
    categoria = document.querySelector('input[name=categoria]'),
    submit = document.querySelector('input[type=submit]'),
    container = document.querySelector(".apresentaErro");

submit.addEventListener('click', async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    container.innerHTML = "";
    const formData = new FormData();
    const imagefile = document.querySelector("#thumbnail");
    formData.append("thumbnail", imagefile.files[0]);
    formData.append("titulo", titulo.value);
    formData.append("categoria", categoria.value);
    try {
        const response = await axios.post("/posts/novopost", formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            }
        });
        //console.log(response);
        container.innerHTML = '<label><input type="checkbox" class="alertCheckbox" autocomplete="off" /><div class="alert success"><span class="alertClose">X</span><span class="alertText">Post de Game cadastrado com sucesso! Você será redirecionado em 5s!<br class="clear"/></span></div></label>';
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(5000);
        window.location.href = "/";
    }
    catch (e) {
        console.log(e);
        apresentaErro(e.response.data.message);
        if (e.response.status == 401) {
            apresentaErro(e.response.data.message + " Redirecionando...");
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(3000);
            window.location.href = "/";
        }
    }

    return false;
});

function apresentaErro(msg) {
    container.innerHTML = '<label><input type="checkbox" class="alertCheckbox" autocomplete="off" /><div class="alert error"><span class="alertClose">X</span><span class="alertText">' + msg + '<br class="clear"/></span></div></label>';
}