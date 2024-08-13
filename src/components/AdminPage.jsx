import { Menu, Typography, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { useMsal } from '@azure/msal-react';
import { dataFetchRate, getLogs, uploadLog, uploadPresencePatrol, getLogsInRange, uploadSpecialMessage, regiments } from '../backendAPICalls.js'
import LogDisplayTable from "./LogsDisplayTable";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from "@mui/x-date-pickers";
function AdminPage() {

    //Account information
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();


    const [logs, setLogs] = useState([]);
    const [companyName, setCompanyName] = useState("I1");


    //This will be used to track if the data has been loaded or not. Controls displaying "<Circular Indeterminate/>"
    const [dataLoaded, setDataLoaded] = useState(false);

    //Reference to the table container so that we can access its scroll
    const tableContainerRef = useRef(null);
    const [previousLogs, setPreviousLogs] = useState([]); // Used to check if logs have changed, this ensures we don't scroll down to the bottom of the table if the user has scrolled up and the data is refreshed with no changes



    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(1, "day"));


    //Scroll to the bottom of the table when new logs are added and when the table is loaded
    useEffect(() => {
        const container = tableContainerRef.current;
        if (container && (JSON.stringify(previousLogs) !== JSON.stringify(logs))) {
            setPreviousLogs(logs);
            container.scrollTop = container.scrollHeight;
        }
    }, [logs]);





    useEffect(() => {
        async function fetchData() {


            let data = await getLogsInRange(instance, accounts, companyName, startDate.format("YYYYMMDD"), endDate.add(1, "day").format("YYYYMMDD")); //only load current day's logs
            setLogs(data);
        }
        fetchData().then(() => { setDataLoaded(true) });

    }, [companyName, startDate, endDate]);


    function handleCompanySelectChange(event) {

        setCompanyName(event.target.value);
    }
    function handleStartDateChange(date) {
        setStartDate(date);
    }
    function handleEndDateChange(date) {
        setEndDate(date);
    }


    return (

        <>
            {/* If the data ins't loaded, display a circular progress bar */}
            {!dataLoaded && <CircularProgress />}
            {dataLoaded && <><Typography variant="h2">Admin Page</Typography>


                


<Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2%'
}}>
    <Select value={companyName} onChange={handleCompanySelectChange}>

{regiments.map((regiment) => (

    regiment.companies.map((company) => (
        <MenuItem value={company.name}>{company.name}</MenuItem>
    ))

))}

</Select>
<DatePicker onChange={handleStartDateChange} value={startDate} label="Start Date" />
                <DatePicker onChange={handleEndDateChange} value={endDate} label="End Date" />
                <LogDisplayTable logs={logs} tableContainerRef={tableContainerRef} />
</Box>
                
            </>}

        </>
    )


}

export default AdminPage;