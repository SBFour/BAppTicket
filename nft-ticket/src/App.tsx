import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Ticket from './pages/ticket';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Add additional routes here for other pages */}
                    <Route path="/tickets" element={<Ticket />}  />
                    {/* <Route path="/about" element={<About />} /> */}
                    {/* <Route path="/contact" element={<Contact />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;