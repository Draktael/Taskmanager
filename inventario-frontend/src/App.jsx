

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SSidebar';
import MainContent from './components/MainContent';
import './Styles/app.css';
import './Styles/inventario.css';
import './Styles/sidebar.css';
import ScrollToTop from './components/ScrollToTop'; // Importa el componente
import InventoryPage from './pages/Inventario';


const App = () => {
    

    return (
        <Router>
                <ScrollToTop /> {/* Restablece el scroll al cambiar de ruta */}
                    <div className="app">
                        <Sidebar />
                            <div className="main-content">                      
                                <Routes>
                                    <Route path="/" element={<MainContent />} />
                                    <Route path="/inventario" element={<InventoryPage />} />
                                </Routes>
                        </div>
                    </div>
        </Router>
    );
};

export default App;