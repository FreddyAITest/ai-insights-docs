// Cookie Consent Banner
(function() {
  const COOKIE_NAME = 'cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-text">
          <p>🍪 Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. 
          Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu. 
          <a href="/datenschutz.html" target="_blank">Mehr erfahren</a></p>
        </div>
        <div class="cookie-banner-buttons">
          <button id="cookie-accept" class="btn-accept">Akzeptieren</button>
          <button id="cookie-decline" class="btn-decline">Ablehnen</button>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--bg, #ffffff);
        border-top: 1px solid var(--border, #e2e8f0);
        box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.3s ease;
      }
      
      #cookie-banner.show {
        transform: translateY(0);
      }
      
      .cookie-banner-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        flex-wrap: wrap;
      }
      
      .cookie-banner-text {
        flex: 1;
        min-width: 300px;
      }
      
      .cookie-banner-text p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--text, #334155);
      }
      
      .cookie-banner-text a {
        color: var(--primary, #2563eb);
        text-decoration: underline;
      }
      
      .cookie-banner-buttons {
        display: flex;
        gap: 0.75rem;
      }
      
      .btn-accept, .btn-decline {
        padding: 0.625rem 1.25rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
      }
      
      .btn-accept {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      
      .btn-accept:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
      }
      
      .btn-decline {
        background: var(--bg-light, #f8fafc);
        color: var(--text, #334155);
        border: 1px solid var(--border, #e2e8f0);
      }
      
      .btn-decline:hover {
        background: var(--border, #e2e8f0);
      }
      
      @media (max-width: 768px) {
        .cookie-banner-content {
          flex-direction: column;
          text-align: center;
        }
        
        .cookie-banner-buttons {
          width: 100%;
          justify-content: center;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Show banner after delay
    setTimeout(() => {
      banner.classList.add('show');
    }, 1000);

    // Button handlers
    document.getElementById('cookie-accept').addEventListener('click', () => {
      setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
      hideBanner();
    });

    document.getElementById('cookie-decline').addEventListener('click', () => {
      setCookie(COOKIE_NAME, 'declined', COOKIE_EXPIRY_DAYS);
      hideBanner();
    });
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 300);
    }
  }

  // Initialize
  if (!getCookie(COOKIE_NAME)) {
    createBanner();
  }
})();
