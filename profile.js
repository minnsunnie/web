 document.addEventListener("DOMContentLoaded", () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        document.getElementById("fullName").textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById("email").textContent = user.email;
        document.getElementById("phone").textContent = user.phone || "--";
        document.getElementById("dob").textContent = user.dob || "--";
        document.getElementById("gender").textContent = user.gender || "--";
      }

      const form = document.getElementById("changePasswordForm");
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const oldPass = document.getElementById("oldPassword").value;
        const newPass = document.getElementById("newPassword").value;
        const confirmPass = document.getElementById("confirmPassword").value;
        const messageEl = document.getElementById("passwordMessage");

        if (oldPass !== user.password) {
          messageEl.textContent = "❌ Mật khẩu hiện tại không đúng!";
          return;
        }

        if (newPass !== confirmPass) {
          messageEl.textContent = "❌ Mật khẩu xác nhận không khớp!";
          return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map(u => {
          if (u.email === user.email) {
            return { ...u, password: newPass };
          }
          return u;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedInUser", JSON.stringify({ ...user, password: newPass }));
        messageEl.textContent = "✅ Đổi mật khẩu thành công!";
        form.reset();
      });
    });