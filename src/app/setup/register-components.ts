import { registerComponent } from '@/shared/lib/handlebars/registerComponent';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { RegisterForm } from '@/features/register-form';
import { ProfileEditForm } from '@/features/profile-edit-form';
import { PasswordEditForm } from '@/features/password-edit-form';
import { ChatList } from '@/widgets/chat-list';
import { ChatWindow } from '@/widgets/chat-window';
import { ChatItem } from '@/entities/chats';
import { MessageInput } from '@/features/send-message';
import { LoginForm } from '@/features/auth';
import { LogoutLink } from '@/features/auth';
import { AvatarUpload } from '@/features/avatar-upload';
import { ChatMenu } from '@/entities/chats';

registerComponent(Input);
registerComponent(Button);
registerComponent(RegisterForm);
registerComponent(ProfileEditForm);
registerComponent(PasswordEditForm);
registerComponent(LoginForm);
registerComponent(ChatList);
registerComponent(ChatWindow);
registerComponent(ChatItem);
registerComponent(MessageInput);
registerComponent(LogoutLink);
registerComponent(AvatarUpload);
registerComponent(ChatMenu);
