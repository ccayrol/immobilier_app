import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Mainproject from './pages/MainProject';
import SendEmail from './components/sendMail'
import Login from './components/Login'
import NewProject from './pages/newProjects'



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen max-w-[2560px] mx-auto"> {/* Ajout de max-width et mx-auto */}
        <Header />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sendmail" element={<SendEmail/> } />
            <Route path="/projetphare" element ={<Mainproject/>} />
            <Route path="/login" element={<Login/> } />
            <Route path="/newprojects" element={<NewProject/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;