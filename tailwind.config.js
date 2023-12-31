/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-yellow-400',
    'bg-red-400',
    'bg-blue-400',
    'bg-pink-400',
    'bg-green-400',
    'bg-gray-400',
    'bg-yellow-500',
    'bg-red-500',
    'bg-blue-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-gray-500',
    'bg-yellow-600',
    'bg-red-600',
    'bg-blue-600',
    'bg-pink-600',
    'bg-green-600',
    'bg-gray-600',
    'text-yellow-500',
    'text-red-500',
    'text-blue-500',
    'text-pink-500',
    'text-green-500',
    'text-gray-500',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}