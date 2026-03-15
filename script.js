const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const themeToggle = document.getElementById('btn-tema');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

themeToggle.addEventListener('click', toggleTheme);

const viewProjectsBtn = document.getElementById('ver-proyectos');
viewProjectsBtn.addEventListener('click', function() {
    document.getElementById('proyectos').scrollIntoView({
        behavior: 'smooth'
    });
});

async function loadGitHubProjects() {
    const container = document.getElementById('contenedor-proyectos');
    container.innerHTML = '<div class="loading">Cargando proyectos...</div>';

    try {
        const response = await fetch('https://api.github.com/users/daydev01-ui/repos?sort=updated&per_page=6');
        if (!response.ok) {
            throw new Error('No se pudieron cargar los proyectos');
        }
        const repos = await response.json();

        container.innerHTML = '';

        repos.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-icon">
                    <i class="fab fa-github"></i>
                </div>
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Proyecto interesante en desarrollo'}</p>
                <div class="tech-stack">
                    ${repo.language ? `<span class="tech">${repo.language}</span>` : ''}
                    <span class="tech">${repo.stargazers_count} ⭐</span>
                    <span class="tech">${repo.forks_count} 🍴</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="btn btn-outline" style="margin-top: 1rem; padding: 8px 16px; font-size: 0.9rem;">
                    <i class="fab fa-github"></i> Ver en GitHub
                </a>
            `;
            container.appendChild(projectCard);
        });

        if (repos.length === 0) {
            container.innerHTML = '<p>No hay proyectos públicos disponibles.</p>';
        }
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>No se pudieron cargar los proyectos de GitHub.</p>
                <p>Verifica la conexión a internet o el nombre de usuario.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadGitHubProjects);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

const fallbackProjects = [
    {
        name: 'Sistema-Administrativo',
        description: 'Dashboard administrativo con métricas en tiempo real',
        language: 'C#',
        html_url: '#',
        stargazers_count: 5,
        forks_count: 2
    },
    {
        name: 'Pagos-QR',
        description: 'Integración de pagos digitales con QR',
        language: 'JavaScript',
        html_url: '#',
        stargazers_count: 8,
        forks_count: 3
    },
    {
        name: 'CRM-Basico',
        description: 'Sistema de gestión de clientes básico',
        language: 'PHP',
        html_url: '#',
        stargazers_count: 12,
        forks_count: 5
    }
];

console.log('Portafolio cargado exitosamente');
