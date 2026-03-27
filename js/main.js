document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: form.querySelector('input[name="name"]').value,
      email: form.querySelector('input[name="email"]').value,
      message: form.querySelector('textarea[name="message"]').value
    };

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully ✅");
        form.reset();
      } else {
        alert("Error: " + result.error);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  });

});