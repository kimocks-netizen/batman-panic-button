import { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const FloatingWhatsAppButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('Hello Autoline Panel Shop, My car got into accident i need to enquire about quotation..');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/27676308447?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    handleCloseModal();
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out animate-bounce-delay"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={25} />
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 mb-20 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Start WhatsApp Conversation</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message:
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                placeholder="Enter your message..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSendMessage}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={16} />
                Send on WhatsApp
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingWhatsAppButton;
