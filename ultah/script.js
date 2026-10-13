
/* ==================================
   1. PENGATURAN PRIBADI
================================== */

// Ganti sesuai nama dan tanggal lahirmu.
const birthdayConfig = {
  name: "Yusni",
  birthDate: "2004-06-10"
};

// Format tanggal: YYYY-MM-DD
// Contoh di atas berarti 10 Juni 2004.

// ==================================
// 2. TAMPILKAN NAMA DAN TANGGAL
// ==================================

const coverName = document.getElementById("coverName");
const heroName = document.getElementById("heroName");
const footerName = document.getElementById("footerName");
const birthdayDateText = document.getElementById("birthdayDateText");

coverName.textContent = birthdayConfig.name;
heroName.textContent = birthdayConfig.name;
footerName.textContent = birthdayConfig.name;

function parseBirthDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);

  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
}

const parsedBirthday = parseBirthDate(birthdayConfig.birthDate);

if (parsedBirthday) {
  const birthdayDate = new Date(
    parsedBirthday.year,
    parsedBirthday.month,
    parsedBirthday.day
  );

  birthdayDateText.textContent = birthdayDate.toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );
} else {
  birthdayDateText.textContent = "Hari ulang tahunku";
}

// ==================================
// 3. BUKA COVER
// ==================================

const cover = document.getElementById("cover");
const openButton = document.getElementById("openButton");

openButton.addEventListener("click", async () => {
  cover.classList.add("opened");

  // Hapus cover setelah transisi selesai.
  window.setTimeout(() => {
    cover.style.display = "none";
  }, 950);

  // Coba putar musik setelah klik pengguna.
  const music = document.getElementById("birthdayMusic");

  try {
    await music.play();
  } catch (error) {
    console.info(
      "Musik belum tersedia. Website tetap bisa digunakan."
    );
  }
});

// ==================================
// 4. MUSIK LATAR
// ==================================

const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
    } catch (error) {
      alert("Musik belum tersedia. Periksa file music.mp3.");
    }
  } else {
    music.pause();
  }
});

music.addEventListener("play", () => {
  musicButton.classList.add("playing");
  musicButton.textContent = "♫";
  musicButton.setAttribute("aria-label", "Hentikan musik");
});

music.addEventListener("pause", () => {
  musicButton.classList.remove("playing");
  musicButton.textContent = "♪";
  musicButton.setAttribute("aria-label", "Putar musik");
});

// ==================================
// 5. NAVIGASI MOBILE
// ==================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

menuButton.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");

  menuButton.textContent = opened ? "×" : "☰";
  menuButton.setAttribute("aria-expanded", String(opened));
  menuButton.setAttribute(
    "aria-label",
    opened ? "Tutup menu" : "Buka menu"
  );
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Bayangan navbar ketika scroll.
function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

updateNavbar();

// ==================================
// 6. COUNTDOWN ULANG TAHUN BERIKUTNYA
// ==================================

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const countdownMessage = document.getElementById("countdownMessage");

function getNextBirthday() {
  if (!parsedBirthday) return null;

  const now = new Date();

  // Gunakan tanggal dan bulan lahir untuk mencari
  // ulang tahun berikutnya, bukan tahun kelahiran.
  let next = new Date(
    now.getFullYear(),
    parsedBirthday.month,
    parsedBirthday.day,
    0, 0, 0
  );

  if (next.getTime() <= now.getTime()) {
    next = new Date(
      now.getFullYear() + 1,
      parsedBirthday.month,
      parsedBirthday.day,
      0, 0, 0
    );
  }

  return next;
}

function updateCountdown() {
  const target = getNextBirthday();

  if (!target) {
    countdownMessage.textContent =
      "Periksa format tanggal lahir di script.js.";

    return;
  }

  const difference = Math.max(0, target.getTime() - Date.now());

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");

  countdownMessage.textContent = "";
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==================================
// 7. ANIMASI SAAT SCROLL
// ==================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// ==================================
// 8. GALERI FOTO / LIGHTBOX
// ==================================

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

let previousFocus = null;

function showPhoto(button) {
  const image = button.querySelector("img");

  if (!image) return;

  previousFocus = button;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  closeLightbox.focus();
}

function hidePhoto() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";

  document.body.classList.remove("no-scroll");

  if (previousFocus) {
    previousFocus.focus();
  }
}

galleryItems.forEach((button) => {
  button.addEventListener("click", () => {
    showPhoto(button);
  });
});

closeLightbox.addEventListener("click", hidePhoto);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    hidePhoto();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    lightbox.classList.contains("active")
  ) {
    hidePhoto();
  }
});

// ==================================
// 9. BAGIKAN WEBSITE
// ==================================

const shareButton = document.getElementById("shareButton");

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: `${birthdayConfig.name} | A New Chapter With God`,
    text:
      "Bersyukur untuk kehidupan dan setiap berkat Tuhan. " +
      "Mari melihat perjalanan ulang tahunku!",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(shareData.url);

      shareButton.textContent = "✓ Link berhasil disalin";

      window.setTimeout(() => {
        shareButton.textContent = "↗ Bagikan Halaman";
      }, 2500);
    } else {
      window.prompt("Salin link website ini:", shareData.url);
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      window.prompt("Salin link website ini:", shareData.url);
    }
  }
});

// ==================================
// 10. JUDUL DAN TAHUN
// ==================================

document.title =
  `${birthdayConfig.name} | A New Chapter With God`;

console.log("Birthday website berhasil dimuat!");
