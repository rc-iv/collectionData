import './App.css';
import React, { useState, useCallback, useEffect } from 'react';
import CollectionTable from './components/CollectionTable/CollectionTable';
import f20logo from './store/f20 logo.png'

function App() {
    const [collectionData, setCollectionData] = useState([])

    const fetchCollectionData = useCallback( async () => {
        const response = await fetch('https://4kvrvzvpaj.execute-api.us-east-1.amazonaws.com/items');
        const data = await response.json();
        // filter out all items with value of 'history' for key 'type'
        const newArray = data.filter(function (el) {
                return el.type === 'current'
            }
        );
        console.log(newArray);
        setCollectionData(newArray)

    },[]);

    useEffect(() => {
        fetchCollectionData()
    }, [fetchCollectionData])
    return (
        <React.Fragment>
            <div className='header'>
                <img src={f20logo} alt="logo" height='50' width='50'/>
                <h1>floor20.io</h1>
                <button onClick={fetchCollectionData}>Refresh Data</button>
            </div>

            <CollectionTable className='collectionTable' collectionData={collectionData}/>
        </React.Fragment>
    )
}

export default App;
