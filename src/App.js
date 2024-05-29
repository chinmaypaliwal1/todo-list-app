import './App.css';
import Navbar from './compnents/Navbar';
import TextForm from './compnents/TextForm';
import About from './compnents/About';
import React, { useState } from 'react';
import Alert from './compnents/Alert';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'black';
      showAlert('Dark Mode Enabled', 'success');
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('Light Mode Enabled', 'success');
    }
  }

  return (
    <>
      <Router>
        <Navbar title="My TextUtils" about="About TextUtils" mode={mode} toggleMode={toggleMode}></Navbar>
        <div className="container">
          <Alert alert={alert}/>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<TextForm showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
