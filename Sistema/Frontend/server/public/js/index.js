//axios.defaults.baseURL = "http://localhost:3002/";
//axios.defaults.headers.common["Content-Type"] =
   // "application/json;charset=utf-8";

$(document).ready(() => {
    loadDataTable();
});

$('#mainForm').validate({
    rules: {
        fNome: {
            required: true,
            minlength: 3,
            maxlength: 50
        },
        email: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true
        },
    },
    messages: {
        fNome: {
            required: 'Informe o nome',
            minlength: 'Nome deve conter pelo menos 3 caracteres.'
        },
    },
    onfocusout: validateFiels,
    submitHandler: createAjaxPost
});

function validateFiels(element, event) {
    $(element).valid();
}

function createAjaxPost() {
    const data = {
        nome: $('#fNome')[0].value,
        email: $('#email')[0].value
    }
    const res = axios.post('/cliente', data);
    res.then((query) => {
        console.log(query.data);
        // Limpar os campos do formulário após sucesso
        $('#fNome').val('');
        $('#email').val('');

        // Resetar a validação do formulário
        $('#mainForm').validate().resetForm();

        // Após inserir, buscar e exibir todos os dados
        loadDataTable();
    }).catch((error) => {
        console.log(error);
    });
}

function loadDataTable() {
    axios.get('/clientes')
        .then((response) => {
            processResults(response.data);
        })
        .catch((error) => {
            console.log('Erro ao carregar dados:', error);
        });
}

$('#btnSubmit').click(function() {
    $('#mainForm').submit();
});


function processResults(rows) {
    // Limpar conteúdo anterior da tabela
    $('#rowTable').empty();

    let resultsTable = `
    <div class="col-12 mt-4">
        <h3>Clientes Cadastrados</h3>
        <table id="resultsTable" class="table table-striped">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody>`;
    for (let i = 0; i < rows.length; i++) {
        resultsTable += `<tr> <td> ${rows[i].id}</td>`;
        resultsTable += `<td>${rows[i].nome}</td>`
        resultsTable += `<td>${rows[i].email}</td></tr>`
    }
    resultsTable += `
        </tbody>
        </table>
    </div>`;

    // Manter o formulário visível e adicionar a tabela abaixo
    $(resultsTable).appendTo('#rowTable');
}