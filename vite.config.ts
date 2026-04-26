import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? +process.env.PORT : 8000;

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: true,
        port,
    },
});