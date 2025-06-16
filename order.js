 document.addEventListener("DOMContentLoaded", () => {
      const orderList = document.getElementById("orderList");

      const orders = JSON.parse(localStorage.getItem("orders")) || [];

      if (orders.length === 0) {
        orderList.innerHTML = '<p class="text-center text-muted">Chưa có đơn hàng nào.</p>';
        return;
      }

      orders.forEach((order, index) => {
        const statusClass =
          order.status === "Đã giao" ? "text-success" :
          order.status === "Đang xử lý" ? "text-warning" :
          "text-muted";

        const orderEl = document.createElement("div");
        orderEl.classList.add("order-item");

        orderEl.innerHTML = `
          <div class="order-info">
            <h5>Mã đơn: ${order.id}</h5>
            <span class="order-status ${statusClass}">${order.status}</span>
          </div>
          <p>Sản phẩm: ${order.product}</p>
          <p>Ngày đặt: ${order.date}</p>
          <p>Tổng tiền: ₫${order.total.toLocaleString()}</p>
          <div class="order-details">
            ${order.details || "Không có ghi chú."}
          </div>
          ${order.status === "Đang xử lý" ? `<button class="btn btn-outline-danger btn-sm btn-cancel" data-index="${index}">Hủy đơn</button>` : ""}
        `;

        orderList.appendChild(orderEl);
      });

      orderList.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-cancel")) {
          const index = e.target.getAttribute("data-index");
          if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders[index].status = "Đã hủy";
            localStorage.setItem("orders", JSON.stringify(orders));
            location.reload();
          }
        }
      });
    });