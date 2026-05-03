'use client';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/lib/translations';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import LocationModal from '@/components/LocationModal';

export default function HomePage() {
  const { userStatus, lastPing, ping, language, showToast } = useApp();
  const t = useTranslation(language);
  const [countdown, setCountdown] = useState(480); // 8 minutes in seconds
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 0 ? 480 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePing = () => {
    ping();
    setCountdown(480);
  };

  const handleTestAlert = () => {
    showToast(t.alert_test, 'error');
  };

  const handleSendLocation = () => {
    setIsLocationOpen(false);
    showToast(t.location_sent, 'info');
    ping(true); // Silent ping to update time without double toast
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `00:${m}:${s}`;
  };

  const formatLastPing = () => {
    if (!lastPing) return t.never;
    const d = new Date(lastPing);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) {
      return `${t.today}, ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app-shell">
      <div className="page-container">
        <Header title={t.app_name} />

        <div className="glass-card status-bar">
          <div className="status-bar-left">
            <span className="status-bar-label">{t.status}</span>
            <div className="status-bar-value">
              <span className="status-bar-dot"></span>
              {userStatus === 'safe' ? t.safe : t.away}
            </div>
          </div>
          <div className="status-bar-right">
            <div className="last-ping-label">{t.last_ping}</div>
            <div className="last-ping-time">{formatLastPing()}</div>
          </div>
        </div>

        <div className="pulse-container" onClick={handlePing}>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-core">
            <span className="pulse-icon">💓</span>
            <span className="pulse-text">{t.i_am_active}</span>
          </div>
        </div>

        <div className="countdown-section">
          <div className="countdown-label">{t.next_check}</div>
          <div className="countdown-time">{formatTime(countdown)}</div>
        </div>

        <div className="action-row">
          <button className="action-btn action-btn-alert" onClick={handleTestAlert}>
            <span className="action-btn-icon">⚠️</span>
            {t.test_alert}
          </button>
          <button className="action-btn action-btn-location" onClick={() => setIsLocationOpen(true)}>
            <span className="action-btn-icon">📍</span>
            {t.send_location}
          </button>
        </div>
      </div>
      <BottomNav />
      
      <LocationModal 
        isOpen={isLocationOpen} 
        onClose={() => setIsLocationOpen(false)} 
        onSend={handleSendLocation}
        t={t}
      />
    </div>
  );
}
