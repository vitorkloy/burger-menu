const body = document.querySelector("body"),
  menu = document.getElementById("menu"),
  cartModal = document.getElementById("cart-modal"),
  cartTotal = document.getElementById("cart-total"),
  checkoutBtn = document.getElementById("checkout-btn"),
  openCartModal = document.getElementById("open-cart-modal"),
  closeCartModal = document.getElementById("close-cart-modal"),
  cartItemsContainer = document.getElementById("cart-items"),
  cartCounter = document.getElementById("cart-count"),
  addressInput = document.getElementById("address"),
  addressWarn = document.getElementById("address-warn");

let cart = []

openCartModal.onclick = function () {
  updateCartModal();
  cartModal.style.display = "flex";
  body.style.overflow = "hidden";
};

closeCartModal.onclick = function () {
  cartModal.style.display = "none";
  body.style.overflow = "auto";
};

cartModal.addEventListener("click", function(event) {
  if(event.target === cartModal) {
      cartModal.style.display = "none";
      body.style.overflow = "auto";
  };
});

menu.addEventListener("click", function(event) {
  let parentBtn = event.target.closest(".add-to-cart-btn");
  
  if(parentBtn) {
    const name = parentBtn.getAttribute("data-name");
    const price = parseFloat(parentBtn.getAttribute("data-price") );

    addToCart(name, price);
  };
});

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if(existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  };

  updateCartModal();

};

function updateCartModal(){
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const carItemElement = document.createElement("div");
    carItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

    carItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p lass="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
      
        <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
        
      </div>
    `;

    total += item.price * item.quantity;

    
    cartItemsContainer.appendChild(carItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  cartCounter.innerHTML = cart.length;
};

cartItemsContainer.addEventListener("click", function (event) {
  if(event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  };
})

function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name);

  if(index !== -1) {
    const item = cart[index];
    
    if(item.quantity > 1) {
      item.quantity -=1;
      updateCartModal();
      return;
    } 

    cart.splice(index, 1);
    updateCartModal();

  };
};

addressInput.addEventListener("input", function(event) {
   let inputValue = event.target.value;

  if(inputValue !== "") {
    addressInput.classList.remove("border-red")
    addressWarn.classList.add("hidden")
  };
});

checkoutBtn.addEventListener("click", function() {
  const isOpen = checkRestaurantOpen();
  if(!isOpen) {
    Toastify({
      text: "Ops o restaurante está fechado!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast();
  };

  if(cart.length === 0) return;
  if(addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  };

  //Enviar o pedido para api whats
  const cartItems = cart.map((item) => {
    return (
      `${item.name} - Quantidade: (${item.quantity}) Preço: R$${item.price} | `
    )
  }).join("")

  const message = encodeURIComponent(cartItems)
  const phone = "12974014736"

  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value} `, "_blank");

  cart = [];
  updateCartModal();
});


function checkRestaurantOpen() {
  const date = new Date();
  const hour = date.getHours();
  return hour >= 18 && hour< 23;

}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if(isOpen){
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")
} else {
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-500")
}

