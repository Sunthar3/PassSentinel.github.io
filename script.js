console.log("Script Loaded Successfully")
const container = document.querySelector(".container");
const hidden = document.querySelector(".hidden");
const hiddenInput = document.querySelector(".hidden-input");
const revealed = document.querySelector(".revealed");
const revealedInput = document.querySelector(".revealed-input");
const button = document.querySelector(".button");
const timeline = anime.timeline({
  duration: 300,
  easing: "cubicBezier(.4, 0, .2, 1)",
  autoplay: false,
}).add(
  {
    targets: document.querySelector(".eye-lid"),
    d:
      "M -5,-5 V 37 H 15.6 C 15.6,37 21.35124,23.469343 34.312131,23.469343 47.273022,23.469343 53.4,37 53.4,37 H 77 V -5 Z",
  },
  0
).add(
  {
    targets: document.querySelector(".eye-lashes"),
    rotateX: ["180deg", "0deg"],
  },
  0
);

hiddenInput.addEventListener("input", () => {
  if (!container.classList.contains("active")) {
    revealedInput.value = hiddenInput.value;
  }
});

revealedInput.addEventListener("input", () => {
  if (container.classList.contains("active")) {
    hiddenInput.value = revealedInput.value;
  }
});

button.addEventListener("click", () => {
  container.classList.toggle("active");
  timeline.reverse();
  timeline.play();
  if (container.classList.contains("active")) {
    revealedInput.focus();
  } else {
    hiddenInput.focus();
  }
});

timeline.reverse();
timeline.play();

// Function to analyze the password
async function analyzePassword(password) {
  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: JSON.stringify({ password: password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    // console.log(data)
    // console.log(data.strength)
    return data.strength;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

// Listen for form submission
const form = document.getElementById("passwordForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get the entered password
  const password = document.getElementById("passwordInput").value;
//   console.log("Got the password Value")

  // Send the password to the backend for analysis
  const strength = await analyzePassword(password);
//   console.log(strength)

  // Display the analysis result to the user
     const resultContainer = document.getElementById("resultContainer");
//   const resultText = document.getElementById("resultText");
//   resultText.textContent = "Password Strength: " + strength;
//   resultContainer.classList.add("show");
  status_password(strength)
});
function status_password(temp_strength)
{
    // console.log("'Entered the function")
    var stre=''
    switch(temp_strength){
        case '0':
            // console.log("Entered case 0")
            stre = "<small class='.progress-bar bg-danger' style='width: 40%'>Weak</small>";
            break;
        case '1':
            stre = "<small class='.progress-bar bg-warning' style='width: 60%'>Medium</small>";
            break;
        case '2':
            stre = "<small class='.progress-bar bg-success' style='width: 100%'>Strong</small>";
            break;
    }
    resultContainer.innerHTML = stre;
}