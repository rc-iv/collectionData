import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";


const CollectionTable = (props) => {
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.imageUrl} height='50px' width='50px'/>
    }

    const nameLinkTemplate = (rowData) => {
        return <a href={`https://blur.io/collection/${rowData.collectionSlug}`} target="_blank">{rowData.name}</a>
    }
    return (
        <DataTable value={props.collectionData}
                   sortField="volumeFifteenMinutes"
                   sortOrder={-1}
                   stripedRows='true'
                   theme='md-dark-indigo'
                   resizableColumns
                   columnResizeMode="fit"
                   style={{fontSize: '20px', fontWeight: 'bold'}}
        >
            <Column field="imageUrl" header="Logo" body={imageBodyTemplate}></Column>
            <Column field="name" sortable header="Name" body={nameLinkTemplate}></Column>
            <Column field="volumeFifteenMinutes" sortable header="15mV" headerTooltip="15 Minute Volume"></Column>
            <Column field="floorPrice" sortable header="Floor"></Column>
            <Column field="floorPriceOneDay" sortable header="1D Floor"></Column>
            <Column field="bestCollectionBid" sortable header="Bid"></Column>
            <Column field="totalCollectionBidValue" sortable header="TBV" headerTooltip="Total Bid Value"></Column>
            <Column field="volumeOneDay" sortable header="1DV" headerTooltip="1 Day Volume"></Column>
        </DataTable>
    );
}

export default CollectionTable;