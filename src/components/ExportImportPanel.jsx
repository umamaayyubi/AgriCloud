import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

function ExportImportPanel({ records, onImport, onClearAll }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'agricloud-records.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        throw new Error('Invalid format');
      }

      const normalized = parsed.map((item, index) => ({
        id: item.id || `imported-${index + 1}-${Date.now()}`,
        cropName: item.cropName || '',
        quantity: Number(item.quantity) || 0,
        location: item.location || '',
        capacity: Number(item.capacity) || 0,
        status: item.status || 'Available',
        createdAt: item.createdAt || new Date().toISOString()
      }));

      onImport(normalized);
    } catch {
      window.alert(t('messages.importError'));
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="export-panel">
      <p>{t('tools.description')}</p>

      <div className="export-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleExport}
          disabled={records.length === 0}
        >
          {t('actions.exportJson')}
        </button>

        <button
          type="button"
          className="btn btn-ghost file-trigger"
          onClick={handleImportClick}
        >
          {t('actions.importJson')}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={onClearAll}
          disabled={records.length === 0}
        >
          {t('actions.clearAll')}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="file-input"
        onChange={handleFileChange}
        aria-label={t('actions.importJson')}
      />
    </div>
  );
}

export default ExportImportPanel;