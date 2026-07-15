const openedPanels = new Set();
const totalPanels = document.querySelectorAll(".petal").length;

const flowerProgress = document.getElementById("flowerProgress");
const finalTitle = document.getElementById("finalTitle");
const finalDescription = document.getElementById("finalDescription");
const finalSurprise = document.getElementById("finalSurprise");
const lock = document.getElementById("lock");

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".petal").forEach((petal) => {
  petal.addEventListener("click", () => {
    const panelId = petal.dataset.panel;
    const panel = document.getElementById(panelId);

    document.querySelectorAll(".memory-panel").forEach((item) => {
      item.classList.remove("is-active");
    });

    panel.classList.add("is-active");
    petal.classList.add("is-opened");
    openedPanels.add(panelId);

    flowerProgress.textContent = `${openedPanels.size}/${totalPanels}`;

    setTimeout(() => {
      panel.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);

    if (openedPanels.size === totalPanels) {
      unlockFinalSurprise();
    }
  });
});

function unlockFinalSurprise() {
  finalTitle.textContent = "Has desbloqueado tu sorpresa";
  finalDescription.textContent =
    "Todos estos recuerdos conducen a un último mensaje para ti.";
  lock.hidden = true;
  finalSurprise.hidden = false;
}

document.querySelectorAll(".quality-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-revealed");
  });
});

const messageDialog = document.getElementById("messageDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogMessage = document.getElementById("dialogMessage");
const closeDialog = document.getElementById("closeDialog");

document.querySelectorAll(".capsule").forEach((capsule) => {
  capsule.addEventListener("click", () => {
    dialogTitle.textContent = capsule.dataset.title;
    dialogMessage.textContent = capsule.dataset.message;
    messageDialog.showModal();
  });
});

closeDialog.addEventListener("click", () => messageDialog.close());

messageDialog.addEventListener("click", (event) => {
  if (event.target === messageDialog) {
    messageDialog.close();
  }
});

const giftDialog = document.getElementById("giftDialog");
const giftButton = document.getElementById("giftButton");
const closeGiftDialog = document.getElementById("closeGiftDialog");

giftButton.addEventListener("click", () => giftDialog.showModal());
closeGiftDialog.addEventListener("click", () => giftDialog.close());

giftDialog.addEventListener("click", (event) => {
  if (event.target === giftDialog) {
    giftDialog.close();
  }
});

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
let isMusicPlaying = false;

musicButton.addEventListener("click", async () => {
  try {
    if (isMusicPlaying) {
      backgroundMusic.pause();
      musicButton.classList.remove("is-playing");
      musicButton.textContent = "♪";
      musicButton.setAttribute("aria-label", "Reproducir música");
    } else {
      await backgroundMusic.play();
      musicButton.classList.add("is-playing");
      musicButton.textContent = "❚❚";
      musicButton.setAttribute("aria-label", "Pausar música");
    }

    isMusicPlaying = !isMusicPlaying;
  } catch {
    alert(
      "Agrega una canción en assets/media/cancion.mp3 para activar la música."
    );
  }
});

const canvas = document.getElementById("particles");
const context = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  const quantity = Math.min(70, Math.floor(window.innerWidth / 18));

  particles = Array.from({ length: quantity }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.35 + 0.1,
    opacity: Math.random() * 0.55 + 0.2,
  }));
}

function drawParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(230, 186, 83, ${particle.opacity})`;
    context.fill();

    particle.y -= particle.speed;

    if (particle.y < -5) {
      particle.y = canvas.height + 5;
      particle.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawParticles();
