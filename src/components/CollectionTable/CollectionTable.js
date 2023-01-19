import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";


const CollectionTable = (props) => {

    return (
        <DataTable value={props.collectionData} sortField="volumeFifteenMinutes" sortOrder={-1}>
            {/*<Column field="imageUrl" header="Logo"></Column>*/}
            <Column field="name" sortable header="Name"></Column>
            <Column field="floorPrice" sortable header="Floor"></Column>
            <Column field="bestCollectionBid" sortable header="Bid"></Column>
            <Column field="volumeFifteenMinutes" sortable header="15mV" headerTooltip="15 Minute Volume"></Column>
            <Column field="totalCollectionBidValue" sortable header="TBV" headerTooltip="Total Bid Value"></Column>
            <Column field="volumeOneDay" sortable header="1DV" headerTooltip="1 Day Volume"></Column>
        </DataTable>
    );
}

export default CollectionTable;