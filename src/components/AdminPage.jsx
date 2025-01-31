import { Menu, Typography, Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { useMsal } from '@azure/msal-react';
import { dataFetchRate, getLogs, uploadLog, uploadPresencePatrol, getLogsInRange, uploadSpecialMessage, validateAdmin, regiments } from '../backendAPICalls.js'
import LogDisplayTable from "./LogsDisplayTable";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from "@mui/x-date-pickers";
import Cookies from 'js-cookie'
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

    //Check server if valid admin
    useEffect(() => {


        async function checkAdmin() {

            let isAdmin = await validateAdmin(Cookies.get("username"), Cookies.get("email"));


            if (!isAdmin) {
                navigate("/unauthorized");
            }
        }
        checkAdmin();

    }, []);



    useEffect(() => {
        async function fetchData() {


            let data = await getLogsInRange(companyName, startDate.format("YYYYMMDD"), endDate.add(1, "day").format("YYYYMMDD")); //only load current day's logs
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
            {dataLoaded && <>





                <Box sx={{
                    display: 'flex', // Change from 'block' to 'flex' for flexbox layout
                    flexDirection: 'column', // Keep it as 'column' for vertical stacking
                    gap: '1rem', // Space between items
                    justifyContent: 'space-between', // Space items evenly
                    padding: '2%'
                }}>
<Typography variant="h2">Command View</Typography>

                    <Box sx={{
                        display: 'flex', // Use flexbox for layout
                        flexDirection: 'row', // Arrange items in a row
                        alignItems: 'center', // Align items vertically to the same height
                        gap: '1rem', // Add gaps between items
                        padding: '0', // Optional padding around the container
                    }}>
                        <Select  value={companyName} onChange={handleCompanySelectChange}>

                            {regiments.map((regiment) => (

                                regiment.companies.map((company) => (
                                    <MenuItem value={company.name}>{company.name}</MenuItem>
                                ))

                            ))}

                        </Select>
                        <DatePicker onChange={handleStartDateChange} value={startDate} label="Start Date" />
                        <DatePicker onChange={handleEndDateChange} value={endDate} label="End Date" />

                        <Button onClick={() => {


                            const formattedDate = startDate.format("YYYYMMDD"); // Format the current date
                            navigate(`/daform/${companyName}/${formattedDate}`);

                        }} variant="contained" color='secondary'>Export To DA Form</Button>
                    </Box>

                    <LogDisplayTable logs={logs} tableContainerRef={tableContainerRef} />
                </Box>

            </>}

        </>
    )


}

export default AdminPage;