import React, {useState, useEffect} from "react"
import AdminCreateStack from "./AdminCreateStack";
import AdminUserTable from "./AdminUserTable";

const AdminCreateWithFilter = (props) =>{

    const [rowData, setRowData] = useState(null);
    const [showRowData, setShowRowData] = useState(false);
    const [stack, setStack] = useState([]);
    const [showStack, setShowStack] = useState(false);

    const onRowClick = (rowData, _event, _details) => {
        const slideData = {};
        console.log('Printing Row');
        console.log(props.properties.data.slides)
        slideData[`${rowData.row.uniqId}`] = {
            talentName: rowData.row.talentName,
            formData: {...rowData.row}, 
            curated: false
        };
        delete(slideData[`${rowData.row.uniqId}`].formData.id);
        delete(slideData[`${rowData.row.uniqId}`].formData.uniqId);
        delete(slideData[`${rowData.row.uniqId}`].formData.talentName);
        setRowData(slideData);
        setShowRowData(true);
    }

    const onCurate = (currStack, showStack) => {
        const newStack = [...stack, ...currStack];
        console.log(newStack);
        setStack(newStack);
        setShowStack(showStack);
    }
    
    return (
        <>
            <AdminUserTable properties={props.properties} handleRowClick={onRowClick}/>
            {
                showRowData ? <AdminCreateStack 
                properties={props.properties} 
                rowData = {rowData}
                currentStack = {stack} 
                showStack = {showStack}
                appendData={true}
                onCurate={onCurate}
                /> : null 
            } 
        </>
    )

}

export default AdminCreateWithFilter;