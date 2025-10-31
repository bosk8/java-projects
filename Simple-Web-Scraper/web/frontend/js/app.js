// Main Application
const app = {
  container: null,
  jobs: [],
  currentJob: null,
  websocket: null,

  init() {
    this.container = document.getElementById('app-container');
    if (!this.container) {
      console.error('App container not found');
      return;
    }
    
    this.setupMobileNav();
    this.setupRoutes();
    router.handleRoute();
  },
  
  setupMobileNav() {
    // Show hamburger on mobile
    const toggle = document.querySelector('.navbar-toggle');
    if (toggle && window.innerWidth < 768) {
      toggle.style.display = 'block';
    }
    
    window.addEventListener('resize', () => {
      if (toggle) {
        toggle.style.display = window.innerWidth < 768 ? 'block' : 'none';
      }
      const links = document.querySelector('.navbar-links');
      if (links && window.innerWidth >= 768) {
        links.style.display = 'flex';
      }
    });
  },
  
  toggleMobileNav() {
    const links = document.querySelector('.navbar-links');
    if (links) {
      links.classList.toggle('show');
    }
  },

  setupRoutes() {
    router.register('/', () => this.renderDashboard());
    router.register('/dashboard', () => this.renderDashboard());
    router.register('/jobs/new', () => this.renderCreateJob());
    router.register('/jobs/:id', (id) => this.renderJobDetails(id));
    router.register('/jobs/:id/execution', (id) => this.renderExecution(id));
    router.register('/help', () => this.renderHelp());
    router.register('404', () => this.render404());
  },

  // Dashboard
  async renderDashboard() {
    this.container.innerHTML = `
      <div class="dashboard-hero">
        <h1>SIMPLE WEB SCRAPER</h1>
        <p>SCRAPE, EXTRACT, EXPORT</p>
      </div>
      
      <div class="cta-card card card-padding-lg">
        <a href="/jobs/new" class="btn btn-primary btn-lg btn-full" data-route="create-job">NEW JOB</a>
      </div>
      
      <section class="card card-padding-md">
        <h2 class="label" style="margin-bottom: var(--space-lg);">RECENT JOBS</h2>
        <div id="jobs-list"></div>
      </section>
    `;

    try {
      const response = await api.getJobs();
      this.jobs = response.jobs || [];
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => this.renderJobList(), 0);
    } catch (error) {
      this.showError('Failed to load jobs: ' + (error.message || 'Network error'));
      // Show empty state on error
      const list = document.getElementById('jobs-list');
      if (list) {
        list.innerHTML = `
          <div class="empty-state">
            <h2>ERROR LOADING JOBS</h2>
            <p>Unable to connect to the server. Please check your connection.</p>
          </div>
        `;
      }
    }
  },

  renderJobList() {
    const list = document.getElementById('jobs-list');
    if (!list) return;
    
    if (this.jobs.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <h2>NO JOBS YET</h2>
          <p>Create your first scraping job to get started.</p>
          <a href="/jobs/new" class="btn btn-primary" data-route="create-job">CREATE JOB</a>
        </div>
      `;
      return;
    }

    list.innerHTML = this.jobs.map(job => {
      const safeId = this.escape(job.id || '');
      const safeUrl = this.truncate(this.escape(job.urls?.[0] || 'N/A'), 50);
      const pagesScraped = job.progress?.pagesScraped || 0;
      const status = this.escape(job.status || 'UNKNOWN');
      return `
        <div class="job-item" onclick="app.goToJob('${safeId}')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')app.goToJob('${safeId}')">
          <div class="job-info">
            <span class="meta">JOB #${this.formatJobId(job.id)}</span>
            <span class="meta-sm">${safeUrl}</span>
            ${job.progress ? `<span class="meta-sm">${pagesScraped} pages scraped</span>` : ''}
          </div>
          <span class="badge ${this.getStatusClass(job.status)}">${status}</span>
        </div>
      `;
    }).join('');
  },

  // Create Job
  renderCreateJob() {
    this.container.innerHTML = `
      <div class="breadcrumbs">
        <a href="/" data-route="dashboard">DASHBOARD</a> > <a href="/jobs" data-route="jobs">JOBS</a> > NEW JOB
      </div>
      
      <h1 class="tagline" style="margin-bottom: var(--space-xl);">CREATE NEW SCRAPING JOB</h1>
      
      <form class="create-job-form card card-padding-lg" id="create-job-form">
        <div class="form-field">
          <label for="urls" class="label">URLS *</label>
          <div id="url-inputs"></div>
          <button type="button" class="btn btn-secondary btn-sm add-url-btn" onclick="app.addUrlInput()">+ ADD URL</button>
        </div>
        
        <div class="form-field">
          <label for="container-selector" class="label">CONTAINER SELECTOR *</label>
          <input type="text" id="container-selector" class="input" placeholder="article, .item, .product" required />
        </div>
        
        <div class="form-field">
          <label for="title-selector" class="label">TITLE SELECTOR *</label>
          <input type="text" id="title-selector" class="input" placeholder="h1, h2, h3, .title" required />
        </div>
        
        <div class="form-field">
          <label for="description-selector" class="label">DESCRIPTION SELECTOR</label>
          <input type="text" id="description-selector" class="input" placeholder="p, .description" />
        </div>
        
        <div class="form-field">
          <label for="url-selector" class="label">URL SELECTOR</label>
          <input type="text" id="url-selector" class="input" placeholder="a" />
        </div>
        
        <div class="form-field">
          <button type="button" class="btn btn-secondary" onclick="app.testSelectors()">TEST SELECTORS</button>
        </div>
        
        <div class="accordion-item" id="advanced-settings">
          <button type="button" class="accordion-trigger" onclick="app.toggleAccordion('advanced-settings')">
            ADVANCED SETTINGS
            <span>▼</span>
          </button>
          <div class="accordion-content">
            <div class="form-field">
              <label for="rate-limit" class="label">RATE LIMIT (MS)</label>
              <input type="number" id="rate-limit" class="input" value="2000" min="100" max="60000" />
            </div>
            
            <div class="form-field">
              <label for="user-agent" class="label">USER AGENT</label>
              <input type="text" id="user-agent" class="input" value="SimpleWebScraper/1.0" />
            </div>
            
            <div class="form-field">
              <label style="display: flex; align-items: center; gap: var(--space-xs);">
                <input type="checkbox" id="respect-robots" checked />
                <span class="label">RESPECT ROBOTS.TXT</span>
              </label>
            </div>
            
            <div class="form-field">
              <label for="max-pages" class="label">MAX PAGES</label>
              <input type="number" id="max-pages" class="input" placeholder="unlimited" />
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="router.navigate('dashboard', '/')">CANCEL</button>
          <button type="submit" class="btn btn-primary">START SCRAPING</button>
        </div>
      </form>
    `;

    this.addUrlInput();
    document.getElementById('create-job-form').addEventListener('submit', (e) => this.handleCreateJob(e));
  },

  addUrlInput() {
    const container = document.getElementById('url-inputs');
    if (!container) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'url-input-wrapper';
    const input = document.createElement('input');
    input.type = 'url';
    input.className = 'input';
    input.placeholder = 'https://example.com';
    input.required = true;
    input.setAttribute('aria-label', 'URL to scrape');
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-secondary btn-sm';
    removeBtn.textContent = 'REMOVE';
    removeBtn.onclick = () => wrapper.remove();
    
    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    container.appendChild(wrapper);
    
    // Focus on new input
    input.focus();
  },

  async handleCreateJob(e) {
    e.preventDefault();
    
    const urls = Array.from(document.querySelectorAll('#url-inputs input')).map(input => input.value).filter(Boolean);
    if (urls.length === 0) {
      this.showError('At least one URL is required');
      return;
    }

    const jobData = {
      urls,
      selectors: {
        containerSelector: document.getElementById('container-selector').value,
        titleSelector: document.getElementById('title-selector').value,
        descriptionSelector: document.getElementById('description-selector').value,
        urlSelector: document.getElementById('url-selector').value,
      },
      config: {
        rateLimitMs: parseInt(document.getElementById('rate-limit').value) || 2000,
        userAgent: document.getElementById('user-agent').value || 'SimpleWebScraper/1.0',
        respectRobots: document.getElementById('respect-robots').checked,
        maxPages: document.getElementById('max-pages').value ? parseInt(document.getElementById('max-pages').value) : null,
      },
    };

    try {
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'STARTING...';
      
      const response = await api.createJob(jobData);
      if (response && response.job && response.job.id) {
        const safeId = encodeURIComponent(String(response.job.id));
        router.navigate('job-details', `/jobs/${safeId}`);
      } else {
        this.showError('Invalid response from server');
      }
    } catch (error) {
      this.showError(error.message || 'Failed to create job');
      e.target.querySelector('button[type="submit"]').disabled = false;
    }
  },

  // Job Details
  async renderJobDetails(id) {
    const safeId = this.escape(id);
    const safeJobIdDisplay = this.escape(this.formatJobId(id));
    this.container.innerHTML = `
      <div class="breadcrumbs">
        <a href="/" data-route="dashboard">DASHBOARD</a> > <a href="/jobs" data-route="jobs">JOBS</a> > JOB #${safeJobIdDisplay}
      </div>
      
      <div class="status-header">
        <span class="meta">JOB #${safeJobIdDisplay}</span>
        <span class="badge badge-default" id="job-status">LOADING...</span>
      </div>
      
      <section class="card card-padding-md">
        <h2 class="label" style="margin-bottom: var(--space-md);">PROGRESS</h2>
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill" style="width: 0%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span class="progress-label" id="progress-label">0%</span>
      </section>
      
      <section class="card card-padding-md config-section">
        <h2 class="label" style="margin-bottom: var(--space-md);">CONFIGURATION</h2>
        <div id="config-details"></div>
      </section>
      
      <section class="card card-padding-md" id="results-section" style="display: none;">
        <div class="results-header">
          <h2 class="label">RESULTS (<span id="results-count">0</span>)</h2>
          <div class="export-actions">
            <button class="btn btn-secondary" data-job-id="${safeId}" onclick="app.exportJob(this.dataset.jobId, 'csv')">EXPORT CSV</button>
            <button class="btn btn-secondary" data-job-id="${safeId}" onclick="app.exportJob(this.dataset.jobId, 'jsonl')">EXPORT JSONL</button>
          </div>
        </div>
        <div id="results-table"></div>
      </section>
      
      <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm); justify-content: flex-end;">
        <button id="view-execution-btn" class="btn btn-secondary" style="display: none;" data-job-id="${safeId}" onclick="router.navigate('execution', '/jobs/' + encodeURIComponent(this.dataset.jobId) + '/execution')">VIEW LIVE EXECUTION</button>
        <button id="cancel-btn" class="btn btn-destructive" style="display: none;" data-job-id="${safeId}" onclick="app.cancelJob(this.dataset.jobId)">CANCEL</button>
      </div>
    `;

    try {
      const job = await api.getJob(id);
      this.currentJob = job;
      this.updateJobDetails(job);
      
      if (job.status === 'RUNNING') {
        this.connectWebSocket(id);
      }
    } catch (error) {
      this.showError('Failed to load job details');
    }
  },

  updateJobDetails(job) {
    const statusEl = document.getElementById('job-status');
    if (statusEl) {
      statusEl.textContent = job.status || 'UNKNOWN';
      statusEl.className = `badge ${this.getStatusClass(job.status)}`;
    }
    
    if (job.progress) {
      const percentage = job.progress.percentage || 0;
      const progressFill = document.getElementById('progress-fill');
      const progressLabel = document.getElementById('progress-label');
      
      if (progressFill) {
        progressFill.style.width = `${percentage}%`;
        progressFill.setAttribute('aria-valuenow', percentage);
      }
      
      if (progressLabel) {
        progressLabel.textContent = `${percentage}% · ${job.progress.pagesScraped || 0} pages scraped`;
      }
    }

    // Configuration
    const configDiv = document.getElementById('config-details');
    if (configDiv) {
      const safeUrl = this.escape(job.urls?.[0] || 'N/A');
      const safeContainer = this.escape(job.selectors?.containerSelector || 'N/A');
      const safeTitle = this.escape(job.selectors?.titleSelector || 'N/A');
      
      configDiv.innerHTML = `
        <div class="config-item"><span class="config-label">URL:</span><span class="config-value">${safeUrl}</span></div>
        <div class="config-item"><span class="config-label">Container:</span><span class="config-value">${safeContainer}</span></div>
        <div class="config-item"><span class="config-label">Title:</span><span class="config-value">${safeTitle}</span></div>
      `;
    }

    // Actions
    const viewBtn = document.getElementById('view-execution-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    
    if (job.status === 'RUNNING') {
      if (viewBtn) viewBtn.style.display = 'inline-block';
      if (cancelBtn) cancelBtn.style.display = 'inline-block';
    } else {
      if (viewBtn) viewBtn.style.display = 'none';
      if (cancelBtn) cancelBtn.style.display = 'none';
    }

    // Results
    const resultsSection = document.getElementById('results-section');
    if (job.status === 'COMPLETED' && job.results) {
      if (resultsSection) resultsSection.style.display = 'block';
      this.renderResults(job.results);
    } else if (resultsSection) {
      resultsSection.style.display = 'none';
    }
  },

  async renderResults(results) {
    const tableEl = document.getElementById('results-table');
    const countEl = document.getElementById('results-count');
    
    if (!tableEl) return;
    
    if (!results || results.length === 0) {
      tableEl.innerHTML = '<p class="meta">No results found</p>';
      if (countEl) countEl.textContent = '0';
      return;
    }

    if (countEl) countEl.textContent = results.length.toString();
    
    const safeResults = results.slice(0, 50).map(r => ({
      title: this.escape(r.title || ''),
      description: this.truncate(this.escape(r.description || ''), 50),
      url: this.escape(r.url || ''),
      price: this.escape(r.price || '')
    }));
    
    const table = `
      <table class="data-table" aria-label="Scraped data results">
        <thead>
          <tr>
            <th scope="col">TITLE</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">URL</th>
            <th scope="col">PRICE</th>
          </tr>
        </thead>
        <tbody>
          ${safeResults.map(r => `
            <tr>
              <td>${r.title}</td>
              <td>${r.description}</td>
              <td>${r.url}</td>
              <td>${r.price}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      ${results.length > 50 ? `<p class="meta-sm" style="margin-top: var(--space-sm);">Showing 50 of ${results.length} results</p>` : ''}
    `;
    tableEl.innerHTML = table;
  },

  async exportJob(id, format) {
    try {
      await api.exportJob(id, format);
    } catch (error) {
      this.showError('Export failed: ' + error.message);
    }
  },

  async cancelJob(id) {
    if (!confirm('Are you sure you want to cancel this job?')) return;
    
    try {
      await api.cancelJob(id);
      this.renderJobDetails(id); // Refresh
    } catch (error) {
      this.showError('Failed to cancel job');
    }
  },

  // Execution View
  async renderExecution(id) {
    const safeId = this.escape(id);
    const safeJobIdDisplay = this.escape(this.formatJobId(id));
    this.container.innerHTML = `
      <div class="breadcrumbs">
        <a href="/" data-route="dashboard">DASHBOARD</a> > <a href="/jobs" data-route="jobs">JOBS</a> > <a href="/jobs/${safeId}" data-route="job-details">JOB #${safeJobIdDisplay}</a> > EXECUTION
      </div>
      
      <div class="execution-header">
        <h1 class="tagline">JOB #${safeJobIdDisplay} - LIVE EXECUTION</h1>
        <span class="badge badge-success" id="exec-status">RUNNING</span>
      </div>
      
      <section class="card card-padding-md">
        <h2 class="label" style="margin-bottom: var(--space-md);">OVERALL PROGRESS</h2>
        <div class="progress-bar">
          <div class="progress-fill" id="exec-progress" style="width: 0%" role="progressbar"></div>
        </div>
        <span class="progress-label" id="exec-progress-label">0%</span>
      </section>
      
      <section class="card card-padding-md">
        <h2 class="label" style="margin-bottom: var(--space-md);">LIVE LOG</h2>
        <div class="log-feed" id="log-feed"></div>
      </section>
      
      <div style="margin-top: var(--space-lg); text-align: right;">
        <button class="btn btn-destructive" data-job-id="${safeId}" onclick="app.cancelJob(this.dataset.jobId)">CANCEL JOB</button>
      </div>
    `;

    this.connectWebSocket(id);
    
    try {
      const job = await api.getJob(id);
      this.updateExecutionProgress(job.progress || {});
    } catch (error) {
      this.showError('Failed to load execution details');
    }
  },

  updateExecutionProgress(progress) {
    const percentage = progress.percentage || 0;
    const progressEl = document.getElementById('exec-progress');
    const labelEl = document.getElementById('exec-progress-label');
    
    if (progressEl) {
      progressEl.style.width = `${percentage}%`;
      progressEl.setAttribute('aria-valuenow', percentage);
    }
    
    if (labelEl) {
      labelEl.textContent = `${percentage}% · ${progress.pagesScraped || 0} pages · ${progress.recordsExtracted || 0} records`;
    }
  },

  addLogEntry(message, timestamp) {
    const feed = document.getElementById('log-feed');
    if (!feed) return;
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
      <span class="log-timestamp">${timestamp || new Date().toLocaleTimeString()}</span>
      <span class="log-message">${this.escape(message)}</span>
    `;
    feed.appendChild(entry);
    feed.scrollTop = feed.scrollHeight;
  },

  // WebSocket
  connectWebSocket(jobId) {
    if (this.websocket) {
      this.websocket.close();
    }
    
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }

    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = window.location.host || '127.0.0.1:5501';
    const wsUrl = `${wsProtocol}//${wsHost}/ws/jobs/${jobId}`;
    
    try {
      this.websocket = new WebSocket(wsUrl);
      
      this.websocket.onopen = () => {
        console.log('WebSocket connected');
      };
      
      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleWebSocketMessage(data, jobId);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };
      
      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Fallback to polling if WebSocket fails
        if (!this.pollInterval) {
          this.pollJobStatus(jobId);
        }
      };
      
      this.websocket.onclose = () => {
        console.log('WebSocket closed');
        // Fallback to polling
        if (!this.pollInterval) {
          this.pollJobStatus(jobId);
        }
      };
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      // Fallback to polling
      this.pollJobStatus(jobId);
    }
  },

  handleWebSocketMessage(data, jobId) {
    switch (data.event) {
      case 'job:status':
        const statusEl = document.getElementById('job-status');
        if (statusEl) {
          statusEl.textContent = data.status || 'UNKNOWN';
          statusEl.className = `badge ${this.getStatusClass(data.status)}`;
        }
        
        // Update execution status if on execution page
        const execStatusEl = document.getElementById('exec-status');
        if (execStatusEl) {
          execStatusEl.textContent = data.status || 'UNKNOWN';
          execStatusEl.className = `badge ${this.getStatusClass(data.status)}`;
        }
        break;
      case 'job:progress':
        const progressFill = document.getElementById('progress-fill');
        const progressLabel = document.getElementById('progress-label');
        
        if (progressFill && data.progress) {
          const percentage = data.progress.percentage || 0;
          progressFill.style.width = `${percentage}%`;
          progressFill.setAttribute('aria-valuenow', percentage);
        }
        
        if (progressLabel && data.progress) {
          const percentage = data.progress.percentage || 0;
          progressLabel.textContent = `${percentage}% · ${data.progress.pagesScraped || 0} pages scraped`;
        }
        
        if (document.getElementById('exec-progress') && data.progress) {
          this.updateExecutionProgress(data.progress);
        }
        break;
      case 'job:log':
        if (document.getElementById('log-feed')) {
          this.addLogEntry(data.message || '', data.timestamp);
        }
        break;
      case 'job:complete':
        if (jobId) {
          this.renderJobDetails(jobId);
        }
        break;
    }
  },

  pollJobStatus(jobId) {
    let intervalId = setInterval(async () => {
      try {
        const status = await api.getJobStatus(jobId);
        if (status && status.status !== 'COMPLETED' && status.status !== 'FAILED' && status.status !== 'CANCELLED') {
          this.handleWebSocketMessage({ event: 'job:progress', progress: status }, jobId);
        } else {
          clearInterval(intervalId);
          if (jobId) {
            this.renderJobDetails(jobId);
          }
        }
      } catch (error) {
        console.error('Polling failed:', error);
        clearInterval(intervalId);
      }
    }, 2000);
    
    // Store interval ID for cleanup
    this.pollInterval = intervalId;
  },

  // Help Page
  renderHelp() {
    this.container.innerHTML = `
      <div class="breadcrumbs">
        <a href="/" data-route="dashboard">DASHBOARD</a> > HELP
      </div>
      
      <h1 class="tagline" style="margin-bottom: var(--space-xl);">HELP</h1>
      
      <section class="card card-padding-lg">
        <h2 class="label" style="margin-bottom: var(--space-md);">GETTING STARTED</h2>
        <div class="meta" style="margin-bottom: var(--space-md);">
          <p>To create a scraping job:</p>
          <ol style="margin-left: var(--space-lg); margin-top: var(--space-sm);">
            <li>Click "NEW JOB" on the dashboard</li>
            <li>Enter at least one URL to scrape</li>
            <li>Configure CSS selectors for data extraction</li>
            <li>Optionally test selectors before starting</li>
            <li>Click "START SCRAPING" to begin</li>
          </ol>
        </div>
      </section>
      
      <section class="card card-padding-lg">
        <h2 class="label" style="margin-bottom: var(--space-md);">CSS SELECTORS</h2>
        <div class="meta">
          <p>Use CSS selectors to extract data:</p>
          <ul style="margin-left: var(--space-lg); margin-top: var(--space-sm);">
            <li><strong>Container:</strong> Selects the wrapper element (e.g., "article", ".product")</li>
            <li><strong>Title:</strong> Selects the title element (e.g., "h1", ".title")</li>
            <li><strong>Description:</strong> Selects description text (e.g., "p", ".description")</li>
            <li><strong>URL:</strong> Selects link elements (e.g., "a")</li>
          </ul>
        </div>
      </section>
      
      <section class="card card-padding-lg">
        <h2 class="label" style="margin-bottom: var(--space-md);">TROUBLESHOOTING</h2>
        <div class="meta">
          <p><strong>No data extracted:</strong> Check your selectors match the page structure</p>
          <p><strong>Job failed:</strong> Verify the URL is accessible and check robots.txt settings</p>
          <p><strong>Slow scraping:</strong> Increase rate limit delay in advanced settings</p>
        </div>
      </section>
    `;
  },

  // 404
  render404() {
    this.container.innerHTML = `
      <div class="empty-state">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/" class="btn btn-primary" data-route="dashboard">GO TO DASHBOARD</a>
      </div>
    `;
  },

  // Utilities
  goToJob(id) {
    if (!id) return;
    const safeId = encodeURIComponent(String(id));
    router.navigate('job-details', `/jobs/${safeId}`);
  },

  toggleAccordion(id) {
    const item = document.getElementById(id);
    if (!item) return;
    
    const content = item.querySelector('.accordion-content');
    if (content) {
      content.classList.toggle('active');
      
      // Update arrow indicator
      const trigger = item.querySelector('.accordion-trigger');
      if (trigger) {
        const arrow = trigger.querySelector('span');
        if (arrow) {
          arrow.textContent = content.classList.contains('active') ? '▲' : '▼';
        }
      }
    }
  },

  getStatusClass(status) {
    const classes = {
      'RUNNING': 'badge-success',
      'COMPLETED': 'badge-default',
      'FAILED': 'badge-error',
      'CANCELLED': 'badge-default',
      'PENDING': 'badge-default',
    };
    return classes[status] || 'badge-default';
  },

  formatJobId(id) {
    if (!id) return 'UNKNOWN';
    const str = String(id);
    return str.substring(0, 8).toUpperCase();
  },

  truncate(str, length) {
    return str.length > length ? str.substring(0, length) + '...' : str;
  },

  escape(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast toast-error';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: var(--space-lg);
      right: var(--space-lg);
      background: var(--surface-card);
      border: var(--border-w) solid var(--text-primary);
      padding: var(--space-md);
      border-radius: var(--r-sm);
      z-index: 2000;
      color: var(--text-primary);
      font-size: 0.875rem;
      max-width: 300px;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  },

  showSuccess(message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: var(--space-lg);
      right: var(--space-lg);
      background: var(--surface-card);
      border: var(--border-w) solid var(--accent-success);
      padding: var(--space-md);
      border-radius: var(--r-sm);
      z-index: 2000;
      color: var(--text-primary);
      font-size: 0.875rem;
      max-width: 300px;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  // Test Selectors Modal
  async testSelectors() {
    const url = document.querySelector('#url-inputs input')?.value;
    const containerSelector = document.getElementById('container-selector').value;
    const titleSelector = document.getElementById('title-selector').value;
    const descriptionSelector = document.getElementById('description-selector').value;
    const urlSelector = document.getElementById('url-selector').value;

    if (!url) {
      this.showError('Please enter a URL first');
      return;
    }

    if (!containerSelector || !titleSelector) {
      this.showError('Container and Title selectors are required');
      return;
    }

    // Show loading modal
    const modal = this.showModal('TESTING SELECTORS...', '<div class="skeleton skeleton-text"></div>', false);
    
    try {
      const result = await api.testSelectors(url, {
        containerSelector,
        titleSelector,
        descriptionSelector,
        urlSelector,
      });

      // Show results modal
      modal.remove();
      this.showTestResultsModal(result);
    } catch (error) {
      modal.remove();
      this.showError('Selector test failed: ' + error.message);
    }
  },

  showTestResultsModal(result) {
    const matches = result.matches || 0;
    const sampleResults = result.sampleResults || [];
    const validation = result.validation || {};

    const modalContent = `
      <div style="margin-bottom: var(--space-lg);">
        <span class="meta">MATCHES FOUND: ${matches}</span>
      </div>
      ${Object.entries(validation).map(([selector, val]) => `
        <div style="margin-bottom: var(--space-sm);">
          <span class="label">${selector}:</span>
          <span class="meta ${val.valid ? 'badge-success' : 'badge-error'}">
            ${val.valid ? 'VALID' : 'INVALID'} (${val.matches || 0} matches)
          </span>
        </div>
      `).join('')}
      ${sampleResults.length > 0 ? `
        <div style="margin-top: var(--space-lg);">
          <h3 class="label" style="margin-bottom: var(--space-sm);">SAMPLE RESULTS</h3>
          <div style="max-height: 200px; overflow-y: auto;">
            ${sampleResults.slice(0, 5).map(r => `
              <div style="padding: var(--space-sm); border-bottom: var(--border-w) solid var(--border-color);">
                <div class="meta-sm" style="font-weight: bold;">${this.escape(r.title || 'N/A')}</div>
                <div class="meta-sm" style="color: var(--text-subtle);">${this.truncate(r.description || '', 50)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <div class="modal-footer" style="margin-top: var(--space-lg); border-top: var(--border-w) solid var(--border-color); padding-top: var(--space-md);">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">CLOSE</button>
      </div>
    `;

    this.showModal('SELECTOR TEST RESULTS', modalContent, true);
  },

  showModal(title, content, closable = true) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'modal-title');
    
    // Check if content already includes modal structure
    if (content.includes('modal-header')) {
      overlay.innerHTML = `
        <div class="modal modal-size-md">
          ${content}
        </div>
      `;
    } else {
      overlay.innerHTML = `
        <div class="modal modal-size-md">
          <div class="modal-header">
            <h2 id="modal-title" class="label">${title}</h2>
            ${closable ? '<button class="modal-close" onclick="this.closest(\'.modal-overlay\').remove()" aria-label="Close modal">×</button>' : ''}
          </div>
          <div class="modal-body">
            ${content}
          </div>
        </div>
      `;
    }
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && closable) {
        overlay.remove();
      }
    });

    // ESC key to close
    if (closable) {
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          overlay.remove();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    }

    document.body.appendChild(overlay);
    return overlay;
  },
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

