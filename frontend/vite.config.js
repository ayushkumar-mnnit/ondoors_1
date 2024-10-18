import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// 5100 is port of backend, it may be different for yours
// now make all the routes in backend as   /api/route1  /api/route2      and so on

/* vite.config.js: This file is used to configure Vite. It allows you to customize the build process, set up plugins, define alias paths, and configure server settings. It's mainly for adjusting how Vite handles your project during development and production. */