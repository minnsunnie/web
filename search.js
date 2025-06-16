document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("nav-clear-btn");
  const products = document.querySelectorAll(".product-item");

  // Bỏ dấu tiếng Việt
  function removeVietnameseTones(str) {
    return str.normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D");
  }

  // Lọc sản phẩm theo tên
  function filterProducts() {
    const keyword = removeVietnameseTones(searchInput.value.trim().toLowerCase());

    // Ẩn/hiện nút x
    clearBtn.style.display = keyword ? "inline" : "none";

    products.forEach(product => {
      const name = product.querySelector("h3")?.innerText || "";
      const nameNoAccent = removeVietnameseTones(name.toLowerCase());

      product.style.display = nameNoAccent.includes(keyword) ? "block" : "none";
    });
  }

  // Gõ đến đâu lọc đến đó
  searchInput.addEventListener("input", filterProducts);

  // Bấm Enter cũng lọc
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      filterProducts();
    }
  });

  // Bấm nút ✕
  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    clearBtn.style.display = "none";

    products.forEach(product => product.style.display = "block");
  });

  // Ẩn nút x ban đầu
  clearBtn.style.display = "none";
});
