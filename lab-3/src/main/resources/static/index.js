
const API_URL = "/hamburgueria";

// Elementos da página
const burgerList = document.getElementById("burger-list");
const totalCount = document.getElementById("total-count");
const visibleCount = document.getElementById("visible-count");
const listCount = document.getElementById("list-count");
const searchInput = document.getElementById("search");
const errorBanner = document.getElementById("error-banner");

const statusDot = document.getElementById("status-dot");
const connectionText = document.getElementById("connection-text");

const formModal = document.getElementById("form-modal");
const burgerForm = document.getElementById("burger-form");
const burgerName = document.getElementById("burger-name");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const idHint = document.getElementById("id-hint");
const saveButton = document.getElementById("save-button");

const deleteModal = document.getElementById("delete-modal");
const deleteDescription = document.getElementById("delete-description");
const confirmDelete = document.getElementById("confirm-delete");

const toast = document.getElementById("toast");

let hamburgueres = [];
let editingId = null;
let deletingId = null;
let saving = false;
let deleting = false;
let toastTimer;

// Comunicação com a API
async function apiRequest(path = "", options = {}) {
    const response = await fetch(API_URL + path, {
        ...options,
        headers: {
            "Accept": "application/json",
            ...(options.body ? {
                "Content-Type": "application/json"
            } : {}),
            ...options.headers
        }
    });

    if (!response.ok) {
        let detalhe = "";

        try {
            const erro = await response.json();
            detalhe = erro.message || erro.error || "";
        } catch (_) {
            // Resposta sem JSON
        }

        throw new Error(
            detalhe || `Erro HTTP ${response.status}`
        );
    }

    if (response.status === 204) {
        return null;
    }

    const texto = await response.text();

    return texto ? JSON.parse(texto) : null;
}

// Indicador de conexão
function setConnection(online) {
    statusDot.classList.toggle("online", online);
    statusDot.classList.toggle("offline", !online);

    connectionText.textContent = online
        ? "API conectada"
        : "API indisponível";
}

// Notificações
function showToast(message, isError = false) {
    clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.remove("hidden");

    toastTimer = setTimeout(() => {
        toast.classList.add("hidden");
    }, 3500);
}

function showError(message) {
    errorBanner.textContent = message;
    errorBanner.classList.remove("hidden");
}

function clearError() {
    errorBanner.classList.add("hidden");
    errorBanner.textContent = "";
}

// Proteção ao exibir textos vindos do banco
function escapeHtml(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]
    );
}

// GET - Buscar todos os hambúrgueres
async function carregarHamburgueres() {
    burgerList.innerHTML =
        '<div class="empty">Carregando hambúrgueres...</div>';

    clearError();

    try {
        const dados = await apiRequest();

        if (!Array.isArray(dados)) {
            throw new Error("A API não retornou uma lista.");
        }

        hamburgueres = dados;

        setConnection(true);
        renderizarHamburgueres();

    } catch (error) {
        hamburgueres = [];
        setConnection(false);

        burgerList.innerHTML = `
            <div class="empty">
                Não foi possível carregar o cardápio.
            </div>
        `;

        atualizarContadores(0);

        showError(
            "Erro ao consultar o Oracle pelo Spring Boot: " +
            error.message
        );
    }
}

// Contadores
function atualizarContadores(visiveis) {
    totalCount.textContent = hamburgueres.length;
    visibleCount.textContent = visiveis;
    listCount.textContent = `(${hamburgueres.length})`;
}

// Montar os cards do cardápio
function renderizarHamburgueres() {
    const busca = searchInput.value.trim().toLowerCase();

    const filtrados = hamburgueres.filter(h => {
        return (
            String(h.name ?? "").toLowerCase().includes(busca) ||
            String(h.id ?? "").toLowerCase().includes(busca)
        );
    });

    atualizarContadores(filtrados.length);

    if (filtrados.length === 0) {
        burgerList.innerHTML = `
            <div class="empty">
                ${busca
                    ? "Nenhum hambúrguer encontrado nessa busca."
                    : "Nenhum hambúrguer cadastrado. Adicione o primeiro!"}
            </div>
        `;
        return;
    }

    burgerList.innerHTML = filtrados.map(h => `
        <article class="burger-card">
            <div class="burger-card-icon">🍔</div>

            <div class="burger-info">
                <h3>${escapeHtml(h.name)}</h3>
                <p>ID: ${escapeHtml(h.id)}</p>
            </div>

            <div class="burger-actions">
                <button
                    type="button"
                    class="action-button"
                    data-action="edit"
                    data-id="${escapeHtml(h.id)}"
                >
                    ✎ Editar
                </button>

                <button
                    type="button"
                    class="action-button delete"
                    data-action="delete"
                    data-id="${escapeHtml(h.id)}"
                >
                    ♜ Excluir
                </button>
            </div>
        </article>
    `).join("");
}

