//for hambuger navbar//
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show'); // ✅ MATCHES YOUR CSS
}
// For active link to highlight//
 // ✅ FINAL FIX: Active nav highlighting (ignore external links like Trip Planner)
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkURL = new URL(link.href);
    const linkPath = linkURL.pathname.toLowerCase();

    // ❌ Skip if the link points to an external domain
    if (linkURL.origin !== window.location.origin) return;

    // ✅ Activate if path matches
    if (
      currentPath === linkPath ||
      (linkPath === "/index.html" && currentPath === "/") ||
      (linkPath === "/" && currentPath === "/")
    ) {
      link.classList.add("active");
    }
  });
});

// active page link js ends//

//flight section js starts
  
window.addEventListener("DOMContentLoaded", function () {

  // 1. Handle Trip Type Switching
  const tripLinks = document.querySelectorAll('.triptypechoose a');
  const returnDateInput = document.getElementById('return');

  function getTripType(text) {
    if (text.toLowerCase().includes("one")) return "oneway";
    if (text.toLowerCase().includes("round")) return "round";
    if (text.toLowerCase().includes("multi")) return "multi";
    return "";
  }

  tripLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      tripLinks.forEach(l => l.classList.remove('active-trip'));
      this.classList.add('active-trip');

      const tripType = getTripType(this.textContent);

      if (tripType === "oneway") {
        returnDateInput.disabled = true;
        returnDateInput.value = "";
        returnDateInput.style.backgroundColor = "#eee";
      } else {
        returnDateInput.disabled = false;
        returnDateInput.style.backgroundColor = "";
      }
    });
  });

  // 2. Airport Autocomplete
 const airports = [
  "Delhi (DEL)",
  "Mumbai (BOM)",
  "Bengaluru (BLR)",
  "Chennai (MAA)",
  "Hyderabad (HYD)",
  "Kolkata (CCU)",
  "Pune (PNQ)",
  "Goa (GOI)",
  "Ahmedabad (AMD)",
  "Jaipur (JAI)",
  "Lucknow (LKO)",
  "Patna (PAT)",
  "Varanasi (VNS)",
  "Indore (IDR)",
  "Guwahati (GAU)",
  "Nagpur (NAG)"
];

  function updateAirport(inputId, outputId) {
    const input = document.getElementById(inputId);
    const output = document.getElementById(outputId);
    const value = input.value.toLowerCase();
    output.innerHTML = "";

    if (value.length === 0) return;

    const filtered = airports.filter(ap => ap.toLowerCase().includes(value));
    const suggestions = document.createElement('div');
    suggestions.className = 'suggestion-box';

    filtered.forEach(ap => {
      const p = document.createElement('p');
      p.textContent = ap;
      p.onclick = () => {
        input.value = ap;
        output.innerHTML = "";
      };
      suggestions.appendChild(p);
    });

    output.appendChild(suggestions);
  }

  // 3. Search Button Popup
  const searchBtn = document.querySelector(".search-button");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const from = document.getElementById("from").value;
      const to = document.getElementById("to").value;
      const dep = document.getElementById("departure").value;
      const ret = document.getElementById("return").value;
      const traveller = document.getElementById("travellers").value;

      alert(`Searching Flights:\nFrom: ${from}\nTo: ${to}\nDeparture: ${dep}\nReturn: ${ret || "N/A"}\nTravellers: ${traveller}`);
    });
  }

  // Expose functions to HTML
  window.updateAirport = updateAirport;
  window.updateDay = updateDay;

});
      //flight section js ends
       //hotel section js starts

