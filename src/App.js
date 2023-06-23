import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/about" element={<About></About>} ></Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
