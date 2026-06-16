import { Block, type BlockProps } from '@/shared/lib/block/block';
import './profile-back-nav.scss';
import { router } from '@/app/router';

export class ProfileBackNav extends Block<BlockProps> {
  static componentName = 'ProfileBackNav';

  protected template = `
    <nav class="profile-nav">
      <a href="/messenger" class="profile-nav__back-link">
        <span class="profile-nav__link-wrapper">
          <svg
            width="13"
            height="11"
            viewBox="0 0 13 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12.0245"
              y="6.2998"
              width="11"
              height="1.6"
              transform="rotate(-180 12.0245 6.2998)"
              fill="white"
            />
            <path
              d="M5.02451 10.4998L1.02451 5.49976L5.02451 0.499756"
              stroke="white"
              stroke-width="1.6"
            />
          </svg>
        </span>
      </a>
    </nav>
  `;

  protected events = {
    click: (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.closest('.profile-nav__back-link')) {
        e.preventDefault();
        router.back();
      }
    },
  };
}