document.addEventListener("DOMContentLoaded", function () {
  // Tab Switching
  document.querySelectorAll('.hotel-type-item a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.hotel-type-item a').forEach(l => l.classList.remove('active-trip'));
      this.classList.add('active-trip');
    });
  });

  // Autocomplete
  const locations = [
    "Delhi", "Mumbai", "Goa", "Jaipur", "Hyderabad", "Bangalore",
    "Chennai", "Kolkata", "Pune", "Udaipur", "Shimla", "Varanasi"
  ];
  const locationInput = document.getElementById("hotel-location");
  const locationOutput = document.getElementById("hotel-location-suggestions");

  locationInput.addEventListener("input", () => {
    const value = locationInput.value.toLowerCase();
    locationOutput.innerHTML = "";
    if (!value) return;

    const matched = locations.filter(loc => loc.toLowerCase().includes(value));
    const box = document.createElement("div");
    box.className = "suggestion-box";

    matched.forEach(loc => {
      const p = document.createElement("p");
      p.textContent = loc;
      p.onclick = () => {
        locationInput.value = loc;
        locationOutput.innerHTML = "";
      };
      box.appendChild(p);
    });

    locationOutput.appendChild(box);
  });

  // Day Display
  function updateDay(inputId, outputId) {
    const input = document.getElementById(inputId);
    const output = document.getElementById(outputId);
    const value = input.value;
    if (!value) {
      output.textContent = "";
      return;
    }
    const date = new Date(value);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    output.textContent = day;
  }

  document.getElementById("checkin").addEventListener("change", () => {
    updateDay("checkin", "checkin-day");
  });

  document.getElementById("checkout").addEventListener("change", () => {
    updateDay("checkout", "checkout-day");
  });

  // Search Button
  document.querySelector(".hotel-search-button").addEventListener("click", () => {
    const location = locationInput.value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const guests = document.getElementById("guests").value;
    const offer = document.querySelector('input[name="hotel-offer"]:checked')?.value || "None";

    if (!location || !checkin || !checkout || !guests) {
      alert("❗ Please fill in all fields.");
      return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
      alert("❗ Check-out must be after check-in.");
      return;
    }

    alert(`✅ Searching Hotels:
📍 Location: ${location}
📅 Check-in: ${checkin}
📅 Check-out: ${checkout}
🛏️ Guests/Rooms: ${guests}
🏷️ Offer: ${offer}`);
  });
});
         // hotel section js here ends
         // Train section JS starts
