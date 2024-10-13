import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Calculator from './components/Calculator';
import Results from './components/Results';
import AdminOptions from './components/AdminOptions';
import AdminUPP from './components/AdminUPP';
import VersionHistory from './components/VersionHistory';
import BasePriceSettings from './components/BasePriceSettings';
import LogicManagement from './components/LogicManagement';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      console.error('Error caught by ErrorBoundary');
    }
  }, [hasError]);

  if (hasError) {
    return <h1 className="text-red-500 text-2xl font-bold">Something went wrong. Please try refreshing the page.</h1>;
  }

  return children;
}

function App() {
  const [calculationResults, setCalculationResults] = useState(null);
  const [formData, setFormData] = useState(null);
  const [uppData, setUppData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log('App component mounted');
    const savedUppData = localStorage.getItem('uppData');
    if (savedUppData) {
      setUppData(JSON.parse(savedUppData));
    }
  }, []);

  const handleCalculate = (data) => {
    console.log('Calculation triggered with data:', data);
    const matchedUpp = uppData.find(
      row => row.sizeX === parseFloat(data.sizeX) && row.sizeY === parseFloat(data.sizeY)
    );

    console.log('Matched UPP:', matchedUpp);

    const mockResults = {
      pcsPrice: Math.random() * 1000,
      pnlPrice: Math.random() * 10000,
      upp: matchedUpp ? matchedUpp.upp : 'N/A'
    };
    setCalculationResults(mockResults);
    setFormData(data);
  };

  const handleUppDataUpdate = (newUppData) => {
    setUppData(newUppData);
    localStorage.setItem('uppData', JSON.stringify(newUppData));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 flex">
          {/* Sidebar */}
          <nav className={`bg-gray-800 w-64 min-h-screen flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
            <div className="p-4">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                BGA Online
              </h1>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsSidebarOpen(false)}>首页</Link>
                </li>
                <li>
                  <Link to="/admin/options" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsSidebarOpen(false)}>选项管理</Link>
                </li>
                <li>
                  <Link to="/admin/upp" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsSidebarOpen(false)}>UPP 管理</Link>
                </li>
                <li>
                  <Link to="/admin/base-price" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsSidebarOpen(false)}>基础价格</Link>
                </li>
                <li>
                  <Link to="/admin/logic" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsSidebarOpen(false)}>逻辑管理</Link>
                </li>
                <li>
                  <Link to="/version-history" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsSidebarOpen(false)}>版本历史</Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main content */}
          <div className="flex-grow">
            <header className="bg-gray-800 shadow-md">
              <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <button className="md:hidden text-gray-300 hover:text-white" onClick={toggleSidebar}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </button>
                <h1 className="text-xl font-semibold md:hidden">BGA Online</h1>
              </div>
            </header>
            <main className="container mx-auto p-4 flex-grow">
              <Routes>
                <Route path="/" element={
                  <>
                    <Calculator onCalculate={handleCalculate} />
                    {calculationResults && <Results results={calculationResults} formData={formData} />}
                  </>
                } />
                <Route path="/admin/options" element={<AdminOptions />} />
                <Route path="/admin/upp" element={<AdminUPP onUppDataUpdate={handleUppDataUpdate} />} />
                <Route path="/admin/base-price" element={<BasePriceSettings />} />
                <Route path="/admin/logic" element={<LogicManagement />} />
                <Route path="/version-history" element={<VersionHistory />} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-center p-4">
              <p className="text-sm text-gray-400">版本: 1010-9</p>
            </footer>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;