const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const projectModal = document.querySelector(".project-modal");
const projectTiles = document.querySelectorAll("[data-project]");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalSummary = document.getElementById("modal-summary");
const modalPoints = document.getElementById("modal-points");
const modalTags = document.getElementById("modal-tags");

const projectDetails = {
    "mini-lms": {
        category: "Backend learning project",
        title: "Mini LMS - Microservices Backend",
        summary: "A university backend project built to understand service separation, gateway routing, JWT authentication, PostgreSQL-backed services, and Docker Compose orchestration.",
        points: [
            "Helped me understand how a larger backend can be split into smaller services.",
            "Includes Auth, Course, Enrollment, and API Gateway services.",
            "Good representation of my backend learning direction, but not a claim of senior production experience."
        ],
        tags: ["Java", "Spring Boot", "PostgreSQL", "Docker", "JWT"]
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
        tags: ["Python", "Sockets", "TCP/UDP", "Threads", "Encryption"]
    },
    "security-system": {
        category: "Embedded systems coursework",
        title: "Home Security System",
        summary: "An ESP32-based home security system involving sensors, Wi-Fi communication, event logging, and alert logic.",
        points: [
            "Included as practical systems experience, not my main career direction.",
            "Worked with sensor-based input and event-driven logic.",
            "Useful for showing C++ exposure outside normal desktop or backend applications."
        ],
        tags: ["C++", "ESP32", "Sensors", "IoT", "Wi-Fi"]
    },
    "android-chatgpt": {
        category: "API integration project",
        title: "ChatGPT Android Application",
        summary: "A Java Android project that connected a simple chatbot interface to the OpenAI API using Retrofit and Gson.",
        points: [
            "Included as API integration and UI experience.",
            "Shows Java usage in a mobile environment.",
            "Not presented as a target career direction because Android development is not my main goal."
        ],
        tags: ["Java", "Android Studio", "Retrofit", "Gson", "API Integration"]
    },
    "blackjack-ai": {
        category: "AI and math concept",
        title: "Blackjack Decision Support AI",
        summary: "A Python AI concept focused on blackjack decision support using game-state evaluation, simulation thinking, and expected value comparison.",
        points: [
            "Represents interest in math, probability, and decision-making under uncertainty.",
            "Useful as a learning project around simulation and algorithmic reasoning.",
            "Best treated as a concept/project plan rather than a finished product."
        ],
        tags: ["Python", "AI", "Simulation", "Expected Value", "Math"]
    }
};

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
    }
});

function openProjectModal(projectId) {
    const project = projectDetails[projectId];

    if (!projectModal || !project) {
        return;
    }

    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalSummary.textContent = project.summary;
    modalPoints.innerHTML = project.points.map((point) => `<li>${point}</li>`).join("");
    modalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
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

projectTiles.forEach((tile) => {
    tile.addEventListener("click", () => openProjectModal(tile.dataset.project));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeProjectModal);
});
