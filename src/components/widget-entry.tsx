import React from 'react';
import { createRoot } from 'react-dom/client';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

// Create a container for the widget
const widgetContainer = document.createElement('div');
widgetContainer.id = 'whatsapp-widget-container';
document.body.appendChild(widgetContainer);

// Render the React component
const root = createRoot(widgetContainer);
root.render(<FloatingWhatsAppButton />); 