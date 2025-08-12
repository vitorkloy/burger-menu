const body = document.querySelector("body"),
  menu = document.getElementById("menu"),
  cartModal = document.getElementById("cart-modal"),
  cartTotal = document.getElementById("cart-total"),
  checkoutBtn = document.getElementById("checkout-btn"),
  openCartModal = document.getElementById("open-cart-modal"),
  closeCartModal = document.getElementById("close-cart-modal"),
  cartItemsContainer = document.getElementById("cart-items"),
  cartCounter = document.getElementById("cart-count"),
  adressInput = document.getElementById("adress"),
  adressWarn = document.getElementById("adress-warn");

openCartModal.onclick = function () {
  cartModal.style.display = "flex";
  body.style.overflow = "hidden";
};

closeCartModal.onclick = function () {
  cartModal.style.display = "none";
  body.style.overflow = "auto";
};

cartModal.addEventListener("click", function(event){
    if(event.target = cartModal) {
        cartModal.style.display = "none";
        body.style.overflow = "auto";
    }
})
