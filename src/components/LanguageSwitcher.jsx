import { useTranslation } from 'react-i18next';

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' }
];

function LanguageSwitcher({ currentLanguage, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="control-shell">
      <label htmlFor="language-select" className="sr-only">
        {t('navbar.language')}
      </label>
      <select
        id="language-select"
        className="language-select"
        value={currentLanguage}
        onChange={(event) => onChange(event.target.value)}
        aria-label={t('navbar.language')}
      >
        {languageOptions.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;