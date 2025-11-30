'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'About Me' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/links', label: 'Links' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      id="menu"
      className="animate-menu fixed top-[1vw] right-[15vw] z-[100] flex flex-row max-w-[50%] transition-all duration-1000"
      style={{ marginTop: 0 }}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'nav-link',
            pathname === item.href && 'active'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
