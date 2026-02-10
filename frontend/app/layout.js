import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Scalable Task App',
  description: 'A scalable web app with authentication and task management dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
