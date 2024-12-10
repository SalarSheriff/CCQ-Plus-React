import { Container, Grid, Typography, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DAForm from './DAForm';
import { getLogsInRange } from '../backendAPICalls';
import { useMsal } from '@azure/msal-react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
function DAFormGenerator() {

//Account information
const { instance, accounts } = useMsal();
const navigate = useNavigate();


    const [companyName, setCompanyName] = useState("A1");
    const [date, setDate] = useState(dayjs())
    const [logs, setLogs] = useState([])
    useEffect(() => {
        async function fetchData() {

          
            let data = await getLogsInRange(instance, accounts, companyName, date.format("YYYYMMDD"), date.add(1, "day").format("YYYYMMDD")); //only load current day's logs
            console.log(date.format("YYYYMMDD"))
            setLogs(data)
        }
        fetchData().then(() => { 

            console.log(log)
        });

    }, []);
    return(<>
    
    <DAForm logs={logs} date={date.format("YYYY/MM/DD")}/>
    </>)
}

export default DAFormGenerator;