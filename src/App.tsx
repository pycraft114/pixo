import React from 'react';
import './App.css';
import {SvgRenderer} from "./components/svg-renderer/SvgRenderer";

function App() {
    console.log('app');
    return (
        <div className="App">
            <SvgRenderer/>
        </div>
    );
}

export default App;
