import './App.css';
import React, {useState, useCallback, useEffect} from 'react';
import CollectionTable from './components/CollectionTable/CollectionTable';
import f20logo from './store/f20 logo.png'

function App() {
    const [collectionData, setCollectionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);


    // function that grabs the top collections (more than 1eth 15mv) then fetche
    const fetchTopCollections = useCallback(async () => {
        console.log("Fetching top collections");
        setIsLoading(true);
        const response = await fetch('https://4kvrvzvpaj.execute-api.us-east-1.amazonaws.com/collections');
        const topCollectionData = await response.json();
        const addressList = topCollectionData.collectionList.map(collection => collection.contractAddress);
        console.log(addressList);
        let dataList = [];

        // loop through addressList
        for (const addressListKey in addressList) {
            console.log(addressListKey);
            const currentResponse = await fetch(`https://4kvrvzvpaj.execute-api.us-east-1.amazonaws.com/items/${addressList[addressListKey]}`);
            let collectionData = await currentResponse.json();
            const response = await fetch(`https://4kvrvzvpaj.execute-api.us-east-1.amazonaws.com/history/${addressList[addressListKey]}`);

            try {
                const collectionHistory = await response.json();
                console.log(collectionHistory.history);
                // collectionData.floorFifteenMinutes = parseFloat(collectionData.floorPrice)
                //     - parseFloat(collectionHistory.history[collectionHistory.history.length - 1].floorPrice);
                collectionData.floorFifteenMinutes = collectionHistory.history[collectionHistory.history.length - 1].floorPrice;
                console.log(collectionHistory.history[collectionHistory.history.length - 1]);
                collectionData.volumeFifteenMinutesAgo = collectionHistory.history[collectionHistory.history.length - 1].volumeFifteenMinutes;
                console.log(collectionData);
            } catch (e) {
                collectionData.floorFifteenMinutes = 0;
                collectionData.volumeFifteenMinutesAgo = 0;
            }

            dataList.push(collectionData);

        }
        setLastUpdated(topCollectionData.lastUpdated);
        setCollectionData(dataList);
        setIsLoading(false);
    });

    // Function that grabs all collections from the DB and sets the state
    const fetchCollectionData = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch('https://4kvrvzvpaj.execute-api.us-east-1.amazonaws.com/items');
        const data = await response.json();
        // filter out all items with value of 'history' for key 'type'
        const newArray = data.filter(function (el) {
                return el.type === 'current'
            }
        );
        console.log(newArray);
        setCollectionData(newArray);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        console.log("useEffect fired off");
        setIsLoading(true);
        fetchTopCollections().then(() => {
            console.log('finished fetching')
        });
        setIsLoading(false);
    }, [])

    let content = <p>Data needs to load</p>

    if (isLoading) {
        content = <p>Loading...</p>
    }

    if (collectionData.length > 0) {
        content = <CollectionTable className='collectionTable'
                                   collectionData={collectionData}
        />
    }

    return (
        <React.Fragment>
            <div className='header'>
                <img src={f20logo} alt="logo" height='50' width='50'/>
                <button onClick={fetchTopCollections}>Refresh Data</button>
                <h1>floor20</h1>
                <p>Last Updated: {lastUpdated} EST</p>
            </div>
            {content}
        </React.Fragment>
    )
}

export default App;
