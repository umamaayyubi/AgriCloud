import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

function Navbar({ theme, onThemeToggle, currentLanguage, onLanguageChange }) {
  const { t } = useTranslation();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand" aria-label="AgriCloud">
          <div className="brand-mark" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 14.5C4 10.3579 7.35786 7 11.5 7C14.494 7 17.0787 8.75556 18.2794 11.2954C18.6938 12.1719 18.0435 13.2143 17.0739 13.2143H12.7321C10.3375 13.2143 8.39643 15.1554 8.39643 17.55C8.39643 17.8754 8.13268 18.1392 7.80714 18.1392H7.64643C5.63238 18.1392 4 16.5068 4 14.5Z" fill="currentColor"/>
              <path d="M7.32153 17.3892C7.32153 14.4325 9.71899 12.035 12.6757 12.035H17.7644C18.0899 12.035 18.3537 12.2988 18.3537 12.6243V12.785C18.3537 15.9195 15.8122 18.4609 12.6778 18.4609H7.91082C7.58641 18.4609 7.32153 18.1986 7.32153 17.8742V17.3892Z" fill="currentColor" opacity="0.5"/>
              <path d="M11.2 4C11.6077 5.42546 12.5604 6.63857 13.8786 7.42857" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="brand-copy">
            <strong>AgriCloud</strong>
            <span>{t('navbar.subtitle')}</span>
          </div>
        </div>

        <div className="navbar-controls">
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            onChange={onLanguageChange}
          />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;