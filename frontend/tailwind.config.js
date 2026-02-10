module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e293b',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444'
      }
    }
  },
  plugins: []
}
