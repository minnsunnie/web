// Lấy các phần tử cần thiết
const cartTableBody = document.querySelector("#cart-table tbody");
const totalPriceEl = document.getElementById("total-price");
const checkoutForm = document.getElementById("checkout-form");

// Lấy giỏ hàng từ localStorage hoặc trả về mảng rỗng
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

// Render danh sách sản phẩm trong giỏ hàng
function renderCart() {
  const cart = getCart();
  cartTableBody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#a1887f;">Giỏ hàng trống.</td></tr>`;
    totalPriceEl.textContent = "Tổng tiền: 0₫";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toLocaleString('vi-VN')}₫</td>
      <td>${itemTotal.toLocaleString('vi-VN')}₫</td>
      <td><button class="btn-delete" data-index="${index}" title="Xoá sản phẩm">&times;</button></td>
    `;
    cartTableBody.appendChild(tr);
  });

  totalPriceEl.textContent = "Tổng tiền: " + total.toLocaleString('vi-VN') + "₫";

  // Thêm sự kiện cho các nút xoá
  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      if (!isNaN(idx)) {
        const cart = getCart();
        cart.splice(idx, 1); // xóa sản phẩm
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });
  });
}

// Xử lý submit form thanh toán
checkoutForm.addEventListener("submit", e => {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  // Lấy thông tin khách hàng
  const formData = new FormData(checkoutForm);
  const fullname = formData.get("fullname").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim();
  const address = formData.get("address").trim();

  if (!fullname || !email || !phone || !address) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  // Mô phỏng xử lý thanh toán thành công
  alert(`Cảm ơn ${fullname}!\nĐơn hàng của bạn đã được ghi nhận.\nChúng tôi sẽ liên hệ sớm nhất qua ${phone}.`);

  // Xoá giỏ hàng và reset form
  localStorage.removeItem("cart");
  renderCart();
  checkoutForm.reset();
});

// Khởi tạo render khi trang load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
