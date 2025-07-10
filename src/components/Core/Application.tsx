import Navbar from './Navbar';
import GeneralMenu from './GeneralMenu';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { WidthProvider } from '../../providers/WidthProvider'; 
import Footer from './Footer';

function Application() { 

  return (
    <WidthProvider>
      <div className="flex flex-col h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white transition-colors duration-300 overflow-hidden">
          
          {/* Header Area - Компактний */}
          <div className="flex-shrink-0">
            <Navbar />
            <GeneralMenu />
          </div>
          
          {/* Main Work Area - Розширена */}
          <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <MainContent />
          </div>
          
          {/* Footer - Мінімальний */}
          <Footer />
      </div>
    </WidthProvider>
  );
}

export default Application;