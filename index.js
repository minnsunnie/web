document.addEventListener("DOMContentLoaded", function () {
  // ========== GIỎ HÀNG ==========
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById("cart-count");
    if (countElement) countElement.innerText = count;
  }

  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const productCard = this.closest(".product-item");
      const name = productCard.querySelector("h3").innerText;
      const price = productCard.querySelector(".price").innerText;
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

  updateCartCount();

  const cartLink = document.querySelector(".cart-icon");
  if (cartLink) {
    cartLink.addEventListener("click", function () {
      window.location.href = "checkout/index.html";
    });
  }

  // ========== NÚT KHÁM PHÁ ==========
  const exploreBtn = document.getElementById("exploreBtn");
  const offersSection = document.querySelector(".special-offers");
  if (exploreBtn && offersSection) {
    exploreBtn.addEventListener("click", () => {
      offersSection.classList.add("show");
      offersSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ========== NỘI DUNG ẨN/HIỆN ==========
  document.querySelectorAll(".info-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isOpen = content.classList.contains("open");

      document.querySelectorAll(".info-content").forEach(el => el.classList.remove("open"));
      document.querySelectorAll(".info-toggle").forEach(btn => btn.classList.remove("open"));

      if (!isOpen) {
        content.classList.add("open");
        button.classList.add("open");
      }
    });
  });

  // ========== FADE-UP SCROLL ==========
  const fadeEls = document.querySelectorAll(".fade-up");
  function revealFade() {
    const triggerBottom = window.innerHeight * 0.5;
    fadeEls.forEach(el => {
      if (el.getBoundingClientRect().top < triggerBottom) {
        el.classList.add("show");
      }
    });
  }
  window.addEventListener("scroll", revealFade);
  revealFade();

  // ========== COUNTER ==========
  const counters = document.querySelectorAll(".counter");
  const speed = 100;
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const inc = Math.ceil(target / speed);
          if (count < target) {
            counter.innerText = count + inc;
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        updateCount();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 1 });
  counters.forEach(counter => counterObserver.observe(counter));

  // ========== ƯU ĐÃI ==========
  const cards = document.querySelectorAll(".offer-card");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 150);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(card => observer.observe(card));

  // ========== TÌM KIẾM TRÊN NAVBAR ==========
  const searchToggle = document.getElementById("searchToggle");
  const searchContainer = document.getElementById("searchContainer");
  const searchInput = document.getElementById("searchInput");
  const navSearchBtn = document.getElementById("searchBtn");
  const navClearBtn = document.getElementById("nav-clear-btn");

  if (searchToggle && searchContainer) {
    searchToggle.addEventListener("click", () => {
      searchContainer.classList.toggle("show");
    });
  }

  if (navSearchBtn) {
    navSearchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const keyword = searchInput.value.trim();
      if (keyword) {
        localStorage.setItem("searchKeyword", keyword);
        window.location.href = "sanpham.html";
      }
    });
  }

  if (navClearBtn) {
    navClearBtn.addEventListener("click", function () {
      searchInput.value = "";
      navClearBtn.style.display = "none";
      searchInput.focus();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      navClearBtn.style.display = searchInput.value.trim() ? "block" : "none";
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const keyword = searchInput.value.trim();
        if (keyword) {
          localStorage.setItem("searchKeyword", keyword);
          window.location.href = "sanpham.html";
        }
      }
    });
  }

  // ========== HIỂN THỊ TÊN NGƯỜI DÙNG & ĐĂNG XUẤT ==========
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    const userNameEl = document.getElementById("user-name");
    if (userNameEl) {
      userNameEl.textContent = `Xin chào, ${user.firstName} ${user.lastName}`;
    }

    // Ẩn các nút đăng nhập/đăng ký nếu đã đăng nhập
    const authButtons = document.getElementById("auth-buttons");
    const userProfile = document.getElementById("user-profile");
    if (authButtons) authButtons.style.display = "none";
    if (userProfile) userProfile.style.display = "flex";
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }

  // ========== COUNTDOWN ==========
  function updateCountdown() {
    const targetDate = new Date("2025-06-20T23:59:59").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    const countdownEl = document.getElementById("countdown");

    if (!countdownEl) return;

    if (distance < 0) {
      countdownEl.innerHTML = "Ưu đãi đã kết thúc!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
