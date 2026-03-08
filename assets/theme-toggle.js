/**
 * Theme Toggle - Dark Mode Support
 * Features: Theme toggle button, system preference detection, localStorage persistence, smooth transitions
 */

(function() {
    'use strict';

    // Theme configuration
    const THEME_KEY = 'ai-insights-theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    /**
     * Get the current theme from localStorage or system preference
     */
    function getPreferredTheme() {
        const storedTheme = localStorage.getItem(THEME_KEY);
        if (storedTheme) {
            return storedTheme;
        }
        // Fall back to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
    }

    /**
     * Apply theme to document
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleButton(theme);
    }

    /**
     * Update toggle button icon based on current theme
     */
    function updateToggleButton(theme) {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        if (theme === DARK_THEME) {
            toggleBtn.setAttribute('aria-label', 'Zum hellen Modus wechseln');
            toggleBtn.innerHTML = '☀️';
        } else {
            toggleBtn.setAttribute('aria-label', 'Zum dunklen Modus wechseln');
            toggleBtn.innerHTML = '🌙';
        }
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        const theme = getPreferredTheme();
        applyTheme(theme);

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only update if user hasn't manually set a preference
            if (!localStorage.getItem(THEME_KEY)) {
                applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Expose toggle function globally for button onclick
    window.toggleTheme = toggleTheme;
})();
