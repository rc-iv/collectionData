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
                   filter={true}
                   filters={props.filters}
                   onFilter={props.handleFilter}
                   stripedRows='true'
                   theme='md-dark-indigo'
                   resizableColumns
                   columnResizeMode="fit"
                   style={{fontSize: '12px', fontWeight: 'bold'}}
        >
            <Column field="imageUrl" header="Logo" body={imageBodyTemplate}/>
            <Column field="name" sortable header="Name" body={nameLinkTemplate}/>
            <Column field="volumeFifteenMinutes" sortable header="15m Vol" headerTooltip="15 Minute Volume"/>
            <Column field="volumeFifteenMinutesAgo" sortable header="Past 15m Vol"
                    headerTooltip="15 min volume, 15 minutes ago"/>
            <Column field="floorPrice" sortable header="Floor"/>
            <Column field="floorFifteenMinutes" sortable header="15m Floor" headerTooltip="15 Minute Floor"/>
            <Column field="floorPriceOneDay" sortable header="1D Floor"/>
            {/*<Column field="bestCollectionBid" sortable header="Bid"></Column>*/}
            {/*<Column field="totalCollectionBidValue" sortable header="TBV" headerTooltip="Total Bid Value"></Column>*/}
            <Column field="volumeOneDay" sortable header="1D Vol" headerTooltip="1 Day Volume"/>
        </DataTable>
    );
}

export default CollectionTable;