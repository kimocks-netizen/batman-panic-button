// src/App.tsx
//import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-bounce">
        Widget Coming Soon 🚀
      </h1>
      <p className="text-lg md:text-xl mb-10 max-w-xl">
        We're cooking up something amazing for your website. Stay tuned!
      </p>
      {/* <FloatingWhatsAppButton /> */}
    </div>
  );
}

export default App;
