// Xóa thông tin đăng nhập lưu trong localStorage
localStorage.removeItem('loggedInUser'); // tên key lưu user, bạn thay thế cho phù hợp
localStorage.removeItem('token'); // nếu có token đăng nhập

// Nếu bạn lưu thêm các dữ liệu liên quan tới phiên đăng nhập cũng xóa ở đây

// Sau khi xóa, chuyển về trang đăng nhập
setTimeout(() => {
  window.location.href = 'login.html';
}, 1000);
