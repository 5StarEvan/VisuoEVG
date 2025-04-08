import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import List from "./components/List.jsx"
import Linkedlist from "./components/Linkedlist.jsx";
import Queue from "./components/Queue.jsx";
import Stack from "./components/Stack.jsx";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/linkedlist" element={<Linkedlist/>} />\
        <Route path="/queue" element={<Queue/>} />
        <Route path="/stack" element={<Stack/>} />

      </Routes>
    </Router>
  );
}

export default App;