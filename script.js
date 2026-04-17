/* =========================================================
   LIFTVISION CONTROL - JAVASCRIPT PRINCIPAL
   Responsável por:
   - menu lateral responsivo
   - renderização de dados fictícios
   - busca de containers
   - filtros por status
   - atualização visual das tabelas e cards
========================================================= */

// =========================================================
// DADOS FICTÍCIOS DO SISTEMA
// =========================================================

// Lista de containers monitorados
const containersData = [
  {
    id: "CNT-2026-001",
    tipo: "Big Bag Mineral",
    horario: "07:20",
    local: "Pátio Norte",
    statusInspecao: "Liberado",
    statusEslinga: "OK",
    statusManilha: "Fechada",
    statusCinta: "OK",
    confianca: 98,
    pasta: "CNT-2026-001_2026-04-16",
    fotos: 6,
    statusOperacao: "Liberado"
  },
  {
    id: "CNT-2026-002",
    tipo: "Container Metálico",
    horario: "07:48",
    local: "Área de Carga 02",
    statusInspecao: "Alerta",
    statusEslinga: "Desgaste leve",
    statusManilha: "Fechada",
    statusCinta: "OK",
    confianca: 87,
    pasta: "CNT-2026-002_2026-04-16",
    fotos: 5,
    statusOperacao: "Alerta"
  },
  {
    id: "CNT-2026-003",
    tipo: "Bobinas Industriais",
    horario: "08:15",
    local: "Pátio Sul",
    statusInspecao: "Em análise",
    statusEslinga: "Verificando",
    statusManilha: "Verificando",
    statusCinta: "Verificando",
    confianca: 79,
    pasta: "CNT-2026-003_2026-04-16",
    fotos: 4,
    statusOperacao: "Em análise"
  },
  {
    id: "CNT-2026-004",
    tipo: "Big Bag Fertilizante",
    horario: "09:05",
    local: "Moega 01",
    statusInspecao: "Liberado",
    statusEslinga: "OK",
    statusManilha: "Fechada",
    statusCinta: "OK",
    confianca: 96,
    pasta: "CNT-2026-004_2026-04-16",
    fotos: 7,
    statusOperacao: "Liberado"
  },
  {
    id: "CNT-2026-005",
    tipo: "Carga Paletizada",
    horario: "09:42",
    local: "Área de Expedição",
    statusInspecao: "Alerta",
    statusEslinga: "OK",
    statusManilha: "Ajuste necessário",
    statusCinta: "OK",
    confianca: 84,
    pasta: "CNT-2026-005_2026-04-16",
    fotos: 3,
    statusOperacao: "Alerta"
  },
  {
    id: "CNT-2026-006",
    tipo: "Container Químico",
    horario: "10:10",
    local: "Setor Leste",
    statusInspecao: "Liberado",
    statusEslinga: "OK",
    statusManilha: "Fechada",
    statusCinta: "OK",
    confianca: 97,
    pasta: "CNT-2026-006_2026-04-16",
    fotos: 8,
    statusOperacao: "Liberado"
  }
];

// Lista de produtos/módulos do sistema
const produtosData = [
  {
    nome: "Módulo de Visão Computacional",
    codigo: "LVC-VIS-01",
    categoria: "Inspeção Inteligente",
    descricao:
      "Responsável por analisar imagens da carga e identificar padrões visuais de segurança em eslingas, manilhas e cintas.",
    status: "Ativo"
  },
  {
    nome: "Drone de Apoio ao Engate",
    codigo: "LVC-DRN-02",
    categoria: "Apoio Operacional",
    descricao:
      "Drone industrial utilizado para capturar ângulos estratégicos da operação e auxiliar na inspeção remota.",
    status: "Operacional"
  },
  {
    nome: "Painel de Operação Remota",
    codigo: "LVC-REM-03",
    categoria: "Controle",
    descricao:
      "Interface central para acompanhamento de inspeções, alertas de segurança e autorização de içamento.",
    status: "Ativo"
  },
  {
    nome: "Sistema de Catalogação de Imagens",
    codigo: "LVC-CAT-04",
    categoria: "Armazenamento",
    descricao:
      "Organiza as evidências visuais por container, horário e evento, facilitando rastreabilidade técnica.",
    status: "Sincronizado"
  },
  {
    nome: "Módulo de Validação de Segurança",
    codigo: "LVC-VAL-05",
    categoria: "Análise",
    descricao:
      "Cruza regras operacionais e dados detectados para aprovar, bloquear ou sinalizar uma operação.",
    status: "Ativo"
  },
  {
    nome: "Núcleo de Telemetria Industrial",
    codigo: "LVC-TEL-06",
    categoria: "Monitoramento",
    descricao:
      "Integra dados de sensores, horário, local e histórico da operação para visão consolidada do processo.",
    status: "Estável"
  },
  {
    nome: "Módulo de Registro de Turno",
    codigo: "LVC-LOG-07",
    categoria: "Rastreio",
    descricao:
      "Armazena inspeções realizadas por turno, operador, local e criticidade detectada na carga.",
    status: "Ativo"
  },
  {
    nome: "Painel Técnico de Auditoria",
    codigo: "LVC-AUD-08",
    categoria: "Gestão",
    descricao:
      "Ambiente voltado para consulta histórica, auditoria de inspeções e análise de evidências operacionais.",
    status: "Em implantação"
  }
];

