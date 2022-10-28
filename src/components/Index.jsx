import React from 'react'
import Home from './Home';
import Createblog from './Createblog';
import Daisynavbar from './Daisynavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Index = () => {
    return (
        <>
            <Router>
                <Daisynavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/createblog" element={<Createblog />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index