// Simple Router
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    // Use event delegation for dynamically added links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (link && link.hasAttribute('href')) {
        e.preventDefault();
        this.navigate(link.dataset.route, link.getAttribute('href'));
      }
    });
    this.handleRoute();
  }

  register(route, handler) {
    this.routes[route] = handler;
  }

  navigate(route, path) {
    if (path) {
      window.history.pushState({}, '', path);
    }
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    
    // Route matching
    let matched = false;
    for (const [route, handler] of Object.entries(this.routes)) {
      const pattern = route.replace(/:[^/]+/g, '([^/]+)');
      const regex = new RegExp(`^${pattern}$`);
      const match = path.match(regex);
      
      if (match) {
        matched = true;
        const params = match.slice(1);
        handler(...params);
        this.updateActiveNav(path);
        break;
      }
    }

    if (!matched && this.routes['404']) {
      this.routes['404']();
    }
  }

  updateActiveNav(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === path || 
          (path.startsWith('/jobs') && link.dataset.route === 'jobs')) {
        link.classList.add('active');
      }
    });
  }
}

const router = new Router();

