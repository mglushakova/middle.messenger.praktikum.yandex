import { Block, type BlockProps } from '@/shared/lib/block';
import { connect } from '@/shared/store';
import './avatar-button.scss';
import { userController } from '@/entities/user';

const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

type AvatarUploadProps = BlockProps & {
  avatarUrl: string | null;
  error?: string | null;
};

const withUserData = connect((state) => {
  return {
    avatarUrl: state.user?.avatar
      ? `${RESOURCES_URL}${state.user.avatar}`
      : null,
    error: state.profile?.error,
  };
});

export class AvatarUpload extends Block<AvatarUploadProps> {
  static componentName = 'AvatarUpload';

  protected template = `
    <form class="avatar">
      <label class="avatar__label">
      {{#if avatarUrl}}
        <img
          src="{{avatarUrl}}"
          alt="Аватар пользователя"
          class="avatar__image"
        />
      {{else}}
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="avatar__placeholder"
        >
          <circle cx="65" cy="65" r="65" fill="currentColor" />
          <path
            d="M81.2061 45.0049C83.3194 45.1121 85 46.86 85 49V81L84.9951 81.2061C84.8913 83.2512 83.2512 84.8913 81.2061 84.9951L81 85H49C46.86 85 45.1121 83.3194 45.0049 81.2061L45 81V49C45 46.7909 46.7909 45 49 45H81L81.2061 45.0049ZM49 47C47.8954 47 47 47.8954 47 49V70.2666L59.6543 67.3135C60.5482 67.1049 61.4639 67 62.3818 67H67.6182C68.5361 67 69.4518 67.1049 70.3457 67.3135L83 70.2666V49C83 47.8954 82.1046 47 81 47H49ZM55.9092 52.2725C57.9175 52.2725 59.5459 53.9009 59.5459 55.9092C59.5459 57.9174 57.9174 59.5459 55.9092 59.5459C53.9009 59.5459 52.2725 57.9174 52.2725 55.9092C52.2725 53.9009 53.9009 52.2725 55.9092 52.2725Z"
            fill="#CDCDCD"
          />
        </svg>
      {{/if}}
        <span class="avatar__copy">Поменять аватар</span>
        <input type="file" hidden />
      </label>
      <span class="avatar__error">{{ error }}</span>
    </form>
  `;

  protected events = {
    change: (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file) {
        return;
      }

      userController.changeAvatar(file);
    },
  };
}

export default withUserData(AvatarUpload);
