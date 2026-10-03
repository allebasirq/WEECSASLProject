
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Practice from './pages/Practice'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Progress from './pages/Progress'





function App() {

  return(
  <BrowserRouter>

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/progress" element={<Progress />} />
    </Routes>

  </BrowserRouter>
  );
}

export default App