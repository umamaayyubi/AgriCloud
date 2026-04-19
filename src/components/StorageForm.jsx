import { useTranslation } from 'react-i18next';

function StorageForm({ formState, onChange, onSubmit, editingId, onCancelEdit }) {
  const { t } = useTranslation();

  return (
    <form className="storage-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="cropName">{t('form.cropName')}</label>
          <input
            id="cropName"
            name="cropName"
            type="text"
            value={formState.cropName}
            onChange={onChange}
            placeholder={t('form.placeholders.cropName')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="location">{t('form.location')}</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formState.location}
            onChange={onChange}
            placeholder={t('form.placeholders.location')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="quantity">{t('form.quantity')}</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={formState.quantity}
            onChange={onChange}
            placeholder={t('form.placeholders.quantity')}
            required
          />
          <span className="form-helper">{t('form.quantityHelper')}</span>
        </div>

        <div className="field">
          <label htmlFor="capacity">{t('form.capacity')}</label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={formState.capacity}
            onChange={onChange}
            placeholder={t('form.placeholders.capacity')}
            required
          />
          <span className="form-helper">{t('form.capacityHelper')}</span>
        </div>

        <div className="field full-span">
          <label htmlFor="status">{t('form.status')}</label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={onChange}
          >
            <option value="Available">{t('status.available')}</option>
            <option value="Low Stock">{t('status.lowStock')}</option>
            <option value="Full">{t('status.full')}</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingId ? t('form.updateRecord') : t('form.addRecord')}
        </button>

        {editingId && (
          <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>
            {t('actions.cancel')}
          </button>
        )}
      </div>
    </form>
  );
}

export default StorageForm;