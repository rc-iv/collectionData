import logo from './logo.svg';
import './App.css';
import React from 'react';
import CollectionTable from './components/CollectionTable/CollectionTable';
import f20logo from './store/f20 logo.png'
function App() {
    return (
        <React.Fragment>
            <div className='header'>
                <img src={f20logo} alt="logo" height='50' width='50'/>
                <h1>floor20.io</h1>
            </div>

            <CollectionTable className='collectionTable'/>
        </React.Fragment>
    )
}

export default App;