// Abrir formulário de cadastro
function abrirCadastro() {
    editingId = null;

    burgerForm.reset();

    modalTitle.textContent = "Novo hambúrguer";
    modalDescription.textContent =
        "Adicione uma nova criação ao seu cardápio.";

    idHint.textContent =
        "O identificador será gerado automaticamente.";

    saveButton.textContent = "Salvar hambúrguer ↗";

    formModal.classList.remove("hidden");
    burgerName.focus();
}

// Abrir formulário de edição
function abrirEdicao(id) {
    const h = hamburgueres.find(item => item.id === id);

    if (!h) {
        showToast("Hambúrguer não encontrado.", true);
        return;
    }

    editingId = id;

    burgerName.value = h.name;

    modalTitle.textContent = "Editar hambúrguer";
    modalDescription.textContent =
        "Atualize o nome do hambúrguer selecionado.";

    idHint.textContent = "ID preservado: " + h.id;
    saveButton.textContent = "Salvar alterações ↗";

    formModal.classList.remove("hidden");
    burgerName.focus();
    burgerName.select();
}

function fecharFormulario() {
    if (saving) return;

    formModal.classList.add("hidden");
    editingId = null;
}

// POST e PUT - Salvar hambúrguer
async function salvarHamburguer(event) {
    event.preventDefault();

    if (saving) return;

    const name = burgerName.value.trim();

    if (!name) {
        showToast("Informe o nome do hambúrguer.", true);
        return;
    }

    if (name.length > 100) {
        showToast("O nome deve ter até 100 caracteres.", true);
        return;
    }

    saving = true;
    saveButton.disabled = true;
    saveButton.textContent = "Salvando...";

    const isEditing = editingId !== null;

    try {
        if (isEditing) {
            // PUT - Atualizar registro existente
            await apiRequest(
                "/" + encodeURIComponent(editingId),
                {
                    method: "PUT",
                    body: JSON.stringify({ name })
                }
            );

            showToast("Hambúrguer atualizado com sucesso!");

        } else {
            // POST - Criar novo registro
            await apiRequest("", {
                method: "POST",
                body: JSON.stringify({ name })
            });

            showToast("Hambúrguer cadastrado com sucesso!");
        }

        formModal.classList.add("hidden");
        editingId = null;

        await carregarHamburgueres();

    } catch (error) {
        showToast("Erro ao salvar: " + error.message, true);
    } finally {
        saving = false;
        saveButton.disabled = false;
        saveButton.textContent = editingId
            ? "Salvar alterações ↗"
            : "Salvar hambúrguer ↗";
    }
}

// Abrir confirmação de exclusão
function abrirExclusao(id) {
    const h = hamburgueres.find(item => item.id === id);

    if (!h) {
        showToast("Hambúrguer não encontrado.", true);
        return;
    }

    deletingId = id;

    deleteDescription.textContent =
        `Deseja excluir "${h.name}"? ` +
        "O registro será removido do Oracle.";

    deleteModal.classList.remove("hidden");
}

function fecharExclusao() {
    if (deleting) return;

    deletingId = null;
    deleteModal.classList.add("hidden");
}

// DELETE - Excluir do banco
async function excluirHamburguer() {
    if (!deletingId || deleting) return;

    deleting = true;
    confirmDelete.disabled = true;
    confirmDelete.textContent = "Excluindo...";

    try {
        await apiRequest(
            "/" + encodeURIComponent(deletingId),
            { method: "DELETE" }
        );

        deleteModal.classList.add("hidden");
        deletingId = null;

        showToast("Hambúrguer excluído com sucesso!");

        await carregarHamburgueres();

    } catch (error) {
        showToast("Erro ao excluir: " + error.message, true);
    } finally {
        deleting = false;
        confirmDelete.disabled = false;
        confirmDelete.textContent = "Sim, excluir";
    }
}

// Eventos dos botões
document.getElementById("hero-add")
    .addEventListener("click", abrirCadastro);

document.getElementById("add-button")
    .addEventListener("click", abrirCadastro);

document.getElementById("refresh-button")
    .addEventListener("click", carregarHamburgueres);

document.getElementById("close-form")
    .addEventListener("click", fecharFormulario);

document.getElementById("cancel-form")
    .addEventListener("click", fecharFormulario);

document.getElementById("close-delete")
    .addEventListener("click", fecharExclusao);

document.getElementById("cancel-delete")
    .addEventListener("click", fecharExclusao);

document.getElementById("confirm-delete")
    .addEventListener("click", excluirHamburguer);

burgerForm.addEventListener("submit", salvarHamburguer);

searchInput.addEventListener("input", renderizarHamburgueres);

// Delegação de eventos para os cards
burgerList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    if (action === "edit") {
        abrirEdicao(id);
    }

    if (action === "delete") {
        abrirExclusao(id);
    }
});

// Fechar modais ao clicar fora
formModal.addEventListener("click", event => {
    if (event.target === formModal) fecharFormulario();
});

deleteModal.addEventListener("click", event => {
    if (event.target === deleteModal) fecharExclusao();
});

// Fechar com Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        fecharFormulario();
        fecharExclusao();
    }
});

// Inicialização
carregarHamburgueres();
