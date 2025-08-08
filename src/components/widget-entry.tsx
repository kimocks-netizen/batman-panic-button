import React from 'react';
import { createRoot } from 'react-dom/client';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

// Global configuration interface
interface WidgetConfig {
  phoneNumber?: string;
  defaultMessage?: string;
  buttonColor?: string;
  position?: 'left' | 'right';
}

// Initialize widget function
function initWidget(config: WidgetConfig = {}) {
  // Create a container for the widget
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'whatsapp-widget-container';
  document.body.appendChild(widgetContainer);

  // Render the React component with config
  const root = createRoot(widgetContainer);
  root.render(<FloatingWhatsAppButton {...config} />);
}

// Auto-initialize if config is present
if (typeof window !== 'undefined') {
  (window as any).WhatsAppWidget = { init: initWidget };
  
  // Auto-init if config present
  if ((window as any).whatsappWidgetConfig) {
    initWidget((window as any).whatsappWidgetConfig);
  }
}

export { initWidget }; 