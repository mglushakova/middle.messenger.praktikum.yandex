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
    root: './src',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, './src/pages/main/index.html'),
                chat: path.resolve(__dirname, './src/pages/chat-page/chat.html'),
                login: path.resolve(__dirname, './src/pages/login/login.html'),
                register: path.resolve(__dirname, './src/pages/register/register.html'),
                error: path.resolve(__dirname, './src/pages/error/error.html'),
                'not-found': path.resolve(__dirname, './src/pages/not-found/not-found.html'),
                'password-edit': path.resolve(__dirname, './src/pages/password/password-edit.html'),
                'profile-edit': path.resolve(__dirname, './src/pages/profile-edit/profile-edit.html'),
                'profile': path.resolve(__dirname, './src/pages/profile/profile.html'),
            },
        },
    }   
});

