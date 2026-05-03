'use client';
import { useState, useEffect } from 'react';

export default function LocationModal({ isOpen, onClose, onSend, t }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{t.send_location}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body">
          <div className="map-placeholder">
            {loading ? (
              <div className="map-loading">
                <div className="spinner"></div>
                <span>Fetching coordinates...</span>
              </div>
            ) : (
              <>
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" 
                  alt="Map" 
                  className="map-img"
                />
                <div className="map-pin">📍</div>
                <div className="location-info">
                  <div className="location-name">Rajpath, New Delhi</div>
                  <div className="location-coords">28.6139° N, 77.2090° E</div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>
          <button 
            className="btn btn-primary" 
            onClick={onSend}
            disabled={loading}
          >
            🚀 {t.send_location}
          </button>
        </div>
      </div>
    </div>
  );
}
