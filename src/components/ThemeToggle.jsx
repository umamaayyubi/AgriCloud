import { useTranslation } from 'react-i18next';

function ThemeToggle({ theme, onToggle }) {
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <div className="control-shell">
      <button
        type="button"
        className="icon-toggle"
        onClick={onToggle}
        aria-label={isDark ? t('navbar.switchToLight') : t('navbar.switchToDark')}
        title={isDark ? t('navbar.switchToLight') : t('navbar.switchToDark')}
      >
        {isDark ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3V5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M12 18.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M5.64 5.64L7.41 7.41" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M16.59 16.59L18.36 18.36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M3 12H5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M18.5 12H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M5.64 18.36L7.41 16.59" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M16.59 7.41L18.36 5.64" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.8"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 14.2C19.056 14.7631 17.9528 15.0857 16.7742 15.0857C13.2956 15.0857 10.4762 12.2663 10.4762 8.78774C10.4762 7.6091 10.7988 6.50589 11.3619 5.56195C7.89976 6.17385 5.27271 9.19488 5.27271 12.8324C5.27271 16.9105 8.57827 20.2161 12.6564 20.2161C16.2939 20.2161 19.3149 17.589 19.9268 14.1269L20 14.2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;