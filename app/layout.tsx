import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Neeraj Parekh Portfolio',
  description: 'ENTC Engineer - Tech Explorer, IoT Hobbyist, Aspiring Engineer',
  keywords: ['Neeraj Parekh', 'Portfolio', 'ENTC', 'Engineer', 'IoT', 'Developer'],
  authors: [{ name: 'Neeraj Parekh' }],
  icons: {
    icon: '/assets/images/neeraj.png',
    shortcut: '/assets/images/neeraj.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className="light-theme font-sans">
        {children}
      </body>
    </html>
  );
}
