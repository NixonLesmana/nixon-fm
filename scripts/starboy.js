const themeButtons = document.querySelectorAll("[data-theme-option]");
const savedTheme = localStorage.getItem("theme") || "system";
const systemTheme = window.matchMedia("(prefers-color-scheme: light)");

function applyTheme(theme) {
    const selectedTheme = theme === "system"
        ? (systemTheme.matches ? "light" : "dark")
        : theme;

    document.documentElement.dataset.theme = selectedTheme;

    themeButtons.forEach((button) => {
        button.setAttribute(
            "aria-pressed",
            String(button.dataset.themeOption === theme)
        );
    });

    localStorage.setItem("theme", theme);
}

applyTheme(savedTheme);

themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyTheme(button.dataset.themeOption);
    });
});

systemTheme.addEventListener("change", () => {
    const currentTheme = localStorage.getItem("theme") || "system";

    if (currentTheme === "system") {
        applyTheme("system");
    }
});

const stageLightButton = document.querySelector("#stage-light-toggle");
const savedStageLightMode = localStorage.getItem("stageLights");

function setStageLights(isOn) {
    document.body.classList.toggle("stage-lights-on", isOn);

    if (stageLightButton) {
        stageLightButton.setAttribute("aria-pressed", String(isOn));
        stageLightButton.textContent = isOn ? "Stage Lights On" : "Stage Lights";
    }

    localStorage.setItem("stageLights", isOn ? "on" : "off");
}

if (stageLightButton) {
    setStageLights(savedStageLightMode === "on");

    stageLightButton.addEventListener("click", () => {
        const isCurrentlyOn = stageLightButton.getAttribute("aria-pressed") === "true";
        setStageLights(!isCurrentlyOn);
    });
}