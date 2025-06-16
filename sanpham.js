document.addEventListener("DOMContentLoaded", function () {

  // ===== GIỎ HÀNG =====
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) cartCountEl.innerText = count;
  }

  updateCartCount();

  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const productCard = this.closest(".product-card");
      const name = productCard.querySelector("h3").innerText;
      const rawPrice = productCard.querySelector(".price").innerText;
      const price = rawPrice.replace(/[₫,]/g, "").trim();
      const imgSrc = productCard.querySelector("img").src;

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, imgSrc, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    });
  });

  // ===== TÌM KIẾM TỪ NAVBAR =====
  const keyword = localStorage.getItem("searchKeyword");
  if (keyword) {
    const productItems = document.querySelectorAll(".product-card");
    let hasMatch = false;

    productItems.forEach(item => {
      const name = item.querySelector("h3")?.innerText.toLowerCase();
      if (name && name.includes(keyword.toLowerCase())) {
        item.style.display = "block";
        hasMatch = true;
      } else {
        item.style.display = "none";
      }
    });

    if (hasMatch) {
      const section = document.getElementById("product-section") || document.querySelector(".products-grid");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const noResult = document.createElement("div");
      noResult.innerText = "Không tìm thấy sản phẩm nào phù hợp.";
      noResult.style.color = "red";
      noResult.style.padding = "16px";
      noResult.style.textAlign = "center";
      document.querySelector(".products-grid")?.prepend(noResult);
    }

    localStorage.removeItem("searchKeyword");
  }

  // ===== THANH LỌC SẢN PHẨM =====
  const typeFilter = document.getElementById("filter-category");
  const priceFilter = document.getElementById("filter-price");
  const soldFilter = document.getElementById("filter-popular");
  const searchBtn = document.getElementById("btn-search");
  const productItems = document.querySelectorAll(".product-card");

  function applyFilters() {
    const selectedType = typeFilter.value;
    const selectedPrice = priceFilter.value;
    const maxSold = parseInt(soldFilter.value) || null;

    let items = Array.from(productItems);

    items.forEach(item => {
      const type = item.dataset.type || "";
      const price = parseInt(item.dataset.price) || 0;
      const soldText = item.querySelector(".sold")?.innerText || "";
      const sold = parseInt(soldText.replace(/\D/g, "")) || 0;

      let visible = true;

      if (selectedType && type !== selectedType.toLowerCase()) {
        visible = false;
      }

      if (selectedPrice) {
        if (selectedPrice === "0-100000" && price > 100000) visible = false;
        if (selectedPrice === "100000-300000" && (price < 100000 || price > 300000)) visible = false;
        if (selectedPrice === "300000+" && price <= 300000) visible = false;
      }

      if (maxSold && sold < maxSold) {
        visible = false;
      }

      item.style.display = visible ? "block" : "none";
    });

    // Xoá thông báo cũ nếu có
    const oldMsg = document.getElementById("no-result-message");
    if (oldMsg) oldMsg.remove();

    // Kiểm tra nếu không có sản phẩm hiển thị
    const visibleItems = items.filter(item => item.style.display !== "none");
    const grid = document.querySelector(".products-grid");

    if (visibleItems.length === 0 && grid) {
      const msg = document.createElement("div");
      msg.id = "no-result-message";
      msg.innerText = "Không tìm thấy sản phẩm nào phù hợp.";
      msg.style.color = "red";
      msg.style.textAlign = "center";
      msg.style.padding = "24px";
      msg.style.gridColumn = "1 / -1";
      grid.appendChild(msg);
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", applyFilters);
  }
});
