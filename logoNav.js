document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logoClick");
  if (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      const currentPage = window.location.pathname;

      if (currentPage.includes("index.html") || currentPage === "/" || currentPage === "/index.html") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = "index.html";
      }
    });
  }
});