document.addEventListener("DOMContentLoaded", function () {
  // Tab Switching
  document.querySelectorAll('.train-type-item a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.train-type-item a').forEach(l => l.classList.remove('train-active-type'));
      this.classList.add('train-active-type');
    });
  });

  // Autocomplete
  const stations = [
    "New Delhi", "Mumbai Central", "Howrah", "Chennai Central",
    "Secunderabad", "Bengaluru", "Lucknow", "Patna", "Varanasi",
    "Ahmedabad", "Kolkata", "Jaipur"
  ];

  const fromInput = document.getElementById("from-station");
  const toInput = document.getElementById("to-station");
  const fromOutput = document.getElementById("from-suggestions");
  const toOutput = document.getElementById("to-suggestions");

  function handleAutocomplete(input, output) {
    input.addEventListener("input", () => {
      const value = input.value.toLowerCase();
      output.innerHTML = "";
      if (!value) return;

      const matched = stations.filter(st => st.toLowerCase().includes(value));
      const box = document.createElement("div");
      box.className = "suggestion-box";

      matched.forEach(st => {
        const p = document.createElement("p");
        p.textContent = st;
        p.onclick = () => {
          input.value = st;
          output.innerHTML = "";
        };
        box.appendChild(p);
      });

      output.appendChild(box);
    });
  }

  handleAutocomplete(fromInput, fromOutput);
  handleAutocomplete(toInput, toOutput);

  // Day Display
  const journeyInput = document.getElementById("journey-date");
  const journeyDay = document.getElementById("journey-day");

  journeyInput.addEventListener("change", () => {
    const value = journeyInput.value;
    if (!value) {
      journeyDay.textContent = "";
      return;
    }
    const date = new Date(value);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    journeyDay.textContent = day;
  });

  // Search Button
  document.querySelector(".train-search-button").addEventListener("click", () => {
    const from = fromInput.value;
    const to = toInput.value;
    const date = journeyInput.value;
    const trainClass = document.getElementById("train-class").value;
    const option = document.querySelector('input[name="train-option"]:checked')?.value || "None";

    if (!from || !to || !date || !trainClass) {
      alert("❗ Please fill in all fields.");
      return;
    }

    alert(`✅ Searching Trains:
🚉 From: ${from}
🚉 To: ${to}
📅 Date: ${date}
🛏️ Class: ${trainClass}
🎟️ Option: ${option}`);
  });
});
// Train section JS ends
// Bus section JS starts
document.addEventListener("DOMContentLoaded", function () {
  // Tab Switching
  document.querySelectorAll('.bus-type-item a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.bus-type-item a').forEach(l => l.classList.remove('bus-active-type'));
      this.classList.add('bus-active-type');
    });
  });

  // Autocomplete
  const cities = [
    "Delhi", "Mumbai", "Hyderabad", "Bengaluru", "Chennai",
    "Kolkata", "Pune", "Jaipur", "Lucknow", "Nagpur", "Indore"
  ];

  const fromInput = document.getElementById("bus-from");
  const toInput = document.getElementById("bus-to");
  const fromOutput = document.getElementById("bus-from-suggestions");
  const toOutput = document.getElementById("bus-to-suggestions");

  function handleAutocomplete(input, output) {
    input.addEventListener("input", () => {
      const value = input.value.toLowerCase();
      output.innerHTML = "";
      if (!value) return;

      const matched = cities.filter(city => city.toLowerCase().includes(value));
      const box = document.createElement("div");
      box.className = "suggestion-box";

      matched.forEach(city => {
        const p = document.createElement("p");
        p.textContent = city;
        p.onclick = () => {
          input.value = city;
          output.innerHTML = "";
        };
        box.appendChild(p);
      });

      output.appendChild(box);
    });
  }

  handleAutocomplete(fromInput, fromOutput);
  handleAutocomplete(toInput, toOutput);

  // Day Display
  const dateInput = document.getElementById("bus-date");
  const dayOutput = document.getElementById("bus-day");

  dateInput.addEventListener("change", () => {
    const value = dateInput.value;
    if (!value) {
      dayOutput.textContent = "";
      return;
    }
    const date = new Date(value);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    dayOutput.textContent = day;
  });

  // Search Button
  document.querySelector(".bus-search-button").addEventListener("click", () => {
    const from = fromInput.value;
    const to = toInput.value;
    const date = dateInput.value;
    const type = document.getElementById("bus-type").value;
    const option = document.querySelector('input[name="bus-option"]:checked')?.value || "None";

    if (!from || !to || !date || !type) {
      alert("❗ Please fill in all fields.");
      return;
    }

    alert(`✅ Searching Buses:
🚌 From: ${from}
🚌 To: ${to}
📅 Date: ${date}
🪑 Type: ${type}
🎟️ Option: ${option}`);
  });
});
// Bus section JS ends
// Cab section JS starts
document.addEventListener("DOMContentLoaded", function () {
  // Tab Switching
  document.querySelectorAll('.cab-type-item a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.cab-type-item a').forEach(l => l.classList.remove('cab-active-type'));
      this.classList.add('cab-active-type');
    });
  });

  // Autocomplete
  const places = [
    "Delhi", "Mumbai", "Bangalore", "Chandigarh", "Noida", "Gurgaon",
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Indore"
  ];

  const pickupInput = document.getElementById("pickup-location");
  const dropInput = document.getElementById("drop-location");
  const pickupOutput = document.getElementById("pickup-suggestions");
  const dropOutput = document.getElementById("drop-suggestions");

  function handleAutocomplete(input, output) {
    input.addEventListener("input", () => {
      const value = input.value.toLowerCase();
      output.innerHTML = "";
      if (!value) return;

      const matched = places.filter(loc => loc.toLowerCase().includes(value));
      const box = document.createElement("div");
      box.className = "suggestion-box";

      matched.forEach(loc => {
        const p = document.createElement("p");
        p.textContent = loc;
        p.onclick = () => {
          input.value = loc;
          output.innerHTML = "";
        };
        box.appendChild(p);
      });

      output.appendChild(box);
    });
  }

  handleAutocomplete(pickupInput, pickupOutput);
  handleAutocomplete(dropInput, dropOutput);

  // Day Display
  const dateInput = document.getElementById("pickup-date");
  const dayOutput = document.getElementById("pickup-day");

  dateInput.addEventListener("change", () => {
    const value = dateInput.value;
    if (!value) {
      dayOutput.textContent = "";
      return;
    }
    const date = new Date(value);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    dayOutput.textContent = day;
  });

  // Search Button
  document.querySelector(".cab-search-button").addEventListener("click", () => {
    const pickup = pickupInput.value;
    const drop = dropInput.value;
    const date = dateInput.value;
    const cabType = document.getElementById("cab-type").value;
    const option = document.querySelector('input[name="cab-option"]:checked')?.value || "None";

    if (!pickup || !drop || !date || !cabType) {
      alert("❗ Please fill in all fields.");
      return;
    }

    alert(`✅ Searching Cabs:
📍 Pickup: ${pickup}
📍 Drop: ${drop}
📅 Date: ${date}
🚕 Type: ${cabType}
🎯 Option: ${option}`);
  });
});

