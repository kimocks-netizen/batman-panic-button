import { createRoot } from 'react-dom/client';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import './widget.css';

// Load React if not already available
function ensureReact() {
  return new Promise<void>((resolve) => {
    if (window.React && window.ReactDOM) {
      return resolve();
    }

    const reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@18.2.0/umd/react.production.min.js';
    reactScript.onload = () => {
      const reactDomScript = document.createElement('script');
      reactDomScript.src = 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js';
      reactDomScript.onload = () => resolve();
      document.head.appendChild(reactDomScript);
    };
    document.head.appendChild(reactScript);
  });
}

export async function init(config = {}) {
  await ensureReact();
  
  const container = document.createElement('div');
  container.id = 'whatsapp-widget-root';
  document.body.appendChild(container);
  
  const root = createRoot(container);
  root.render(<FloatingWhatsAppButton {...config} />);
}

// Auto-init when loaded directly
if (typeof window !== 'undefined') {
  (window as any).WhatsAppWidget = { init };
  
  if ((window as any).whatsappWidgetConfig) {
    init((window as any).whatsappWidgetConfig);
  }
}