// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4"> {/* Reduced from py-8 to py-4 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Reduced gap from gap-8 to gap-6 */}
          <div>
            <h3 className="text-md font-bold mb-2 text-yellow-400">BAT PANIC SYSTEM</h3> {/* Reduced text-lg to text-md */}
            <p className="text-sm text-gray-400"> {/* Added text-sm */}
              Emergency signaling for Gotham's finest.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2"> {/* Reduced text-sm to text-xs */}
              Quick Links
            </h4>
            <ul className="space-y-1"> {/* Reduced from space-y-2 to space-y-1 */}
              <li><a href="#" className="text-sm text-gray-400 hover:text-yellow-400">Documentation</a></li>
             {/*  <li><a href="#" className="text-sm text-gray-400 hover:text-yellow-400">Privacy Policy</a></li>*/}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2"> {/* Reduced text-sm to text-xs */}
              Contact
            </h4>
            <p className="text-sm text-gray-400">BULL Panic System</p>
              {/*  <p className="text-sm text-gray-400">Emergency: Press the button</p>*/}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-xs text-gray-400"> {/* Reduced mt-12 to mt-6, pt-8 to pt-4 */}
          © {new Date().getFullYear()} BatSignal Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}