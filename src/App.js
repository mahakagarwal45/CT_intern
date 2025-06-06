import './App.css';
import "./styles.css";
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Form from './Form';
import Success from "./Success";
function App() {
  return(
    <Router>
      <Routes>
        <Route path = "/" element={<Form/>}/>
        <Route path = "/success" element = {<Success/>}/>
      </Routes>
    </Router>
  );
}

export default App;
