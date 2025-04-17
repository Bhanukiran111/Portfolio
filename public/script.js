document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");
});

function showMainContent() {
    document.querySelector(".landing-page").style.display = "none";
    document.querySelector(".main-content").style.display = "block";

    // Show About Me initially
    document.getElementById("about").style.display = "block";
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove("show");
        screen.style.display = "none";
    });
}

function showScreen(screenId) {
    // Hide About Me
    document.getElementById("about").style.display = "none";

    // Hide all screens with fade out
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => {
        screen.classList.remove("show");
        screen.style.display = "none";
    });

    // Show the selected screen with fade in
    const targetScreen = document.getElementById(screenId);
    targetScreen.style.display = "block";
    setTimeout(() => {
        targetScreen.classList.add("show");
    }, 10);

    // Remove glow from all links
    const links = document.querySelectorAll(".rectangle");
    links.forEach(link => link.classList.remove("active"));

    // Add glow to the active link
    document.querySelector(`a[href='#${screenId}']`).classList.add("active");
}

function goBack() {
    // Hide all screens with fade out
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => {
        screen.classList.remove("show");
        screen.style.display = "none";
    });

    // Show About Me
    document.getElementById("about").style.display = "block";

    // Remove glow from all links
    const links = document.querySelectorAll(".rectangle");
    links.forEach(link => link.classList.remove("active"));
}