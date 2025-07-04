document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tripForm");
  const resultDiv = document.getElementById("tripResults");
  const spinner = document.getElementById("loadingSpinner");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const destination = document.getElementById("destination").value;
    const days = document.getElementById("days").value;

    // Show spinner before wiping HTML
    spinner.classList.remove("hidden");

    resultDiv.innerHTML = `
      <h2>Your AI-Generated Trip Plan:</h2>
      <p>🧠 Planning your journey to <strong>${destination}</strong> for <strong>${days}</strong> days...</p>
    `;

    // Re-append spinner back into resultDiv
    resultDiv.appendChild(spinner);

    try {
      const response = await fetch("/plan_trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days })
      });

      const data = await response.json();

      // Hide spinner
      spinner.classList.add("hidden");

      resultDiv.innerHTML = `
        <h2>Your AI-Generated Trip Plan:</h2>
        <pre>${data.plan}</pre>
      `;
    } catch (err) {
      spinner.classList.add("hidden");
      resultDiv.innerHTML = `
        <h2>Your AI-Generated Trip Plan:</h2>
        <p style="color:red;">⚠️ Error generating plan. Please try again later.</p>
      `;
      console.error(err);
    }
  });
});
