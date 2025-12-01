document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modalPorcao');
  const closeModal = document.querySelector('.close');
  
  // Pegando todos os botões "Ver"
  const verBtns = document.querySelectorAll('.ver-btn');
  
  // Função que será executada ao clicar em um botão "Ver"
  verBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const dishData = JSON.parse(this.getAttribute('data-dish')); // Recupera os dados do prato
      
      // Preenche as informações no modal
      document.getElementById('modalName').innerText = dishData.name;
      document.getElementById('modalPrice').innerText = dishData.price;
      document.getElementById('modalDesc').innerText = dishData.desc;
      document.getElementById('modalImg').src = this.previousElementSibling.src; // Foto do prato

      // Exibe o modal
      modal.style.display = 'block';
    });
  });

  // Função para fechar o modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Fechar o modal ao clicar fora dele
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
