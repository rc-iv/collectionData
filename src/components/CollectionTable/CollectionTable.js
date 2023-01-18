import React, {useState, useCallback, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
import { TabView,TabPanel } from "primereact/tabview";


const CollectionTable = (props) => {
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
        <DataTable value={collectionData}>
            {/*<Column field="imageUrl" header="Logo"></Column>*/}
            <Column field="name" sortable header="Name"></Column>
            <Column field="floorPrice" sortable header="Floor"></Column>
            <Column field="bestCollectionBid" sortable header="Bid"></Column>
            <Column field="volumeFifteenMinutes" sortable header="15mV"></Column>
            <Column field="numberOwners" sortable header="Owners"></Column>
            <Column field="totalSupply" sortable header="Supply"></Column>
            <Column field="totalCollectionBidValue" sortable header="TBV"></Column>
            <Column field="volumeOneDay" sortable header="1DV"></Column>
        </DataTable>
    );
}

export default CollectionTable;