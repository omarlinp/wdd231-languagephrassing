// Function to apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// 1. On Load: Check localStorage for saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// 2. Profile Page Logic: Handle the dropdown change
const themeSelect = document.getElementById('theme');
if (themeSelect) {
    // Set the dropdown to match the current saved theme
    themeSelect.value = savedTheme;

    // Listen for changes
    themeSelect.addEventListener('change', (e) => {
        const newTheme = e.target.value;
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}