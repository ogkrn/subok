'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/lib/translations';

export default function OnboardingPage() {
  const router = useRouter();
  const { language, setLanguage, addContact, setOnboarded, ping } = useApp();
  const t = useTranslation(language);
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState(language);
  const [contactFields, setContactFields] = useState([{ name: '', phone: '' }]);

  const handleLangContinue = () => {
    setLanguage(selectedLang);
    setStep(2);
  };

  const updateContact = (index, field, value) => {
    setContactFields(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addField = () => {
    setContactFields(prev => [...prev, { name: '', phone: '' }]);
  };

  const removeField = (index) => {
    if (contactFields.length <= 1) return;
    setContactFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleFinish = () => {
    contactFields.forEach(c => {
      if (c.name.trim() && c.phone.trim()) {
        addContact({ name: c.name.trim(), phone: c.phone.trim() });
      }
    });
    setOnboarded(true);
    ping(true); // Silent ping during onboarding
    router.push('/home');
  };

  // Helper for dynamic translations since we change lang during setup
  const dt = useTranslation(selectedLang);

  return (
    <div className="onboarding-container">
      <div className="step-dots">
        <span className={`step-dot ${step === 1 ? 'active' : ''}`}></span>
        <span className={`step-dot ${step === 2 ? 'active' : ''}`}></span>
      </div>

      {step === 1 && (
        <div style={{ width: '100%', animation: 'fadeIn 0.4s ease' }}>
          <h1 className="onboarding-title">{dt.select_language}</h1>
          <p className="onboarding-subtitle">{dt.choose_pref_lang}</p>

          <div className="lang-grid">
            <div
              className={`lang-card ${selectedLang === 'en' ? 'selected' : ''}`}
              onClick={() => setSelectedLang('en')}
            >
              <span className="lang-flag">🇬🇧</span>
              <span className="lang-name">English</span>
            </div>
            <div
              className={`lang-card ${selectedLang === 'hi' ? 'selected' : ''}`}
              onClick={() => setSelectedLang('hi')}
            >
              <span className="lang-flag">🇮🇳</span>
              <span className="lang-name">हिंदी</span>
            </div>
          </div>

          <button className="btn btn-primary btn-full" onClick={handleLangContinue}>
            {dt.continue}
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ width: '100%', animation: 'fadeIn 0.4s ease' }}>
          <h1 className="onboarding-title">{dt.add_trusted_contacts}</h1>
          <p className="onboarding-subtitle">{dt.alert_inactive}</p>

          <div className="onboarding-form">
            {contactFields.map((contact, i) => (
              <div key={i} className="contact-form-group">
                <div className="contact-form-header">
                  <span className="contact-form-number">{dt.contact_num}{i + 1}</span>
                  {contactFields.length > 1 && (
                    <button className="remove-contact-btn" onClick={() => removeField(i)}>✕</button>
                  )}
                </div>
                <input
                  className="input"
                  placeholder={dt.contact_name}
                  value={contact.name}
                  onChange={e => updateContact(i, 'name', e.target.value)}
                />
                <input
                  className="input"
                  placeholder={dt.phone_number}
                  value={contact.phone}
                  onChange={e => updateContact(i, 'phone', e.target.value)}
                />
              </div>
            ))}

            <button className="btn btn-outline-dashed btn-full" onClick={addField}>
              👥 {dt.add_another}
            </button>

            <button className="btn btn-primary btn-full" onClick={handleFinish}>
              {dt.finish_setup}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
