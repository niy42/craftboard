/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include your HTML file if used
    './src/**/*.{js,ts,jsx,tsx}', // Scan all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors based on your Craftboard design
        'custom-green': '#4b5e40', // Matches the header title color
        'dashboard-bg': '#e0e7ff', // Matches Dashboard type background
        'mobile-bg': '#ffedd5', // Matches Mobile App type background
        'low-bg': '#d1fae5', // Matches Low priority background
        'medium-bg': '#fefcbf', // Matches Medium priority background
        'high-bg': '#fee2e2', // Matches High priority background
        'low-text': '#065f46', // Matches Low priority text
        'medium-text': '#854d0e', // Matches Medium priority text
        'high-text': '#991b1b', // Matches High priority text
      },
      spacing: {
        // Optional: Add custom spacing if needed
        '5.5': '1.375rem', // Example custom spacing
      },
      fontFamily: {
        // Extend font family if you want to use something other than the default
        // sans: ['Arial', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // Add plugins here if needed (e.g., @tailwindcss/typography)
    // require('@tailwindcss/typography'),
  ],
  safelist: [
    // Optional: Safelist classes to prevent purging (e.g., if dynamically generated)
    // 'bg-custom-green',
    // 'text-low-text',
  ],
}