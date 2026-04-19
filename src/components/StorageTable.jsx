import { useTranslation } from 'react-i18next';

function StorageTable({ records, onEdit, onDelete }) {
  const { t } = useTranslation();

  const getStatusClassName = (status) => {
    if (status === 'Available') return 'available';
    if (status === 'Low Stock') return 'low-stock';
    return 'full';
  };

  const getTranslatedStatus = (status) => {
    if (status === 'Available') return t('status.available');
    if (status === 'Low Stock') return t('status.lowStock');
    return t('status.full');
  };

  return (
    <div className="table-scroll" role="region" aria-label={t('table.title')} tabIndex="0">
      <table className="storage-table">
        <thead>
          <tr>
            <th>{t('table.crop')}</th>
            <th>{t('table.quantity')}</th>
            <th>{t('table.location')}</th>
            <th>{t('table.capacity')}</th>
            <th>{t('table.status')}</th>
            <th>{t('table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <div className="crop-cell">
                  <strong>{record.cropName}</strong>
                  <span>ID: {record.id}</span>
                </div>
              </td>
              <td>{record.quantity}</td>
              <td>{record.location}</td>
              <td>{record.capacity}</td>
              <td>
                <span className={`status-badge ${getStatusClassName(record.status)}`}>
                  <span aria-hidden="true">●</span>
                  {getTranslatedStatus(record.status)}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => onEdit(record)}
                    aria-label={t('actions.edit')}
                    title={t('actions.edit')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 20H8L18 10C18.7956 9.20435 18.7956 7.91565 18 7.12L16.88 6C16.0843 5.20435 14.7956 5.20435 14 6L4 16V20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                      <path d="M12.5 7.5L16.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="icon-button danger"
                    onClick={() => onDelete(record.id)}
                    aria-label={t('actions.delete')}
                    title={t('actions.delete')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 7H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="M7 7L7.9 18.7C7.96386 19.5301 8.65611 20.1714 9.48868 20.1714H14.5113C15.3439 20.1714 16.0361 19.5301 16.1 18.7L17 7" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="M10 11V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <path d="M14 11V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StorageTable;