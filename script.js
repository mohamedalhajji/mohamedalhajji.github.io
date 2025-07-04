function showSection(section) {
    document.getElementById("home").style.display = section === "home" ? "block" : "none";
    document.getElementById("projects").style.display = section === "projects" ? "block" : "none";
    document.getElementById("resume").style.display = section === "resume" ? "block" : "none";
}

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json"
        }
    })
        .then((response) => {
            if (response.ok) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                response.json().then((data) => {
                    alert(data.error || "Error sending message. Try again.");
                });
            }
        })
        .catch(() => {
            alert("Something went wrong. Please try again later.");
        });
});
