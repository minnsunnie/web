document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".btn-cart");

  function getCart() {
    try {
      const stored = JSON.parse(localStorage.getItem("cart"));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
    const countEls = [
      document.getElementById("cart-count"),
      document.querySelector(".cart-count")
    ];
    countEls.forEach(el => el && (el.textContent = total));
  }

  function addToCart(product) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === product.id);

    if (index >= 0) {
      cart[index].quantity = (parseInt(cart[index].quantity) || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
  }

  // Gán sự kiện chỉ 1 lần
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const productEl = this.closest(".product-item");
      if (!productEl) return;

      const id = productEl.dataset.id?.trim();
      const name = productEl.querySelector("h3")?.innerText.trim();
      const price = parseInt(productEl.dataset.price);
      const image = productEl.querySelector("img")?.getAttribute("src");

      if (!id || !name || isNaN(price) || !image) {
        console.warn("❌ Dữ liệu sản phẩm không hợp lệ", { id, name, price, image });
        return;
      }

      const product = { id, name, price, image };
      addToCart(product);
    }, { once: true }); // 👈 Chỉ gán sự kiện 1 lần duy nhất
  });

  updateCartCount();
});
