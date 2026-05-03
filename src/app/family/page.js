'use client';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/lib/translations';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function FamilyPage() {
  const { contacts, language } = useApp();
  const t = useTranslation(language);
  const activeCount = contacts.filter(c => c.status === 'safe').length;

  const getStatusClass = (status) => {
    if (status === 'safe') return 'status-safe';
    if (status === 'away') return 'status-away';
    return 'status-offline';
  };

  const getStatusLabel = (status) => {
    if (status === 'safe') return t.safe.toUpperCase();
    if (status === 'away') return t.away.toUpperCase();
    return t.offline.toUpperCase();
  };

  return (
    <div className="app-shell">
      <div className="page-container">
        <Header title={t.family_circle} />

        <div className="family-header">
          <h2 className="family-title">{t.trusted_contacts}</h2>
          <span className="active-count">{activeCount}/{contacts.length} {t.active}</span>
        </div>

        {contacts.map(contact => (
          <div key={contact.id} className="glass-card contact-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="contact-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-phone">{contact.phone}</div>
                <div className="contact-meta">
                  🕐 {t.last_seen} {contact.lastSeen}
                </div>
              </div>
              <span className={`status-badge ${getStatusClass(contact.status)}`}>
                {getStatusLabel(contact.status)}
              </span>
            </div>
            <div className="contact-actions">
              <button className="btn btn-ghost">📍 {t.locate}</button>
              <button className="btn btn-primary" style={{ boxShadow: 'none' }}>📞 {t.call}</button>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
