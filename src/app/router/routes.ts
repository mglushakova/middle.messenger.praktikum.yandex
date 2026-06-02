import { ErrorPage } from '@/pages/error/error-page';
import { LoginPage } from '@/pages/login/login-page';
import { MessengerPage } from '@/pages/messenger/messenger-page';
import { NotFoundPage } from '@/pages/not-found/not-found-page';
import { PasswordEditPage } from '@/pages/password-edit/password-edit';
import { ProfileEditPage } from '@/pages/profile-edit/profile-edit';
import { default as SettingsPage } from '@/pages/settings/settings-page';
import { SignUpPage } from '@/pages/sign-up/sign-up-page';
import type { AppRoute } from './Router';

export const routes: AppRoute[] = [
  {
    path: '/',
    page: LoginPage,
    access: 'guest',
  },
  {
    path: '/sign-up',
    page: SignUpPage,
    access: 'guest',
  },
  {
    path: '/messenger',
    page: MessengerPage,
    access: 'private',
  },
  {
    path: '/settings',
    page: SettingsPage,
    access: 'private',
  },
  {
    path: '/404',
    page: NotFoundPage,
    access: 'public',
  },
  {
    path: '/500',
    page: ErrorPage,
    access: 'public',
  },
  {
    path: '/settings/password',
    page: PasswordEditPage,
    access: 'private',
  },
  {
    path: '/settings/profile',
    page: ProfileEditPage,
    access: 'private',
  },
];
