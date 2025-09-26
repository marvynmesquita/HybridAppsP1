const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contactForm');

const checkScreenSize = () => {
    const width = window.innerWidth;
    if(width > 700){
        document.querySelector(".hero-icon").innerText = "💻";
    } else {
        document.querySelector(".hero-icon").innerText = "📱";
    }
}

window.onresize = () => {
    checkScreenSize();
}

document.onload = () => {
    checkScreenSize();
}

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

// VERIFICA se o formulário existe na página atual antes de adicionar o evento
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (data.nome == undefined || data.nome == "" || data.nome == " "){
            alert('Nome obrigatório')
        }
        else if(data.email == undefined || data.email == "" || data.email == " ") {
            alert("E-mail obrigatório")
        }
        else if(data.assunto == undefined || data.assunto == "" || data.assunto == " ") {
            alert("Assunto obrigatório")
        }
        else if(data.mensagem == undefined || data.mensagem == "" || data.mensagem == " ") {
            alert("Mensagem obrigatória")
        }
        else {
            alert('Mensagem enviada com sucesso!\\n\\nDados:\\n' + JSON.stringify(data, null, 2));
        }
        
        this.reset();
    });
}

// VERIFICA se o botão E o menu existem na página atual
if (menuBtn && navMenu) {
    // Evento para ABRIR/FECHAR o menu ao clicar no BOTÃO
    menuBtn.addEventListener('click', (e) => {
        // Impede que o clique no botão seja capturado pelo evento do documento abaixo
        e.stopPropagation(); 
        navMenu.classList.toggle('ativo');
    });

    // NOVO: Evento para FECHAR o menu ao clicar FORA dele
    document.addEventListener('click', (e) => {
        // Verifica se o menu está aberto E se o clique não foi no menu NEM no botão
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnButton = menuBtn.contains(e.target);

        if (navMenu.classList.contains('ativo') && !isClickInsideMenu && !isClickOnButton) {
            navMenu.classList.remove('ativo');
        }
    });
}