# WordPress to TailwindCSS Conversion Reference

## Dashboard Components

### WordPress CSS → TailwindCSS Classes

| WordPress Class | TailwindCSS Class | Description |
|----------------|------------------|-------------|
| `.mlm-dashboard` | `bg-gray-50 p-5 rounded-lg shadow-sm mb-5` | Main dashboard container |
| `.mlm-stat-card` | `bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl text-center transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg` | Statistics card |
| `.mlm-stat-value` | `text-3xl font-bold mb-2` | Large value display |
| `.mlm-stat-label` | `text-sm opacity-90 uppercase tracking-wide` | Label text |

## Binary Tree Components

| WordPress Class | TailwindCSS Class | Description |
|----------------|------------------|-------------|
| `.mlm-binary-tree` | `bg-white rounded-2xl p-8 overflow-x-auto mb-5 shadow-lg` | Tree container |
| `.mlm-tree-node` | `inline-block mx-2.5 text-center relative` | Individual node |
| `.mlm-node-content` | `w-30 h-30 rounded-full flex items-center justify-center font-semibold text-white mb-2 relative cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg` | Node circle |
| `.mlm-node-active` | `bg-gradient-to-r from-green-500 to-teal-500` | Active member |
| `.mlm-node-inactive` | `bg-gradient-to-r from-gray-500 to-gray-600` | Inactive member |
| `.mlm-node-pending` | `bg-gradient-to-r from-yellow-400 to-orange-500` | Pending member |

## Form Components

| WordPress Class | TailwindCSS Class | Description |
|----------------|------------------|-------------|
| `.mlm-form-group` | `mb-5` | Form group |
| `.mlm-form-label` | `block mb-2 font-medium text-gray-700 text-sm` | Form label |
| `.mlm-form-input` | `w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200` | Input field |
| `.mlm-form-select` | `w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-white cursor-pointer` | Select dropdown |

## Button Components

| WordPress Class | TailwindCSS Class | Description |
|----------------|------------------|-------------|
| `.mlm-btn` | `px-6 py-3 border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 no-underline inline-block text-sm uppercase tracking-wide` | Base button |
| `.mlm-btn-primary` | `bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:-translate-y-0.5 hover:shadow-lg` | Primary button |
| `.mlm-btn-secondary` | `bg-gray-50 text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white` | Secondary button |

## Table Components

| WordPress Class | TailwindCSS Class | Description |
|----------------|------------------|-------------|
| `.mlm-commission-table` | `w-full border-collapse mt-5 bg-white rounded-lg overflow-hidden shadow-md` | Table container |
| `.mlm-commission-table th, .mlm-commission-table td` | `px-4 py-3 text-left border-b border-gray-200` | Table cells |
| `.mlm-commission-table th` | `bg-gray-50 font-semibold text-gray-700 uppercase text-xs tracking-wider` | Table headers |
| `.mlm-commission-table tr:hover` | `bg-gray-50` | Row hover |
| `.mlm-amount` | `font-semibold text-green-600 text-sm` | Amount display |

## Card Components

| WordPress Class | TailwindCSS Class | Description |
|----------------|------------------|-------------|
| `.mlm-card` | `bg-white rounded-2xl p-6 mb-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl` | Card container |

## Badge Components

| WordPress Class | TailwindCSS Class | Description |
|----------------|------------------|-------------|
| `.mlm-badge` | `inline-block px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide` | Base badge |
| `.mlm-badge-success` | `bg-green-100 text-green-800` | Success badge |
| `.mlm-badge-warning` | `bg-yellow-100 text-yellow-800` | Warning badge |
| `.mlm-badge-danger` | `bg-red-100 text-red-800` | Danger badge |

## Utility Classes

| WordPress Class | TailwindCSS Class | Description |
|----------------|------------------|-------------|
| `.mlm-text-gradient` | `bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent` | Gradient text |
| `.mlm-shadow-mlm` | `shadow-lg shadow-indigo-200` | Custom shadow |
| `.mlm-border-gradient` | `border-2 border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-padding` | Gradient border |
| `.mlm-sr-only` | `sr-only` | Screen reader only |

## Responsive Breakpoints

### WordPress Media Queries → TailwindCSS Responsive Classes

| WordPress Media Query | TailwindCSS Classes |
|----------------------|-------------------|
| `@media (max-width: 768px)` | Prefix with `md:` for larger screens |
| `.mlm-dashboard` | `bg-gray-50 p-5 rounded-lg shadow-sm mb-5 md:p-6 lg:p-8` |
| `.mlm-stat-card` | `bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 md:p-6 rounded-xl text-center` |
| `.mlm-stat-value` | `text-2xl md:text-3xl font-bold mb-2` |
| `.mlm-node-content` | `w-20 h-20 md:w-30 md:h-30 rounded-full flex items-center justify-center font-semibold text-white mb-2 relative cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg text-xs md:text-sm` |

## Dark Mode

| WordPress Dark Mode | TailwindCSS Dark Mode |
|-------------------|---------------------|
| `@media (prefers-color-scheme: dark)` | Prefix with `dark:` |
| `.mlm-dashboard` | `bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white` |
| `.mlm-card` | `bg-white dark:bg-gray-800 text-gray-900 dark:text-white` |

## Focus States

| WordPress Focus | TailwindCSS Focus |
|----------------|------------------|
| `.mlm-form-input:focus` | `focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent` |
| `.mlm-btn:focus` | `focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` |

## Animation Classes

| WordPress Animation | TailwindCSS Animation |
|-------------------|---------------------|
| `.mlm-fade-in-up` | `animate-fade-in-up` (custom) |

## Usage Examples

### WordPress Original
```html
<div class="mlm-dashboard">
  <div class="mlm-stat-card">
    <div class="mlm-stat-value">1,250,000</div>
    <div class="mlm-stat-label">Total Earnings</div>
  </div>
</div>
```

### TailwindCSS Converted
```jsx
<div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-5">
  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl text-center transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg">
    <div className="text-3xl font-bold mb-2">1,250,000</div>
    <div className="text-sm opacity-90 uppercase tracking-wide">Total Earnings</div>
  </div>
</div>
```

### WordPress Tree Node
```html
<div class="mlm-tree-node">
  <div class="mlm-node-content mlm-node-active">
    John Smith
  </div>
</div>
```

### TailwindCSS Tree Node
```jsx
<div className="inline-block mx-2.5 text-center relative">
  <div className="w-30 h-30 rounded-full flex items-center justify-center font-semibold text-white mb-2 relative cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg bg-gradient-to-r from-green-500 to-teal-500">
    John Smith
  </div>
</div>
```

## Custom TailwindCSS Configuration

### tailwind.config.js for MLM Project
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mlm-primary': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
        'mlm-secondary': {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#764ba2',
          600: '#6b46c1',
          700: '#5b3b8c',
          800: '#4c2d7a',
          900: '#3d245e',
        },
        'mlm-success': {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        'mlm': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

## Performance Optimizations

### WordPress Performance Issues → TailwindCSS Optimized

| WordPress Issue | TailwindCSS Solution |
|----------------|---------------------|
| Heavy transitions | `transition-transform duration-500 ease-out will-change-transform` |
| Unnecessary animations | Use specific transition properties |
| Large CSS files | Purge unused styles in production |

## Accessibility

| WordPress Accessibility | TailwindCSS Accessibility |
|----------------------|-------------------------|
| `.mlm-sr-only` | `sr-only` |
| Manual focus styles | `focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent` |
| Color contrast | Use Tailwind's accessible color palette |

This reference provides a complete mapping from WordPress MLM CSS classes to TailwindCSS equivalents for easy conversion.
