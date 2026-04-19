import { useTranslation } from 'react-i18next';

function SearchBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}) {
  const { t } = useTranslation();

  return (
    <div className="search-grid">
      <div className="field">
        <label htmlFor="search-records">{t('search.searchLabel')}</label>
        <input
          id="search-records"
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('search.searchPlaceholder')}
        />
      </div>

      <div className="field">
        <label htmlFor="status-filter">{t('search.filterByStatus')}</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
        >
          <option value="all">{t('search.allStatuses')}</option>
          <option value="Available">{t('status.available')}</option>
          <option value="Low Stock">{t('status.lowStock')}</option>
          <option value="Full">{t('status.full')}</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;