// Pastas/fotos simuladas
const fotosData = [
  {
    pasta: "CNT-2026-001_2026-04-16",
    container: "CNT-2026-001",
    horario: "07:20",
    imagens: [
      "img_eslinga_01.jpg",
      "img_manilha_01.jpg",
      "img_cinta_01.jpg",
      "img_drone_topo_01.jpg",
      "img_lateral_01.jpg",
      "img_validacao_01.jpg"
    ]
  },
  {
    pasta: "CNT-2026-002_2026-04-16",
    container: "CNT-2026-002",
    horario: "07:48",
    imagens: [
      "img_eslinga_02.jpg",
      "img_manilha_02.jpg",
      "img_cinta_02.jpg",
      "img_drone_topo_02.jpg",
      "img_alerta_02.jpg"
    ]
  },
  {
    pasta: "CNT-2026-003_2026-04-16",
    container: "CNT-2026-003",
    horario: "08:15",
    imagens: [
      "img_eslinga_03.jpg",
      "img_manilha_03.jpg",
      "img_cinta_03.jpg",
      "img_analise_03.jpg"
    ]
  },
  {
    pasta: "CNT-2026-004_2026-04-16",
    container: "CNT-2026-004",
    horario: "09:05",
    imagens: [
      "img_eslinga_04.jpg",
      "img_manilha_04.jpg",
      "img_cinta_04.jpg",
      "img_drone_topo_04.jpg",
      "img_lateral_04.jpg",
      "img_validacao_04.jpg",
      "img_final_04.jpg"
    ]
  }
];

// =========================================================
// FUNÇÕES UTILITÁRIAS
// =========================================================

// Retorna a classe visual do badge conforme o status
function getStatusClass(status) {
  const normalized = status.toLowerCase();

  if (normalized.includes("liberado") || normalized.includes("ok") || normalized.includes("fechada") || normalized.includes("ativo") || normalized.includes("operacional") || normalized.includes("estável") || normalized.includes("sincronizado")) {
    return "success";
  }

  if (normalized.includes("alerta") || normalized.includes("desgaste") || normalized.includes("ajuste") || normalized.includes("implantação")) {
    return "warning";
  }

  if (normalized.includes("bloqueado") || normalized.includes("falha")) {
    return "danger";
  }

  return "neutral";
}

// Gera badge HTML
function createBadge(text) {
  return `<span class="badge ${getStatusClass(text)}">${text}</span>`;
}

// Função de comparação textual para busca
function includesSearch(value, search) {
  return String(value).toLowerCase().includes(search.toLowerCase());
}

// =========================================================
// MENU RESPONSIVO
// =========================================================

function setupMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
}

// =========================================================
// DASHBOARD
// =========================================================

function renderDashboardStats() {
  const statsContainer = document.getElementById("dashboardStats");
  if (!statsContainer) return;

  const inspecoes = containersData.length;
  const liberados = containersData.filter(item => item.statusOperacao === "Liberado").length;
  const alertas = containersData.filter(item => item.statusOperacao === "Alerta").length;
  const analise = containersData.filter(item => item.statusOperacao === "Em análise").length;

  const stats = [
    {
      label: "Inspeções do turno",
      value: inspecoes,
      detail: "Total de operações registradas"
    },
    {
      label: "Containers liberados",
      value: liberados,
      detail: "Cargas aptas para içamento"
    },
    {
      label: "Alertas",
      value: alertas,
      detail: "Itens com necessidade de atenção"
    },
    {
      label: "Em análise",
      value: analise,
      detail: "Operações aguardando validação"
    }
  ];

  statsContainer.innerHTML = stats
    .map(
      stat => `
      <div class="stat-card">
        <div class="stat-label">${stat.label}</div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-detail">${stat.detail}</div>
      </div>
    `
    )
    .join("");
}

