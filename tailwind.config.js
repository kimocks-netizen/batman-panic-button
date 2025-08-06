module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add paths to your widget files
    "./src/components/FloatingWhatsAppButton.tsx",
    "./src/widget.tsx"
  ],
  theme: {
    extend: {
      animation: {
        'bounce-delay': 'bounce-delay 4s infinite',
      },
      keyframes: {
        'bounce-delay': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}