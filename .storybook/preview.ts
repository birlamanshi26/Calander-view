// .storybook/preview.ts
import type { Preview } from '@storybook/react-vite';
import '@/styles/globals.css';  // Valid thanks to styles.d.ts

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',  // Use `default` + `values` (not `options`)
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#18181b' },
        { name: 'gray', value: '#f4f4f5' },
      ],
    },
  },

  // Optional: Set initial background
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
};

export default preview;