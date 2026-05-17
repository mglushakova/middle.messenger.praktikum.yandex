import { registerComponent } from '@/shared/lib/handlebars/registerComponent';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { LoginForm } from '@/features/login-form';
import { RegisterForm } from '@/features/register-form';
import { ProfileEditForm } from '@/features/profile-edit-form';
import { PasswordEditForm } from '@/features/password-edit-form';

registerComponent(Input);
registerComponent(Button);
registerComponent(RegisterForm);
registerComponent(ProfileEditForm);
registerComponent(PasswordEditForm);
registerComponent(LoginForm);
