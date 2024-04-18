document.addEventListener("DOMContentLoaded", function() {
    const reposContainer = document.getElementById("repos-container");

    // URL da API do GitHub para buscar repositórios públicos de um usuário
    const githubAPIURL = 'https://api.github.com/users/Stuschmidt/repos';

    // Fazer solicitação à API do GitHub para obter os repositórios
    fetch(githubAPIURL)
        .then(response => response.json())
        .then(data => {
            // Processar os dados dos repositórios
            data.forEach(repo => {
                // Criar elemento para cada repositório
                const repoElement = document.createElement('div');
                repoElement.classList.add('repo');

                // Adicionar informações do repositório ao elemento
                repoElement.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description ? repo.description : 'Sem descrição'}</p>
                    <p>Language: ${repo.language ? repo.language : 'N/A'}</p>
                    <p>Stars: ${repo.stargazers_count}</p>
                `;

                // Adicionar elemento do repositório ao contêiner de repositórios
                reposContainer.appendChild(repoElement);
            });
        })
        .catch(error => console.error('Erro ao buscar repositórios do GitHub:', error));

    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-btn");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Validar campos
        if (validateForm()) {
            // Enviar dados para o servidor (simulação)
            sendFormData();
        }
    });

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === "") {
            isValid = false;
            showError(nameInput, "Por favor, insira seu nome.");
        } else {
            hideError(nameInput);
        }

        if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, "Por favor, insira um email válido.");
        } else {
            hideError(emailInput);
        }

        if (messageInput.value.trim() === "") {
            isValid = false;
            showError(messageInput, "Por favor, insira uma mensagem.");
        } else {
            hideError(messageInput);
        }

        return isValid;
    }

    function showError(input, message) {
        const errorDiv = input.nextElementSibling;
        errorDiv.innerText = message;
        errorDiv.style.display = "block";
    }

    function hideError(input) {
        const errorDiv = input.nextElementSibling;
        errorDiv.innerText = "";
        errorDiv.style.display = "none";
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function sendFormData() {
        // Aqui você pode enviar os dados do formulário para o servidor usando AJAX ou fetch
        // Por enquanto, vamos apenas simular o envio
        alert("Dados enviados com sucesso!");
        form.reset();
    }
});
