// src/widget.tsx
//import React from 'react';
import { createRoot } from 'react-dom/client';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<FloatingWhatsAppButton />);
}

export default { init };

// Make globally accessible
if (typeof window !== 'undefined') {
  (window as any).WhatsAppWidget = { init };
}
