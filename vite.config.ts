import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const port = process.env.PORT ? +process.env.PORT : 8000;

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: true,
        port,
    },
    root: "./src",
    resolve: {
        alias: {
        '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, './src/index.html'),
                chat: path.resolve(__dirname, './src/chat.html'),
                login: path.resolve(__dirname, './src/login.html'),
                register: path.resolve(__dirname, './src/register.html'),
                error: path.resolve(__dirname, './src/error.html'),
                'not-found': path.resolve(__dirname, './src/not-found.html'),
                'password-edit': path.resolve(__dirname, './src/password-edit.html'),
                'profile-edit': path.resolve(__dirname, './src/profile-edit.html'),
                'profile': path.resolve(__dirname, './src/profile.html'),
            },
        },
    }   
});
