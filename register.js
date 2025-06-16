// Tính tuổi từ ngày sinh
function calculateAge() {
    const dob = document.getElementById("dob").value;
    const ageElement = document.getElementById("age");
    if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        ageElement.textContent = age;
    } else {
        ageElement.textContent = "--";
    }
}

// Xử lý khi submit form đăng ký
document.getElementById('formRegister').addEventListener('submit', function (event) {
    event.preventDefault();

    // Lấy dữ liệu từ form
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;

    // Ẩn toàn bộ thông báo lỗi
    document.querySelectorAll('[id^="error"]').forEach(el => el.style.display = 'none');

    let isValid = true;

    if (!firstName) {
        document.getElementById('errorFirstName').style.display = 'block';
        isValid = false;
    }
    if (!lastName) {
        document.getElementById('errorLastName').style.display = 'block';
        isValid = false;
    }
    if (!genderInput) {
        document.getElementById('errorGender').style.display = 'block';
        isValid = false;
    }
    if (!dob) {
        document.getElementById('errorDob').style.display = 'block';
        isValid = false;
    }
    if (!email) {
        document.getElementById('errorEmail').style.display = 'block';
        isValid = false;
    }
    if (!phone) {
        document.getElementById('errorPhone').style.display = 'block';
        isValid = false;
    }
    if (!password) {
        document.getElementById('errorPassword').style.display = 'block';
        isValid = false;
    }
    if (password !== rePassword) {
        document.getElementById('errorRePassword').style.display = 'block';
        isValid = false;
    }

    // Nếu hợp lệ thì lưu vào localStorage
    if (isValid) {
        const newUser = {
            firstName,
            lastName,
            gender: genderInput.value,
            dob,
            email,
            phone,
            password
        };

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Kiểm tra email/sđt đã tồn tại
        const isExisted = users.some(user =>
            user.email === email || user.phone === phone
        );
        if (isExisted) {
            alert("❌ Email hoặc số điện thoại đã được đăng ký!");
            return;
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("🎉 Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập...");
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
});
