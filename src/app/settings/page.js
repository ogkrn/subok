'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/lib/translations';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function SettingsPage() {
  const { 
    language, setLanguage, 
    contacts, removeContact, addContact, 
    dndStart, setDndStart, 
    dndEnd, setDndEnd 
  } = useApp();
  const t = useTranslation(language);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleAdd = () => {
    if (newName.trim() && newPhone.trim()) {
      addContact({ name: newName.trim(), phone: newPhone.trim() });
      setNewName('');
      setNewPhone('');
      setShowAdd(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="page-container">
        <Header title={t.settings} />

        {/* Language */}
        <div className="glass-card settings-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🌐
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>{t.app_language}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.interface_pref}</div>
            </div>
          </div>
          <div className="toggle-group" style={{ width: '100%' }}>
            <button className={`toggle-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')} style={{ flex: 1 }}>English</button>
            <button className={`toggle-btn ${language === 'hi' ? 'active' : ''}`} onClick={() => setLanguage('hi')} style={{ flex: 1 }}>हिंदी</button>
          </div>
        </div>

        {/* DND */}
        <div className="glass-card settings-section">
          <div className="dnd-header">
            <div className="dnd-icon">🌙</div>
            <div>
              <div className="dnd-title">{t.dnd}</div>
              <div className="dnd-subtitle">{t.dnd_subtitle}</div>
            </div>
          </div>
          <div className="time-picker-row">
            <div className="time-field">
              <label>{t.start}</label>
              <input type="time" value={dndStart} onChange={e => setDndStart(e.target.value)} />
            </div>
            <div className="time-field">
              <label>{t.end}</label>
              <input type="time" value={dndEnd} onChange={e => setDndEnd(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Manage Contacts */}
        <div className="settings-section">
          <h3 className="settings-section-title">{t.manage_contacts}</h3>
          {contacts.map(contact => (
            <div key={contact.id} className="glass-card manage-contact-item">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #1e293b, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0, border: '1px solid var(--glass-border)' }}>
                📱
              </div>
              <div className="manage-contact-info">
                <div className="manage-contact-name">{contact.name}</div>
                <div className="manage-contact-phone">{contact.phone}</div>
              </div>
              <button className="delete-btn" onClick={() => removeContact(contact.id)}>🗑️</button>
            </div>
          ))}

          {showAdd && (
            <div className="glass-card" style={{ padding: '16px', marginBottom: '8px', animation: 'slideUp 0.3s ease' }}>
              <input className="input" placeholder={t.contact_name} value={newName} onChange={e => setNewName(e.target.value)} style={{ marginBottom: '8px' }} />
              <input className="input" placeholder={t.phone_number} value={newPhone} onChange={e => setNewPhone(e.target.value)} style={{ marginBottom: '12px' }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowAdd(false)}>{t.cancel}</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdd}>{t.add}</button>
              </div>
            </div>
          )}

          <button className="btn btn-outline-dashed btn-full" onClick={() => setShowAdd(true)} style={{ marginTop: '8px' }}>
            + {t.add_new_contact}
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
