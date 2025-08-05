import { useEffect } from 'react';

function WhatsAppWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://batman-panic-button.vercel.app/widget/whatsapp-widget.umd.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default WhatsAppWidget;