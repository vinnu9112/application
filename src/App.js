import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import DetailState from './context/details/DetailState';

function App() {
  return (
    <>
    <DetailState>
    <Router>
      <Navbar/>
      <div className='container'>
      <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
      </Routes>
      </div>
    </Router>
    </DetailState>
    </>
  );
}

export default App;
