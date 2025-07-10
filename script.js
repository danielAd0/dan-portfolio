// Typewriter effect
const typewriter = document.querySelector('.typewriter');
const words = ["Hey, I'm Dan.", "I'm a Cybersecurity Nerd.", "I Code. I Build. I Secure."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = words[wordIndex];
  const displayed = current.slice(0, charIndex);
  typewriter.textContent = displayed;

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}
type();

// Load projects from JSON (needs to run on a server, not file://)
fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('project-cards');
    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `<h3>${p.title}</h3><p>${p.description}</p>`;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to load projects.json. Likely due to CORS - run via Live Server.", err);
  });

// Animate on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});

// EmailJS setup (wait until DOM is ready)
document.addEventListener("DOMContentLoaded", () => {
  const serviceID = 'service_wqj16oq';
  const templateID = 'template_veo36ao';
  const publicKey = 'U-cU7EwFrzHU6gcrK';

  if (typeof emailjs !== 'undefined') {
    emailjs.init(publicKey);
  } else {
    console.error("EmailJS not loaded");
    return;
  }

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');

    emailjs.send(serviceID, templateID, {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value
    })
    .then(() => {
      status.textContent = "✅ Message sent!";
      status.style.color = "green";
      form.reset();
    }, (err) => {
      console.error("EmailJS error:", err);
      status.textContent = "❌ Failed to send. Try again.";
      status.style.color = "red";
    });
  });
});
