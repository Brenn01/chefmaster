document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();
 
  // nav toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.style.display = expanded ? 'none' : 'flex';
  });
 
  // filters
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.card');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => {
      if (f === 'all' || card.dataset.category === f) card.style.display = '';
      else card.style.display = 'none';
    });
  }));
 
  // modal
  const modal = document.getElementById('dishModal');
  const dishName = document.getElementById('dishName');
  const dishDesc = document.getElementById('dishDesc');
  const dishPrice = document.getElementById('dishPrice');
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const addToCart = document.getElementById('addToCart');
 
  // Abrir modal ao clicar nos botões "Ver"
  document.querySelectorAll('.card .btn.small, .mini-card .btn.small').forEach(b => {
    b.addEventListener('click', (e) => {
      const data = JSON.parse(b.dataset.dish);
      dishName.textContent = data.name;
      dishDesc.textContent = data.desc;
      dishPrice.textContent = data.price;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
 
  // Fechar modal
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modalCancel.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
 
  addToCart.addEventListener('click', () => {
    // Simula adição ao pedido
    alert(dishName.textContent + ' adicionado ao pedido!');
    closeModal();
  });
 
  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const name = fd.get('name');
    const phone = fd.get('phone');
    alert('Obrigado, ' + name + '! Recebemos seu pedido/contato. Entraremos em contato pelo ' + phone + '.');
    contactForm.reset();
  });
});
