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
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentSlide = 0;

function showSlide(n) {
  carouselItems[currentSlide].classList.remove('active');
  currentSlide = (n + carouselItems.length) % carouselItems.length;
  carouselItems[currentSlide].classList.add('active');
}

prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
function showSlide(n) {
  carouselItems[currentSlide].classList.remove('active');
  currentSlide = (n + carouselItems.length) % carouselItems.length;
  carouselItems[currentSlide].classList.add('active');
}

prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

document.querySelector('.carousel-arrow.prev').addEventListener('click', () => moveCarousel(-1));
document.querySelector('.carousel-arrow.next').addEventListener('click', () => moveCarousel(1));

function filtrarEventos() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card-evento');

    cards.forEach(card => {
        const h3 = card.querySelector('h3').textContent.toLowerCase();
        const p = card.querySelector('p').textContent.toLowerCase();
        const ul = card.querySelector('ul').textContent.toLowerCase();

        if (h3.includes(searchInput) || p.includes(searchInput) || ul.includes(searchInput)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}