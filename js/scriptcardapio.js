document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll("#menuGrid .card"));
  const filters = document.querySelectorAll(".filter");
 
  // === Botão Mostrar Mais ===
  const showMoreBtn = document.createElement("button");
  showMoreBtn.textContent = "Mostrar mais";
  showMoreBtn.classList.add("btn", "show-more");  // Adicionando a classe show-more
  const menuGrid = document.getElementById("menuGrid");
  menuGrid.after(showMoreBtn);
 
  let cardsVisible = 6; // inicial
  let showAll = false;
 
  function updateCards(filter = "all", showAllParam = false) {
    let count = 0;
    cards.forEach(card => {
      const category = card.dataset.category;
      if ((filter === "all" || category === filter) && (showAllParam || count < cardsVisible)) {
        card.style.display = "block";
        count++;
      } else {
        card.style.display = "none";
      }
    });
 
    // Mostrar/esconder botão Mostrar Mais
    const filteredCards = filter === "all" ? cards : cards.filter(c => c.dataset.category === filter);
    showMoreBtn.style.display = (filteredCards.length > cardsVisible && !showAllParam) ? "block" : "none";
  }
 
  // Inicial
  updateCards();
 
  // === Filtros ===
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showAll = false;
      updateCards(btn.dataset.filter);
    });
  });
 
  // === Mostrar Mais ===
  showMoreBtn.addEventListener("click", () => {
    showAll = true;
    const activeFilter = document.querySelector(".filter.active").dataset.filter;
    updateCards(activeFilter, true);
    showMoreBtn.style.display = "none";
  });

  // === Modal único para todos os pratos ===
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img id="modalImg" src="" alt="" style="width:100%; border-radius:8px; margin-bottom:1rem;">
      <h2 id="modalName"></h2>
      <p><strong>Preço:</strong> <span id="modalPrice"></span></p>
      <p id="modalDesc"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("#modalImg");
  const modalName = modal.querySelector("#modalName");
  const modalDesc = modal.querySelector("#modalDesc");
  const modalPrice = modal.querySelector("#modalPrice");
  const modalClose = modal.querySelector(".close");

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // === Abrir modal ao clicar em "Ver" ===
  function attachModalEvents() {
    const buttons = document.querySelectorAll("#menuGrid .card button");
    buttons.forEach(btn => {
      btn.onclick = () => {
        const card = btn.closest(".card");
        const dish = JSON.parse(btn.dataset.dish);
        const imgSrc = card.querySelector("img").src;

        modalImg.src = imgSrc;
        modalImg.alt = dish.name;
        modalName.textContent = dish.name;
        modalDesc.textContent = dish.desc;
        modalPrice.textContent = dish.price;

        modal.style.display = "flex";
      };
    });
  }

  attachModalEvents();
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("dishModal");
  const dishName = document.getElementById("dishName");
  const dishPrice = document.getElementById("dishPrice");
  const dishDesc = document.getElementById("dishDesc");
  const closeBtn = document.getElementById("closeModal");
 
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
 
  const verButtons = document.querySelectorAll(".card-actions .btn");
 
  verButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const dish = JSON.parse(btn.dataset.dish);
      dishName.textContent = dish.name;
      dishPrice.textContent = dish.price;
      dishDesc.textContent = dish.desc;
      modal.style.display = "flex";
    });
  });
});