function testarCriarTarefa() {
    const titulo = prompt('Digite o título da tarefa:');
    if (titulo) {
        fetch('/api/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: 'Tarefa criada via interface'
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Tarefa criada com sucesso!\\n\\nResposta: ' + JSON.stringify(data, null, 2));
            location.reload();
        })
        .catch(error => {
            alert('Erro ao criar tarefa: ' + error.message);
        });
    }
}

function testarAtualizarTarefa() {
    const id = prompt('Digite o ID da tarefa para atualizar:');
    if (id) {
        fetch(`/api/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: 'Tarefa atualizada',
                descricao: 'Descrição atualizada via interface',
                concluida: true
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Tarefa atualizada com sucesso!\\n\\nResposta: ' + JSON.stringify(data, null, 2));
        })
        .catch(error => {
            alert('Erro ao atualizar tarefa: ' + error.message);
        });
    }
}

function testarDeletarTarefa() {
    const id = prompt('Digite o ID da tarefa para deletar:');
    if (id) {
        if (confirm(`Tem certeza que deseja deletar a tarefa ${id}?`)) {
            fetch(`/api/tarefas/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert('Tarefa deletada com sucesso!\\n\\nResposta: ' + JSON.stringify(data, null, 2));
            })
            .catch(error => {
                alert('Erro ao deletar tarefa: ' + error.message);
            });
        }
    }
}

// Manipulador do formulário de contato
const contactForm = document.getElementById('contactForm');

// VERIFICA se o formulário existe na página atual antes de adicionar o evento
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        alert('Mensagem enviada com sucesso!\\n\\nDados:\\n' + JSON.stringify(data, null, 2));
        
        this.reset();
    });
}


// Manipulador do menu de navegação
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

// VERIFICA se o botão E o menu existem na página atual
if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('ativo');
    });
}