import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import GlobalBackground from './components/common/GlobalBackground';
// import Home from './pages/Home';

function App() {
  return (
    <Router>
    <GlobalBackground>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
      </GlobalBackground>
    </Router>
  );
}

export default App;