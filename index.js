// Création du panier
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le panier vide
    let cart = [];
    
    // Création de l'élément du panier dans la navigation
    const navUl = document.querySelector('nav ul');
    const cartLi = document.createElement('li');
    cartLi.className = 'cart-icon';
    
    // Créer l'icône du panier avec un compteur
    const cartLink = document.createElement('a');
    cartLink.href = '#cart';
    cartLink.innerHTML = '<i class="fa-solid fa-basket-shopping"></i> <span class="cart-count">0</span>';
    cartLi.appendChild(cartLink);
    navUl.appendChild(cartLi);
    
    // Créer la section du panier (initialement cachée)
    const main = document.querySelector('main');
    const cartSection = document.createElement('section');
    cartSection.id = 'cart-section';
    cartSection.className = 'container';
    cartSection.style.display = 'none';
    
    cartSection.innerHTML = `
      <h2>Votre Panier</h2>
      <div id="cart-items" class="section-items">
        <!-- Les éléments du panier seront ajoutés ici -->
      </div>
      <div class="cart-total">
        <p>Total d'articles: <span id="total-items">0</span></p>
        <button id="clear-cart">Vider le panier</button>
      </div>
    `;
    
    main.appendChild(cartSection);
    
    // Ajout des écouteurs d'événements aux boutons "Ajouter au panier"
    const addToCartButtons = document.querySelectorAll('.card button');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Trouver la carte parente
        const card = this.closest('.card');
        
        // Récupérer les informations de la carte
        const imgSrc = card.querySelector('img').src;
        const name = card.querySelector('h3').textContent.split(':')[1].trim();
        
        // Ajouter l'article au panier
        addToCart({ name, imgSrc });
        
        // Afficher une notification
        showNotification(`${name} a été ajouté au panier`);
      });
    });
    
    // Fonction pour ajouter un article au panier
    function addToCart(item) {
      cart.push(item);
      updateCartDisplay();
    }
    
    // Mise à jour de l'affichage du panier
    function updateCartDisplay() {
      // Mettre à jour le compteur
      const cartCount = document.querySelector('.cart-count');
      cartCount.textContent = cart.length;
      
      // Mettre à jour la liste des articles dans le panier
      const cartItems = document.getElementById('cart-items');
      cartItems.innerHTML = '';
      
      cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.name}" style="width: 50px; height: 50px;">
          <p>${item.name}</p>
          <button class="remove-item" data-index="${index}">Supprimer</button>
        `;
        cartItems.appendChild(cartItem);
      });
      
      // Mettre à jour le total
      document.getElementById('total-items').textContent = cart.length;
      
      // Ajout des écouteurs d'événements aux boutons de suppression
      const removeButtons = document.querySelectorAll('.remove-item');
      removeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          removeFromCart(index);
        });
      });
    }
    
    // Fonction pour supprimer un article du panier
    function removeFromCart(index) {
      const removedItem = cart[index];
      cart.splice(index, 1);
      updateCartDisplay();
      showNotification(`${removedItem.name} a été retiré du panier`);
    }
    
    // Ajouter un écouteur d'événements au bouton "Vider le panier"
    document.getElementById('clear-cart').addEventListener('click', function() {
      cart = [];
      updateCartDisplay();
      showNotification('Le panier a été vidé');
    });
    
    // Basculer l'affichage du panier lors du clic sur l'icône
    cartLink.addEventListener('click', function(e) {
      e.preventDefault();
      const cartSection = document.getElementById('cart-section');
      const mainSection = document.querySelector('main .section-items').parentElement;
      
      if (cartSection.style.display === 'none') {
        mainSection.style.display = 'none';
        cartSection.style.display = 'block';
      } else {
        cartSection.style.display = 'none';
        mainSection.style.display = 'block';
      }
    });
    
    // Fonction pour afficher une notification
    function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(notification);
      
      // Afficher la notification
      setTimeout(() => {
        notification.style.opacity = '1';
      }, 10);
      
      // Faire disparaître la notification après 3 secondes
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
  });