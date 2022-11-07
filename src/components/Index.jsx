import React from 'react'
import Blog from './Blog';
import Home from './Home';
import Error from './Error';
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
                    <Route exact path='/blog/:id' element={<Blog />} />    
                    <Route path="/createblog" element={<Createblog />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index