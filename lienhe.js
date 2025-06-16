document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("nav-clear-btn");
  const searchBtn = document.getElementById("searchBtn");

  if (!searchInput) return;

  // Hiện hoặc ẩn nút X
  const toggleClearButton = () => {
    clearBtn.style.display = searchInput.value.trim() !== "" ? "block" : "none";
  };

  // Bấm X thì xóa nội dung và focus lại
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      toggleClearButton();
      searchInput.focus();
    });
  }

  // Bấm Enter thì tìm kiếm
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  // Bấm nút tìm kiếm (nếu có)
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handleSearch();
    });
  }

  // Khi gõ thì cập nhật nút X
  searchInput.addEventListener("input", toggleClearButton);

  // Hàm xử lý tìm kiếm
  function handleSearch() {
    const keyword = searchInput.value.trim();
    if (keyword) {
      localStorage.setItem("searchKeyword", keyword);
      window.location.href = "sanpham.html";
    }
  }

  // Khởi tạo trạng thái ban đầu
  toggleClearButton();
});
