const API_BASE = "http://localhost:5500"; // Backend URL

const form = document.getElementById("contactForm");
const responseEl = document.getElementById("response");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (data.success) {
      responseEl.innerText = data.message;
      form.reset();
    } else {
      responseEl.innerText = data.error || "Failed to send message";
    }
  } catch (err) {
    console.error(err);
    responseEl.innerText = "Error sending message";
  }
});