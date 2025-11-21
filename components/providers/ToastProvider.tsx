'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Default options
        duration: 3000,
        style: {
          background: '#FFFFFF',
          color: '#1A1A1A',
          border: '2px solid rgba(26, 26, 26, 0.1)',
          borderRadius: '16px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        // Success
        success: {
          style: {
            background: '#10B981',
            color: '#FFFFFF',
            border: '2px solid #059669',
          },
          iconTheme: {
            primary: '#FFFFFF',
            secondary: '#10B981',
          },
        },
        // Error
        error: {
          style: {
            background: '#EF4444',
            color: '#FFFFFF',
            border: '2px solid #DC2626',
          },
          iconTheme: {
            primary: '#FFFFFF',
            secondary: '#EF4444',
          },
        },
        // Loading
        loading: {
          style: {
            background: '#3B82F6',
            color: '#FFFFFF',
            border: '2px solid #2563EB',
          },
        },
      }}
    />
  );
}
