// Xóa thông tin đăng nhập khỏi localStorage
localStorage.removeItem('loggedInUser');
localStorage.removeItem('token'); // Nếu có lưu token

// Chuyển về trang đăng nhập sau 1 giây
setTimeout(() => {
  window.location.href = '../login.html'; // Đường dẫn tuỳ theo cấu trúc folder của bạn
}, 1000);
