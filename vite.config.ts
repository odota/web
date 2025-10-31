import tailwindcss from '@tailwindcss/vite';

export default {
  build: {
    outDir: 'build',
    // sourcemap: true,
  },
  server: {
    // https: true,
    allowedHosts: true,
  },
  plugins: [tailwindcss()],
};
