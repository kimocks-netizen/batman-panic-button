import { createRoot } from 'react-dom/client';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/27676308447?text=Hello%20Autoline%20Panel%20Shop,%20My%20car%20got%20into%20accident%20i%20need%20to%20enquire%20about%20quotation.."
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        backgroundColor: '#25D366',
        color: 'white',
        padding: '12px',
        borderRadius: '50%',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'background-color 0.3s ease-in-out'
      }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={25} />
    </a>
  );
};

// Create container and mount the component
const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<FloatingWhatsAppButton />);