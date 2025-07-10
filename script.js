// Load projects dynamically from projects.json
fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('project-cards');
    projects.forEach(proj => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.innerHTML = `
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Failed to load projects:', err));

// Contact form handling with EmailJS (you'll need to setup your EmailJS account)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Simple validation
  if (!form.name.value || !form.email.value || !form.message.value) {
    status.textContent = 'Please fill in all fields.';
    status.style.color = 'red';
    return;
  }

  // Replace with your own EmailJS user ID and template ID
  const YOUR_SERVICE_ID = 'service_wqj16oq';
  const YOUR_TEMPLATE_ID = 'template_veo36ao';
  const YOUR_PUBLIC_KEY = 'U-cU7EwFrzHU6gcrK';

  status.textContent = 'Sending...';
  status.style.color = 'white';

  emailjs.init(YOUR_PUBLIC_KEY);

  emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, {
    from_name: form.name.value,
    from_email: form.email.value,
    message: form.message.value,
  })
    .then(() => {
      status.textContent = 'Message sent! Thank you.';
      status.style.color = 'lightgreen';
      form.reset();
    }, (error) => {
      console.error('FAILED...', error);
      status.textContent = 'Failed to send message. Try again later.';
      status.style.color = 'red';
    });
});
