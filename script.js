const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const projectModal = document.querySelector(".project-modal");
const projectTiles = document.querySelectorAll("[data-project]");
const gameTiles = document.querySelectorAll("[data-game]");
const certificateTiles = document.querySelectorAll("[data-certificate]");
const certificateModal = document.querySelector(".certificate-modal");
const certificateModalTitle = document.getElementById("certificate-modal-title");
const certificateFrame = document.getElementById("certificate-frame");
const themeToggle = document.querySelector(".theme-toggle");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalSummary = document.getElementById("modal-summary");
const modalPoints = document.getElementById("modal-points");
const modalTags = document.getElementById("modal-tags");
const modalLink = document.getElementById("modal-link");

const projectDetails = {
    "mini-lms": {
        category: "Backend learning project",
        title: "Mini LMS - Microservices Backend",
        summary: "A university backend project built to understand service separation, gateway routing, JWT authentication, PostgreSQL-backed services, and Docker Compose orchestration.",
        points: [
            "Includes Auth, Course, Enrollment, and API Gateway services.",
            "Uses PostgreSQL-backed services with Docker Compose orchestration.",
            "Covers authentication flow, protected endpoints, and service separation."
        ],
        tags: ["Java", "Spring Boot", "PostgreSQL", "Docker", "JWT"],
        link: "https://github.com/mohamedalhajji/mini-lms-microservices",
        linkLabel: "View Repository"
    },
    "p2p-chat": {
        category: "Python programming project",
        title: "Encrypted P2P Chat Application",
        summary: "A Python chat project using sockets, peer discovery, threading, key exchange, encryption, and message logging.",
        points: [
            "Shows practical Python programming and networking exposure.",
            "Worked with TCP/UDP communication, threading, and terminal interaction.",
            "The project strengthened my understanding of how programs communicate over a network."
        ],
        tags: ["Python", "Sockets", "TCP/UDP", "Threads", "Encryption"],
        link: "https://github.com/mohamedalhajji/NetworkingProject",
        linkLabel: "View Repository"
    },
    "security-system": {
        category: "Embedded systems coursework",
        title: "Home Security System",
        summary: "An ESP32-based home security system involving sensors, Wi-Fi communication, event logging, and alert handling.",
        points: [
            "Worked with sensor-based input and event-driven behavior.",
            "Includes intrusion, fire, and gas detection scenarios.",
            "Uses C++ control flow for handling alerts and system responses."
        ],
        tags: ["C++", "ESP32", "Sensors", "IoT", "Wi-Fi"],
        link: "https://github.com/mohamedalhajji/Capstone",
        linkLabel: "View Repository"
    },
    "android-chatgpt": {
        category: "API integration project",
        title: "ChatGPT Android Application",
        summary: "A Java Android project that connected a simple chatbot interface to the OpenAI API using Retrofit and Gson.",
        points: [
            "Uses Retrofit for API requests and Gson for JSON parsing.",
            "Includes a simple chat interface for user messages and responses.",
            "Focuses on API integration and UI flow."
        ],
        tags: ["Java", "Android Studio", "Retrofit", "Gson", "API Integration"],
        link: "https://github.com/0x-neon/MOB-GPT",
        linkLabel: "View Repository"
    },
    "blackjack-ai": {
        category: "AI and probability concept",
        title: "Blackjack Decision Support AI",
        summary: "A Python AI concept focused on blackjack decision support using game-state evaluation, simulation thinking, and expected value comparison.",
        points: [
            "Represents interest in probability and decision-making under uncertainty.",
            "Useful as a learning project around simulation and algorithmic reasoning.",
            "Best treated as a concept/project plan rather than a finished product."
        ],
        tags: ["Python", "AI", "Simulation", "Expected Value", "Probability"],
        link: "https://github.com/mohamedalhajji/Blackjack-AI",
        linkLabel: "View Repository"
    },
    "hashing-db": {
        category: "Data structures coursework",
        title: "Hashing Database Project",
        summary: "A C++ data structures project implementing a custom hash table with double hashing, lazy deletion, rehashing, and web log analysis.",
        points: [
            "Implements a hash table with primary and secondary hash functions.",
            "Uses web server logs to identify the top 10 most visited pages.",
            "Compares the custom hash table approach with C++ unordered_map."
        ],
        tags: ["C++", "Hash Table", "Double Hashing", "Data Structures", "Log Analysis"],
        link: "https://github.com/mohamedalhajji/DSProject",
        linkLabel: "View Repository"
    }
};

