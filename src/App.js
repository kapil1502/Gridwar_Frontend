import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homescreen from './components/Homescreen';
import FreshProduceAnalyzer from './components/FreshProduceAnalyzer';
import ProductExtraction from './components/ProductExtraction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/fresh-produce-analyzer" element={<FreshProduceAnalyzer />} />
        <Route path="/product-extractor" element={<ProductExtraction />} />
      </Routes>
    </Router>
  );
}

export default App;