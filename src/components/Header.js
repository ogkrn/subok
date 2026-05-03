'use client';
import { useApp } from '@/context/AppContext';

export default function Header({ title }) {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="header-logo-icon">🛡️</div>
        <span className="header-logo-text">{title || 'Subok'}</span>
      </div>
      <div className="online-badge">
        <span className="online-dot"></span>
        ONLINE
      </div>
    </header>
  );
}
