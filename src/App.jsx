import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import StorageForm from './components/StorageForm';
import StorageTable from './components/StorageTable';
import EmptyState from './components/EmptyState';
import SearchBar from './components/SearchBar';
import ExportImportPanel from './components/ExportImportPanel';
import defaultStorageData from './data/defaultStorageData';
import {
  getRecords,
  saveRecords,
  resetRecordsToDefaults,
  clearAllRecords,
  getTheme,
  saveTheme,
  getLanguage,
  saveLanguage
} from './utils/localStorage';

const emptyForm = {
  cropName: '',
  quantity: '',
  location: '',
  capacity: '',
  status: 'Available'
};

function App() {
  const { t, i18n } = useTranslation();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(emptyForm);
  const [theme, setTheme] = useState(getTheme());
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    const stored = getRecords(defaultStorageData);
    setRecords(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    const storedLanguage = getLanguage() || 'en';
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  useEffect(() => {
    if (!feedback.message) return;
    const timer = setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 2400);
    return () => clearTimeout(timer);
  }, [feedback]);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
  };

  const persistRecords = (nextRecords) => {
    setRecords(nextRecords);
    saveRecords(nextRecords);
  };

  const resetForm = () => {
    setFormState(emptyForm);
    setEditingId(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validateRecord = (record) => {
    const quantity = Number(record.quantity);
    const capacity = Number(record.capacity);

    if (!record.cropName.trim()) return t('validation.cropNameRequired');
    if (!record.location.trim()) return t('validation.locationRequired');
    if (Number.isNaN(quantity) || quantity < 0) return t('validation.quantityInvalid');
    if (Number.isNaN(capacity) || capacity <= 0) return t('validation.capacityInvalid');
    if (quantity > capacity) return t('validation.quantityExceedsCapacity');

    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalized = {
      ...formState,
      cropName: formState.cropName.trim(),
      location: formState.location.trim(),
      quantity: Number(formState.quantity),
      capacity: Number(formState.capacity)
    };

    const error = validateRecord(normalized);
    if (error) {
      showFeedback('error', error);
      return;
    }

    if (editingId) {
      const updated = records.map((record) =>
        record.id === editingId ? { ...record, ...normalized } : record
      );
      persistRecords(updated);
      showFeedback('success', t('messages.recordUpdated'));
    } else {
      const newRecord = {
        id: crypto.randomUUID(),
        ...normalized,
        createdAt: new Date().toISOString()
      };
      persistRecords([newRecord, ...records]);
      showFeedback('success', t('messages.recordAdded'));
    }

    resetForm();
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormState({
      cropName: record.cropName,
      quantity: record.quantity,
      location: record.location,
      capacity: record.capacity,
      status: record.status
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(t('messages.deleteConfirm'));
    if (!confirmed) return;
    const updated = records.filter((record) => record.id !== id);
    persistRecords(updated);
    if (editingId === id) resetForm();
    showFeedback('success', t('messages.recordDeleted'));
  };

  const handleResetAll = () => {
    const confirmed = window.confirm(t('messages.resetConfirm'));
    if (!confirmed) return;
    const defaults = resetRecordsToDefaults(defaultStorageData);
    setRecords(defaults);
    resetForm();
    showFeedback('success', t('messages.recordsReset'));
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(t('messages.clearAllConfirm'));
    if (!confirmed) return;
    clearAllRecords();
    setRecords([]);
    resetForm();
    showFeedback('success', t('messages.recordsCleared'));
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    saveLanguage(lng);
    showFeedback('success', t('messages.languageUpdated'));
  };

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !normalizedSearch ||
        record.cropName.toLowerCase().includes(normalizedSearch) ||
        record.location.toLowerCase().includes(normalizedSearch) ||
        record.status.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'all' || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchTerm, statusFilter]);

  const summary = useMemo(() => {
    return records.reduce(
      (acc, record) => {
        acc.totalRecords += 1;
        acc.totalQuantity += Number(record.quantity) || 0;
        acc.totalCapacity += Number(record.capacity) || 0;
        return acc;
      },
      { totalRecords: 0, totalQuantity: 0, totalCapacity: 0 }
    );
  }, [records]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        {t('accessibility.skipToContent')}
      </a>

      <Navbar
        theme={theme}
        onThemeToggle={handleThemeToggle}
        currentLanguage={i18n.language}
        onLanguageChange={handleLanguageChange}
      />

      <main id="main-content" className="main-layout">
        <section className="hero-panel surface-card" aria-labelledby="dashboard-title">
          <div className="hero-copy">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1 id="dashboard-title">{t('hero.title')}</h1>
            <p className="hero-description">{t('hero.description')}</p>
            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  document
                    .getElementById('storage-form-card')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {editingId ? t('form.updateRecord') : t('hero.primaryAction')}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResetAll}
              >
                {t('actions.resetToDemo')}
              </button>
            </div>
          </div>

          <div className="hero-glance">
            <div className="hero-stat-block">
              <span>{t('summary.totalRecords')}</span>
              <strong>{summary.totalRecords}</strong>
            </div>
            <div className="hero-stat-block">
              <span>{t('summary.totalQuantity')}</span>
              <strong>{summary.totalQuantity}</strong>
            </div>
            <div className="hero-stat-block">
              <span>{t('summary.totalCapacity')}</span>
              <strong>{summary.totalCapacity}</strong>
            </div>
          </div>
        </section>

        {feedback.message && (
          <div
            className={`feedback-banner ${feedback.type}`}
            role="status"
            aria-live="polite"
          >
            {feedback.message}
          </div>
        )}

        <SummaryCards summary={summary} />

        <div className="dashboard-grid">
          <section id="storage-form-card" className="surface-card panel-card">
            <div className="section-heading">
              <div>
                <p className="section-kicker">{t('form.sectionKicker')}</p>
                <h2>{editingId ? t('form.editTitle') : t('form.addTitle')}</h2>
              </div>
            </div>
            <StorageForm
              formState={formState}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              editingId={editingId}
              onCancelEdit={resetForm}
            />
          </section>

          <section className="surface-card panel-card">
            <div className="section-heading">
              <div>
                <p className="section-kicker">{t('tools.sectionKicker')}</p>
                <h2>{t('tools.title')}</h2>
              </div>
            </div>

            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />

            <ExportImportPanel
              records={records}
              onImport={(importedRecords) => {
                persistRecords(importedRecords);
                resetForm();
                showFeedback('success', t('messages.importSuccess'));
              }}
              onClearAll={handleClearAll}
            />
          </section>
        </div>

        <section className="surface-card table-section">
          <div className="section-heading table-heading">
            <div>
              <p className="section-kicker">{t('table.sectionKicker')}</p>
              <h2>{t('table.title')}</h2>
            </div>
            <div className="table-meta">
              <span className="filter-pill">
                {t('table.visibleRecords')} {filteredRecords.length}
              </span>
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <EmptyState
              hasRecords={records.length > 0}
              onPrimaryAction={() => {
                if (records.length > 0) {
                  setSearchTerm('');
                  setStatusFilter('all');
                } else {
                  document
                    .getElementById('storage-form-card')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          ) : (
            <StorageTable
              records={filteredRecords}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;