// Sidebar Toggle
let menubtn = document.querySelector(".menubtn");
let sidebar = document.querySelector(".sidebar");

menubtn.addEventListener("click", () => {
    sidebar.style.transition = "margin-left 0.2s ease";
    if (sidebar.style.marginLeft === "-180%") {
        sidebar.style.marginLeft = "0";
    } else {
        sidebar.style.marginLeft = "-180%";
    }
});

// Alert Before Final Submit (optional enhancement)
let finalBtn = document.querySelector("#btn");
if (finalBtn) {
    finalBtn.addEventListener('click', () => {
        let message = document.querySelector("#message").value.trim();
        if (message === "") {
            alert("Message Cannot be Empty!");
        } else {
            // Just for user feedback; real send handled by form submit
            setTimeout(() => alert("Sending your message..."), 500);
        }
    });
}

// Flash message handling from URL
const params = new URLSearchParams(window.location.search);
const flashBox = document.getElementById("flash-message");

if (params.has("success")) {
    flashBox.innerHTML = `<div class="alert alert-success">${params.get("success")}</div>`;
} else if (params.has("error")) {
    flashBox.innerHTML = `<div class="alert alert-danger">${params.get("error")}</div>`;
}
