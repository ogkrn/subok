'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Toast from '@/components/Toast';

const AppContext = createContext();

const DEFAULT_CONTACTS = [
  { id: 1, name: 'Mom', phone: '+919876543210', status: 'safe', lastSeen: '2 min ago' },
  { id: 2, name: 'Brother', phone: '+919876543211', status: 'away', lastSeen: '1 hour ago' },
  { id: 3, name: 'Karan', phone: '7923847837', status: 'safe', lastSeen: '5 min ago' },
  { id: 4, name: 'Ayush', phone: '25363882', status: 'offline', lastSeen: '4 days ago' },
  { id: 5, name: 'Zohaib', phone: '57463676335', status: 'safe', lastSeen: '30 min ago' },
];

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [onboarded, setOnboarded] = useState(false);
  const [userStatus, setUserStatus] = useState('safe');
  const [lastPing, setLastPing] = useState(null);
  const [dndStart, setDndStart] = useState('22:00');
  const [dndEnd, setDndEnd] = useState('07:00');

  useEffect(() => {
    const saved = localStorage.getItem('subok-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.contacts) setContacts(parsed.contacts);
        if (parsed.onboarded) setOnboarded(parsed.onboarded);
        if (parsed.lastPing) setLastPing(parsed.lastPing);
        if (parsed.dndStart) setDndStart(parsed.dndStart);
        if (parsed.dndEnd) setDndEnd(parsed.dndEnd);
      } catch (e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('subok-state', JSON.stringify({
      language, contacts, onboarded, lastPing, dndStart, dndEnd
    }));
  }, [language, contacts, onboarded, lastPing, dndStart, dndEnd]);

  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const ping = (silent = false) => {
    const now = new Date();
    setLastPing(now.toISOString());
    setUserStatus('safe');
    if (!silent) showToast('Safety ping sent successfully!', 'success');
  };

  const addContact = (contact) => {
    setContacts(prev => [...prev, { ...contact, id: Date.now(), status: 'offline', lastSeen: 'Just added' }]);
    showToast('Contact added successfully!', 'success');
  };

  const removeContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    showToast('Contact removed.', 'info');
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      contacts, setContacts, addContact, removeContact,
      onboarded, setOnboarded,
      userStatus, setUserStatus,
      lastPing, ping,
      dndStart, setDndStart,
      dndEnd, setDndEnd,
      showToast,
    }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