function renderDashboardTable(filteredData = containersData) {
  const tableBody = document.getElementById("dashboardTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = filteredData
    .map(
      item => `
      <tr>
        <td><strong>${item.id}</strong></td>
        <td>${item.tipo}</td>
        <td>${item.horario}</td>
        <td>${item.local}</td>
        <td>${createBadge(item.statusInspecao)}</td>
        <td>${createBadge(item.statusEslinga)}</td>
        <td>${createBadge(item.statusManilha)}</td>
        <td>${createBadge(item.statusCinta)}</td>
        <td>${item.confianca}%</td>
      </tr>
    `
    )
    .join("");
}

function setupDashboardSearch() {
  const searchInput = document.getElementById("dashboardSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", (event) => {
    const search = event.target.value.trim().toLowerCase();

    const filtered = containersData.filter(item =>
      includesSearch(item.id, search) ||
      includesSearch(item.tipo, search) ||
      includesSearch(item.local, search) ||
      includesSearch(item.statusInspecao, search) ||
      includesSearch(item.statusEslinga, search) ||
      includesSearch(item.statusManilha, search) ||
      includesSearch(item.statusCinta, search)
    );

    renderDashboardTable(filtered);
  });
}

// =========================================================
// PRODUTOS
// =========================================================

function renderProdutos() {
  const produtosGrid = document.getElementById("produtosGrid");
  if (!produtosGrid) return;

  produtosGrid.innerHTML = produtosData
    .map(
      produto => `
      <article class="product-card">
        <div class="product-meta">
          <span class="meta-chip">${produto.codigo}</span>
          <span class="meta-chip">${produto.categoria}</span>
        </div>

        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>

        <div>${createBadge(produto.status)}</div>
      </article>
    `
    )
    .join("");
}

// =========================================================
// CONTAINERS
// =========================================================

let currentFilter = "todos";

function renderContainersTable(data = containersData) {
  const tableBody = document.getElementById("containersTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = data
    .map(
      item => `
      <tr>
        <td><strong>${item.id}</strong></td>
        <td>${item.tipo}</td>
        <td>${item.local}</td>
        <td>${item.horario}</td>
        <td>${item.pasta}</td>
        <td>${item.fotos}</td>
        <td>${createBadge(item.statusOperacao)}</td>
        <td>${item.confianca}%</td>
      </tr>
    `
    )
    .join("");
}

function filterContainers() {
  const searchInput = document.getElementById("containerSearch");
  if (!searchInput) return;

  const search = searchInput.value.trim().toLowerCase();

  let filtered = containersData.filter(item => {
    const matchesSearch =
      includesSearch(item.id, search) ||
      includesSearch(item.tipo, search) ||
      includesSearch(item.local, search) ||
      includesSearch(item.horario, search) ||
      includesSearch(item.pasta, search);

    const matchesFilter =
      currentFilter === "todos" ||
      item.statusOperacao.toLowerCase() === currentFilter;

    return matchesSearch && matchesFilter;
  });

  renderContainersTable(filtered);
}

function setupContainersPage() {
  const searchInput = document.getElementById("containerSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (searchInput) {
    searchInput.addEventListener("input", filterContainers);
  }

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter;
        filterContainers();
      });
    });
  }
}

// =========================================================
// FOTOS
// =========================================================

function renderFotos() {
  const fotosGrid = document.getElementById("fotosGrid");
  if (!fotosGrid) return;

  fotosGrid.innerHTML = fotosData
    .map(folder => `
      <section class="folder-card">
        <div class="folder-header">
          <div class="folder-info">
            <h3>${folder.pasta}</h3>
            <p><strong>Container:</strong> ${folder.container}</p>
            <p><strong>Horário:</strong> ${folder.horario}</p>
            <p><strong>Total de imagens:</strong> ${folder.imagens.length}</p>
          </div>

          <div class="folder-tag">Pasta Técnica</div>
        </div>

        <div class="image-grid">
          ${folder.imagens
            .map(
              imagem => `
                <div class="image-card">
                  <div class="image-preview">📷</div>
                  <div class="image-name">${imagem}</div>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
    `)
    .join("");
}

// =========================================================
// INICIALIZAÇÃO GERAL
// =========================================================

function initPage() {
  setupMenu();

  // Renderizações compartilhadas
  renderDashboardStats();
  renderDashboardTable();
  renderProdutos();
  renderContainersTable();
  renderFotos();

  // Eventos
  setupDashboardSearch();
  setupContainersPage();
}

// Executa quando a página terminar de carregar
document.addEventListener("DOMContentLoaded", initPage);