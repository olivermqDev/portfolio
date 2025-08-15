
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.documentElement.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('✅ Gracias por tu mensaje. Me pondré en contacto contigo pronto.');
        contactForm.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          alert('⚠️ Error: ' + data.errors.map(err => err.message).join(', '));
        } else {
          throw new Error('Error desconocido');
        }
      }
    } catch (error) {
      alert('❌ Hubo un error al enviar el mensaje. Por favor inténtalo nuevamente.');
      console.error('Error al enviar el formulario:', error);
    }
  });
}
