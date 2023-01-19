import './App.css';
import React, {useState, useCallback, useEffect} from 'react';
import CollectionTable from './components/CollectionTable/CollectionTable';
import f20logo from './store/f20 logo.png'

function App() {
    const [collectionData, setCollectionData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchCollectionData = useCallback(async () => {
        setIsLoading(true)
        const response = await fetch('https://4kvrvzvpaj.execute-api.us-east-1.amazonaws.com/items');
        const data = await response.json();
        // filter out all items with value of 'history' for key 'type'
        const newArray = data.filter(function (el) {
                return el.type === 'current'
            }
        );
        console.log(newArray);
        setCollectionData(newArray)
        setIsLoading(false)
    }, []);

    useEffect(() => {
        setIsLoading(true)
        fetchCollectionData()
        setIsLoading(false)
    }, [fetchCollectionData])

    let content = <p>Data needs to load</p>

    if (isLoading) {
        content = <p>Loading...</p>
    }

    if (collectionData.length > 0) {
        content = <CollectionTable className='collectionTable' collectionData={collectionData}/>
    }

    return (
        <React.Fragment>
            <div className='header'>
                <img src={f20logo} alt="logo" height='50' width='50'/>
                <button onClick={fetchCollectionData}>Refresh Data</button>
                <h1>floor20</h1>
            </div>
            {content}
        </React.Fragment>
    )
}

export default App;
