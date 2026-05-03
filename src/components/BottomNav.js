'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/lib/translations';

export default function BottomNav() {
  const pathname = usePathname();
  const { language } = useApp();
  const t = useTranslation(language);

  const navItems = [
    { href: '/home', icon: '🏠', label: t.home },
    { href: '/family', icon: '👥', label: t.family },
    { href: '/settings', icon: '⚙️', label: t.settings },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item ${pathname === item.href ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
