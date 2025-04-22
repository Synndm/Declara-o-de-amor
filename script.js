// Configurações
// Configuração da data de início (ALTERE PARA SUA DATA)
const dataInicio = new Date("2025-01-29"); // Formato: ANO-MÊS-DIA

// Função para calcular e atualizar o contador
function atualizarContador() {
    const hoje = new Date();
    
    // Calcula a diferença em milissegundos
    const diff = hoje - dataInicio;
    
    // Converte para dias
    const diasTotais = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Calcula anos, meses e dias restantes
    const anos = Math.floor(diasTotais / 365);
    const meses = Math.floor((diasTotais % 365) / 30);
    const dias = diasTotais % 30;
    
    // Atualiza os valores na página (SEM alterar o estilo)
    document.getElementById("anos").textContent = anos;
    document.getElementById("meses").textContent = meses;
    document.getElementById("dias").textContent = dias;
}
// Atualiza a cada segundo (opcional)
setInterval(atualizarContador, 1000); // 1000ms = 1 segundo
function atualizarContadorCompleto() {
    const hoje = new Date();
    const diff = hoje - dataInicio;
    
    // Cálculos extras
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);
    
}

// Atualiza imediatamente e depois a cada segundo
atualizarContador();
setInterval(atualizarContador, 1000 * 60 * 60 * 24); // Atualiza diariamente

const razoes = [
    "Você me faz sorrir mesmo nos dias difíceis",
    "Seu abraço é meu lugar favorito",
    "Amo como você me olha quando estou distraído",
    "Você transforma momentos simples em especiais",
    "Sua risada é o som mais lindo que já ouvi"
];

document.getElementById("razoes").addEventListener("click", () => {
    const randomRazao = razoes[Math.floor(Math.random() * razoes.length)];
    alert(randomRazao); // Ou exiba em um pop-up estilizado
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    criarPetalas();
    criarGaleria();
    carregarRazoes();
    atualizarContador();
    setInterval(atualizarContador, 1000);
    
    // Mostrar menu mobile
    document.querySelector('.menu-btn').addEventListener('click', function() {
        const menu = document.querySelector('.menu-content');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
});

// ===== FUNÇÕES PRINCIPAIS =====

// Rolagem suave
function rolarPara(id) {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
    });
    // Fecha o menu mobile se estiver aberto
    const menu = document.querySelector('.menu-content');
    if (menu) menu.style.display = 'none';
}

// Alternar tema
function alternarTema() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        icon.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Configura eventos após o carregamento
    setupEventListeners();
});

function setupEventListeners() {
    // Menu Mobile
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const menu = document.querySelector('.menu-content');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Player de Música
    const btnMusica = document.getElementById('btn-musica');
    if (btnMusica) {
        btnMusica.addEventListener('click', controlarMusica);
    }
}

// Controle de música
function controlarMusica() {
    const musica = document.getElementById('musica');
    if (musica.paused) {
        musica.play()
            .then(() => {
                this.innerHTML = '<i class="fas fa-pause"></i> Pausar';
            })
            .catch(e => {
                alert('Permita o áudio no navegador!');
            });
    } else {
        musica.pause();
        this.innerHTML = '<i class="fas fa-music"></i> Tocar';
    }
}
// ===== GALERIA INTERATIVA =====
function abrirFoto(src, legenda) {
    const modal = document.createElement('div');
    modal.className = 'modal-foto';
    modal.innerHTML = `
        <div class="modal-conteudo">
            <span class="fechar">&times;</span>
            <img src="${src}" alt="${legenda}">
            <p>${legenda}</p>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.fechar').onclick = () => modal.remove();
    modal.onclick = (e) => e.target === modal && modal.remove();
}

// Configura clique nas fotos
document.querySelectorAll('.foto-item img').forEach(img => {
    img.onclick = () => {
        const legenda = img.nextElementSibling.textContent;
        abrirFoto(img.src, legenda);
    };
});
// Configuração das fotos (no início do script.js)
const fotos = [
    { src: "assets/fotos/foto1.jpg", legenda: "Nosso primeiro encontro" },
    { src: "assets/fotos/foto2.jpg", legenda: "Fomos comprar brigadeiro no supermercado kkk" },
    { src: "assets/fotos/foto3.jpg", legenda: "Nossa primeira ida ao museu" },
    { src: "assets/fotos/foto4.jpg", legenda: "Nosso primeiro jantar" }
    // Adicione mais fotos aqui
];

// Função para carregar a galeria
function carregarGaleria() {
    const galeria = document.getElementById('galeria-container');
    
    fotos.forEach((foto, index) => {
        const item = document.createElement('div');
        item.className = 'foto-item';
        item.innerHTML = `
            <img src="${foto.src}" alt="Foto ${index + 1}" loading="lazy">
            <p class="legenda">${foto.legenda}</p>
        `;
        galeria.appendChild(item);
    });
}

// Chame esta função no DOMContentLoaded
document.addEventListener('DOMContentLoaded', carregarGaleria);