const gameDetails = {
    "gambasim": {
        category: "Simulation game",
        title: "GambaSim",
        summary: "A casino simulation project focused on Blackjack, progression systems, betting limits, risk mechanics, UI planning, and custom card design.",
        points: [
            "Explores casino-style systems, unlocks, betting progression, and replay motivation.",
            "Includes Blackjack-focused gameplay and betting-limit progression.",
            "Uses custom UI assets and card presentation work."
        ],
        tags: ["Simulation", "UI", "Progression", "Steam"],
        link: "https://store.steampowered.com/app/4158090/GambaSim/",
        linkLabel: "View on Steam"
    },
    "time-within": {
        category: "Unreal Engine project",
        title: "The Time Within",
        summary: "A first-person escape room project with two linked time periods, environmental puzzles, interactable objects, item usage, and menu/HUD systems.",
        points: [
            "Built around puzzle interaction and environmental progression.",
            "Uses a past room and future room connected through shared puzzle progression.",
            "Includes interactable objects, item usage, menus, and HUD elements."
        ],
        tags: ["Unreal Engine 5", "Visual Blueprints", "Puzzle Design", "UI"],
        link: "https://mohamedalhajji.itch.io/the-time-within",
        linkLabel: "View on Itch.io"
    },
    "cybers-edge": {
        category: "Arcade prototype",
        title: "Cyber's Edge",
        summary: "A runner-style prototype focused on movement timing, obstacles, score chasing, and replayable arcade pacing.",
        points: [
            "Simple arcade-style prototype with score-focused gameplay.",
            "Useful as a small example of movement, obstacles, and game feel experimentation.",
            "Focuses on pacing, obstacle timing, and replayability."
        ],
        tags: ["Arcade", "Runner", "Prototype", "Gameplay"],
        link: "https://mohamedalhajji.itch.io/cybersedge",
        linkLabel: "View on Itch.io"
    }
};

function getPreferredTheme() {
    return localStorage.getItem("theme") || "dark";
}

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;

    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
        themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    }
}

setTheme(getPreferredTheme());

themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
});

function closeNav() {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeNav();
    });
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                const href = link.getAttribute("href");

                if (href?.startsWith("#")) {
                    link.classList.toggle("active", href === `#${entry.target.id}`);
                }
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

sections.forEach((section) => navObserver.observe(section));

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeNav();
        closeProjectModal();
        closeCertificateModal();
    }
});

function openProjectModal(projectId, collection = projectDetails) {
    const project = collection[projectId];

    if (!projectModal || !project) {
        return;
    }

    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalSummary.textContent = project.summary;
    modalPoints.innerHTML = project.points.map((point) => `<li>${point}</li>`).join("");
    modalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");

    if (modalLink) {
        modalLink.hidden = !project.link;
        modalLink.href = project.link || "#";
        modalLink.textContent = project.link ? (project.linkLabel || "View project") : "";
    }

    projectModal.hidden = false;
    document.body.classList.add("modal-open");
}

function closeProjectModal() {
    if (!projectModal) {
        return;
    }

    projectModal.hidden = true;
    document.body.classList.remove("modal-open");
}

function openCertificateModal(button) {
    if (!certificateModal || !certificateFrame || !button.dataset.certificate) {
        return;
    }

    certificateModalTitle.textContent = button.dataset.title || "Certificate";
    certificateFrame.src = `${button.dataset.certificate}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`;
    certificateModal.hidden = false;
    document.body.classList.add("modal-open");
}

function closeCertificateModal() {
    if (!certificateModal) {
        return;
    }

    certificateModal.hidden = true;
    document.body.classList.remove("modal-open");

    if (certificateFrame) {
        certificateFrame.src = "";
    }
}

projectTiles.forEach((tile) => {
    tile.addEventListener("click", () => openProjectModal(tile.dataset.project));
});

gameTiles.forEach((tile) => {
    tile.addEventListener("click", () => openProjectModal(tile.dataset.game, gameDetails));
});

certificateTiles.forEach((tile) => {
    tile.addEventListener("click", () => openCertificateModal(tile));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeProjectModal);
});

document.querySelectorAll("[data-close-certificate]").forEach((button) => {
    button.addEventListener("click", closeCertificateModal);
});
