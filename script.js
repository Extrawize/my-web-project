document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggleBtn = document.getElementById("theme-toggle");

  const currentHour = new Date().getHours();
  if (currentHour >= 7 && currentHour < 21) {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  }

  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
    }
  });

  // ==========================================
  // 2. ДАНІ LOCALSTORAGE
  // ==========================================
  const navData = {
    online: navigator.onLine,
    cookieEnabled: navigator.cookieEnabled,
    appName: navigator.appName,
    language: navigator.language,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    appVersion: navigator.appVersion,
  };

  localStorage.setItem("systemInfo", JSON.stringify(navData));
  const savedInfo = JSON.parse(localStorage.getItem("systemInfo"));
  const lsContainer = document.getElementById("ls-data");

  let htmlOutput = "Тут буде інформація з localStorage...<br><br>";
  for (const key in savedInfo) {
    htmlOutput += `${key}: ${savedInfo[key]}<br><br>`;
  }
  lsContainer.innerHTML = htmlOutput;

  // ==========================================
  // 3. ВІДГУКИ ІЗ СЕРВЕРА (API)
  // ==========================================
  const variantNumber = 5;
  const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((comments) => {
      const commentsList = document.getElementById("comments-list");
      comments.forEach((comment) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="comment-email">${comment.email}</span>${comment.body}`;
        commentsList.appendChild(li);
      });
    })
    .catch((error) => console.error("Помилка API:", error));

  // ==========================================
  // 4. ФОРМА ЗВОРОТНОГО ЗВ'ЯЗКУ (МОДАЛЬНЕ ВІКНО)
  // ==========================================
  const modal = document.getElementById("feedback-modal");
  const closeBtn = document.querySelector(".close-btn");

  // Вікно з'явиться рівно через 60 секунд (60000 мс)
  setTimeout(() => {
    modal.style.display = "block";
  }, 300);

  // Закрити на хрестик
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Закрити при кліку по темному фону
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
