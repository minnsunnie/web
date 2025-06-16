document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceEl = document.getElementById("total-price");
  const cartCount = document.querySelector(".cart-count");

  const modal = document.getElementById("confirm-modal");
  const modalMessage = document.getElementById("confirm-message");
  const btnYes = document.getElementById("confirm-yes");
  const btnNo = document.getElementById("confirm-no");
  let confirmCallback = null;

  function showConfirm(message, callback) {
    modalMessage.textContent = message;
    modal.style.display = "flex";
    confirmCallback = callback;
  }

  btnYes.addEventListener("click", function () {
    modal.style.display = "none";
    if (confirmCallback) confirmCallback(true);
    confirmCallback = null;
  });

  btnNo.addEventListener("click", function () {
    modal.style.display = "none";
    if (confirmCallback) confirmCallback(false);
    confirmCallback = null;
  });

  function formatCurrency(number) {
    if (isNaN(number)) return "₫0";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(number);
  }

  function updateCartCount(cart) {
    const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
    if (cartCount) cartCount.textContent = totalItems;
  }

  function getCartData() {
    try {
      const stored = JSON.parse(localStorage.getItem("cart"));
      if (Array.isArray(stored)) {
        return stored.filter(item =>
          item.id && item.name && item.image &&
          !isNaN(parseInt(item.price)) &&
          !isNaN(parseInt(item.quantity))
        );
      }
    } catch (e) {
      console.warn("❌ Lỗi đọc cart:", e);
    }
    return [];
  }

  function renderCart() {
    const cart = getCartData();
    cartContainer.innerHTML = "";
    totalPriceEl.textContent = formatCurrency(0);

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>🛒 Giỏ hàng trống.</p>";
      updateCartCount([]);
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const price = parseInt(item.price);
      let quantity = parseInt(item.quantity);
      if (quantity < 1) quantity = 1;

      const itemTotal = quantity * price;
      total += itemTotal;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="thumb" />
        <div class="item-info">
          <a href="#">${item.name}</a>
          <p>${formatCurrency(price)}</p>
        </div>
        <div class="item-quantity">
          <button class="decrease" data-index="${index}">-</button>
          <span>${quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
        <div class="item-total">${formatCurrency(itemTotal)}</div>
        <button class="remove-item" data-index="${index}">❌</button>
      `;
      cartContainer.appendChild(div);
    });

    totalPriceEl.textContent = formatCurrency(total);
    updateCartCount(cart);
  }

  cartContainer.addEventListener("click", function (e) {
    let cart = getCartData();
    const index = parseInt(e.target.dataset.index);
    if (isNaN(index) || !cart[index]) return;

    if (e.target.classList.contains("increase")) {
      cart[index].quantity = (parseInt(cart[index].quantity) || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }

    else if (e.target.classList.contains("decrease")) {
      let newQuantity = parseInt(cart[index].quantity) - 1;
      if (newQuantity <= 0) {
        showConfirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?", function (confirmed) {
          if (confirmed) {
            cart.splice(index, 1);
          } else {
            cart[index].quantity = 1;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });
      } else {
        cart[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    }

    else if (e.target.classList.contains("remove-item")) {
      showConfirm("Bạn có chắc muốn xóa sản phẩm này?", function (confirmed) {
        if (confirmed) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });
    }
  });

  renderCart();
});
