/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf7f5',
          100: '#f3ece6',
          300: '#c9b8a8',
          600: '#2b1a16',
          900: '#0d0604'
        }
      },
      boxShadow: {
        card: '6px 6px 0 0 #2b1a16'
      },
      borderRadius: {
        card: '12px'
      }
      ,
      fontFamily: {
        bio: ['JetBrains Mono', 'monospace']
      }
    }
  }
}
