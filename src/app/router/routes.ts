import { ErrorPage } from '@/pages/error/error-page';
import { LoginPage } from '@/pages/login/login-page';
import { MessengerPage } from '@/pages/messenger/messenger-page';
import { NotFoundPage } from '@/pages/not-found/not-found-page';
import { PasswordEditPage } from '@/pages/password-edit/password-edit';
import { ProfileEditPage } from '@/pages/profile-edit/profile-edit';
import { SettingsPage } from '@/pages/settings/settings-page';
import { SignUpPage } from '@/pages/sign-up/sign-up-page';

export const routes = [
  {
    path: '/',
    page: LoginPage,
  },
  {
    path: '/sign-up',
    page: SignUpPage,
  },
  {
    path: '/messenger',
    page: MessengerPage,
  },
  {
    path: '/settings',
    page: SettingsPage,
  },
  {
    path: '/404',
    page: NotFoundPage,
  },
  {
    path: '/500',
    page: ErrorPage,
  },
  {
    path: '/settings/password',
    page: PasswordEditPage,
  },
  {
    path: '/settings/profile',
    page: ProfileEditPage,
  },
];
