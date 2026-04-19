import { useTranslation } from 'react-i18next';

function SummaryCards({ summary }) {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('summary.totalRecords'),
      value: summary.totalRecords,
      note: t('summary.totalRecordsNote'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M8 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M8 14H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: t('summary.totalQuantity'),
      value: summary.totalQuantity,
      note: t('summary.totalQuantityNote'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 18C5 12.4772 8.58172 8 13 8C17.4183 8 21 12.4772 21 18" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M3 18H23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M12.5 3C12.5 4.79803 13.4705 6.41551 14.9972 7.31453" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: t('summary.totalCapacity'),
      value: summary.totalCapacity,
      note: t('summary.totalCapacityNote'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 20V8.5C6 7.11929 7.11929 6 8.5 6H15.5C16.8807 6 18 7.11929 18 8.5V20" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M9 10H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M4 20H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="summary-grid" aria-label={t('summary.sectionLabel')}>
      {cards.map((card) => (
        <article key={card.title} className="summary-card surface-card">
          <div className="summary-head">
            <div>
              <p>{card.title}</p>
              <h3>{card.value}</h3>
            </div>
            <div className="summary-icon">{card.icon}</div>
          </div>
          <small>{card.note}</small>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;