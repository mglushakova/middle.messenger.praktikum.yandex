import { registerComponent } from '@/shared/lib/handlebars/registerComponent';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Form } from '@/shared/ui/form';
import { LoginForm } from '@/features/login-form';
import { RegisterForm } from '@/features/register-form';

registerComponent(RegisterForm);
registerComponent(LoginForm);
registerComponent(Button);
registerComponent(Input);
registerComponent(Form);