// Cab section JS ends

//login and sign up page

function showForm(type) {
  document.getElementById('authModal').style.display = 'flex';
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('signupForm').classList.add('hidden');

  if (type === 'login') {
    document.getElementById('loginForm').classList.remove('hidden');
  } else {
    document.getElementById('signupForm').classList.remove('hidden');
  }
}

function hideForm() {
  document.getElementById('authModal').style.display = 'none';
}

// Toggle password visibility
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

// Simple form validation
function validateForm(event, type) {
  event.preventDefault();
  if (type === 'login') {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    if (!email || !pass) {
      alert("Please enter both email and password.");
      return false;
    }
    alert("Logged in successfully ✅");
  } else {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPass').value;
    if (!name || !email || !pass) {
      alert("All fields are required.");
      return false;
    }
    alert("Signed up successfully 🎉");
  }
  hideForm();
  return true;
}

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Message adding
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-bubble', sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Typing...
function showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.classList.add('loading-indicator');
    loadingDiv.textContent = 'Typing...';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) loadingDiv.remove();
}

// Gemini API integration
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';
    sendButton.disabled = true;
    showLoadingIndicator();

    try {
        const chatHistory = [{ role: "user", parts: [{ text: message }] }];
        const payload = { contents: chatHistory };
        const apiKey = "AIzaSyDNlA57npz-QyVlIEUNb48_77MTfWOB62Y";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error ${response.status}: ${errorData.error?.message}`);
        }

        const result = await response.json();
        removeLoadingIndicator();

        const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        addMessage(aiText || "No response from AI.", 'ai');
    } catch (error) {
        console.error("Error:", error);
        removeLoadingIndicator();
        addMessage("Error contacting AI. Please try again later.", 'ai');
    } finally {
        sendButton.disabled = false;
        userInput.focus();
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') sendMessage();
});

// Chat toggle and close
window.onload = () => {
    userInput.focus();

    const chatPopup = document.getElementById('chat-popup');
    const toggleButton = document.getElementById('chat-toggle-button');
    const closeButton = document.getElementById('chat-close-button');

    toggleButton?.addEventListener('click', () => {
        chatPopup?.classList.toggle('hidden');
    });

    closeButton?.addEventListener('click', () => {
        chatPopup?.classList.add('hidden');
    });
};


// BOOK NOW popup logic
const bookButtons = document.querySelectorAll(".book-btn");
const modal = document.getElementById("booking-modal");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".close-btn");
const confirmBtn = document.querySelector(".confirm-btn");

// Handle BOOK NOW clicks
bookButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const deal = this.closest(".deal");
    const destination = deal.querySelector("h2").textContent;
    const details = deal.querySelector("p").textContent;
    modalText.textContent = `You are booking a flight ${destination}, ${details}`;
    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
confirmBtn.addEventListener("click", () => {
  alert("Your booking is confirmed! ✅");
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// MONTH BUTTON logic
const monthButtons = document.querySelectorAll(".month-buttons button");

monthButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active from all
    monthButtons.forEach((b) => b.classList.remove("active"));
    // Add active to clicked one
    this.classList.add("active");

    // 🟡 Optional future logic: filter deals by month
    console.log("Selected month:", this.textContent);
  });
});

