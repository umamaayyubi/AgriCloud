import { useTranslation } from 'react-i18next';

function EmptyState({ hasRecords, onPrimaryAction }) {
  const { t } = useTranslation();

  return (
    <div className="empty-state">
      <div className="empty-state-card">
        <div className="empty-state-visual" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M4 14.5C4 10.3579 7.35786 7 11.5 7C14.494 7 17.0787 8.75556 18.2794 11.2954C18.6938 12.1719 18.0435 13.2143 17.0739 13.2143H12.7321C10.3375 13.2143 8.39643 15.1554 8.39643 17.55C8.39643 17.8754 8.13268 18.1392 7.80714 18.1392H7.64643C5.63238 18.1392 4 16.5068 4 14.5Z" fill="currentColor"/>
            <path d="M7.32153 17.3892C7.32153 14.4325 9.71899 12.035 12.6757 12.035H17.7644C18.0899 12.035 18.3537 12.2988 18.3537 12.6243V12.785C18.3537 15.9195 15.8122 18.4609 12.6778 18.4609H7.91082C7.58641 18.4609 7.32153 18.1986 7.32153 17.8742V17.3892Z" fill="currentColor" opacity="0.45"/>
          </svg>
        </div>

        <h3>{hasRecords ? t('empty.filteredTitle') : t('empty.title')}</h3>
        <p>{hasRecords ? t('empty.filteredDescription') : t('empty.description')}</p>

        <button type="button" className="btn btn-primary" onClick={onPrimaryAction}>
          {hasRecords ? t('empty.clearFilters') : t('empty.addFirstRecord')}
        </button>
      </div>
    </div>
  );
}

export default EmptyState;