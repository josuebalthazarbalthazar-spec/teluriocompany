// ...new file...
document.addEventListener('click', function (e) {
    // Abrir modal ao clicar em prox-card ou seu CTA
    const proxCard = e.target.closest('.prox-card');
    if (proxCard) {
        e.preventDefault();
        abrirModalProx(proxCard);
    }

    // fechar modal
    if (e.target.matches('#modalProximos .modal-close') || e.target.matches('#modalProximos[aria-hidden="false"]')) {
        fecharModalProx();
    }
});

function abrirModalProx(card) {
    const modal = document.getElementById('modalProximos');
    if (!modal) return;

    const img = card.querySelector('img') ? card.querySelector('img').getAttribute('src') : '';
    const title = card.querySelector('h4') ? card.querySelector('h4').textContent.trim() : (card.querySelector('.modal-prox-title')?.textContent || 'Evento');
    const meta = card.querySelector('.meta') ? card.querySelector('.meta').textContent.trim() : '';
    const desc = card.querySelector('.meta') ? card.querySelector('.meta').textContent.trim() : '';

    modal.querySelector('.modal-prox-img').src = img || '';
    modal.querySelector('.modal-prox-img').alt = title;
    modal.querySelector('.modal-prox-title').textContent = title;
    modal.querySelector('.modal-prox-desc').textContent = desc;
    const metaUl = modal.querySelector('.modal-prox-meta');
    metaUl.innerHTML = '';
    if (meta) {
        // quebra por linhas se existir
        meta.split('•').forEach(line => {
            if (line.trim()) {
                const li = document.createElement('li');
                li.textContent = line.trim();
                metaUl.appendChild(li);
            }
        });
    }

    // ligar CTA do modal ao botão do card original se existir
    const originalBtn = card.dataset.originBtnSelector ? document.querySelector(card.dataset.originBtnSelector) : null;
    const modalCta = modal.querySelector('.modal-prox-cta');
    modalCta.removeAttribute('onclick');
    if (originalBtn) {
        modalCta.onclick = function (ev) { ev.preventDefault(); originalBtn.click(); fecharModalProx(); };
    } else {
        modalCta.onclick = function (ev) { ev.preventDefault(); fecharModalProx(); };
    }

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function fecharModalProx() {
    const modal = document.getElementById('modalProximos');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
    const proxContainer = document.getElementById('proxContainer');
    const modal = document.getElementById('modalProximos');
    const imgEl = modal?.querySelector('.modal-prox-img');
    const titleEl = modal?.querySelector('.modal-prox-title');
    const descEl = modal?.querySelector('.modal-prox-desc');
    const metaEl = modal?.querySelector('.modal-prox-meta');
    const ctaEl = modal?.querySelector('.modal-prox-cta');
    const closeBtn = modal?.querySelector('.modal-close');
    const prevBtn = modal?.querySelector('.modal-arrow.prev');
    const nextBtn = modal?.querySelector('.modal-arrow.next');

    if (!proxContainer || !modal) return;

    const proxCards = Array.from(proxContainer.querySelectorAll('.prox-card'));
    if (!proxCards.length) return;

    let currentIndex = 0;

    function showModalAt(index) {
        if (index < 0) index = proxCards.length - 1;
        if (index >= proxCards.length) index = 0;
        currentIndex = index;

        const card = proxCards[currentIndex];
        const img = card.querySelector('img')?.getAttribute('src') || '';
        const title = card.querySelector('h4')?.textContent.trim() || 'Evento';
        const meta = card.querySelector('.meta')?.textContent.trim() || '';
        const desc = card.querySelector('.meta')?.textContent.trim() || '';

        if (imgEl) { imgEl.src = img; imgEl.alt = title; }
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = desc;
        if (metaEl) {
            metaEl.innerHTML = '';
            meta.split('•').forEach(line => {
                if (line.trim()) {
                    const li = document.createElement('li');
                    li.textContent = line.trim();
                    metaEl.appendChild(li);
                }
            });
        }

        // associar CTA do modal ao botão do card original se existir
        const originBtnSelector = card.dataset.originBtnSelector;
        const originalBtn = originBtnSelector ? document.querySelector(originBtnSelector) : null;
        if (ctaEl) {
            ctaEl.onclick = function (ev) {
                ev.preventDefault();
                if (originalBtn) originalBtn.click();
                closeModal();
            };
        }

        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // abrir modal ao clicar no prox-card ou seu CTA
    proxCards.forEach((card, idx) => {
        card.addEventListener('click', function (e) {
            // evita ativar quando clicar em um link interno da card
            if (e.target.closest('.cta')) return;
            showModalAt(idx);
        });
        const cta = card.querySelector('.cta');
        if (cta) cta.addEventListener('click', function (ev) {
            ev.preventDefault();
            showModalAt(idx);
        });
    });

    // setas e fechamento
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); showModalAt(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); showModalAt(currentIndex + 1); });

    // fechar ao clicar fora da caixa
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    // navegação por teclado
    document.addEventListener('keydown', function (e) {
        if (modal.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'ArrowLeft') showModalAt(currentIndex - 1);
            if (e.key === 'ArrowRight') showModalAt(currentIndex + 1);
            if (e.key === 'Escape') closeModal();
        }
    });
});