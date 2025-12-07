function abrirModal() {
    document.getElementById("modalIngresso").style.display = "flex";
    calcularTotal();
}

function fecharModal() {
    document.getElementById("modalIngresso").style.display = "none";
}

function calcularTotal() {
    const tipo = document.getElementById("tipo").value;
    const qtd = document.getElementById("qtd").value;
    const total = tipo * qtd;

    document.getElementById("valorTotal").innerText =
        "R$" + total.toLocaleString("pt-BR");
}

function finalizarCompra() {
    alert("Compra finalizada com sucesso!\nObrigado pela preferência!");
    fecharModal();
}

window.onclick = (e) => {
    const modal = document.getElementById("modalIngresso");
    if (e.target === modal) fecharModal();
};
