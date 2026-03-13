const DEMO_EMAIL = "avishka@gmail.com";
const DEMO_PASSWORD = "avishka2002";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const statusMessage = document.getElementById("statusMessage");
const loginOverlay = document.getElementById("loginOverlay");
const reopenLoginBtn = document.getElementById("reopenLogin");
const revealItems = document.querySelectorAll(".reveal");

const setStatus = (message, type = "") => {
  statusMessage.className = "status-message";
  if (type) {
    statusMessage.classList.add(type);
  }
  statusMessage.textContent = message;
};

const unlockSite = () => {
  loginOverlay.classList.add("hidden");
  document.body.classList.add("site-unlocked");
  document.getElementById("siteShell").classList.remove("hidden");
  setStatus("Login successful. Welcome to LankaStay.", "success");
};

const showLogin = () => {
  loginOverlay.classList.remove("hidden");
  document.body.classList.remove("site-unlocked");
  document.getElementById("siteShell").classList.add("hidden");
  setStatus("");
};

togglePasswordBtn.addEventListener("click", () => {
  const nextType = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = nextType;
  togglePasswordBtn.textContent = nextType === "password" ? "Show" : "Hide";
  togglePasswordBtn.setAttribute(
    "aria-label",
    nextType === "password" ? "Show password" : "Hide password"
  );
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    setStatus("Enter both email and password.", "error");
    return;
  }

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    setStatus("Use the demo login: avishka@gmail.com / avishka2002", "error");
    return;
  }

  unlockSite();
  form.reset();
  passwordInput.type = "password";
  togglePasswordBtn.textContent = "Show";
  togglePasswordBtn.setAttribute("aria-label", "Show password");
});

reopenLoginBtn.addEventListener("click", () => {
  showLogin();
  emailInput.focus();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

// Image Slider Logic
const heroSlider = document.getElementById("heroSlider");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");
let currentSlide = 0;
const totalSlides = 4;

const updateSlider = () => {
  heroSlider.style.transform = `translateX(-${currentSlide * 25}%)`;
};

nextSlideBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
});

prevSlideBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Auto-play slider
setInterval(() => {
  if(document.body.classList.contains("site-unlocked")) {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }
}, 5000);
