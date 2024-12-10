import { Container, Grid, Typography, Box, Select, MenuItem } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DAForm from './DAForm';
import { getLogsInRange, regiments } from '../backendAPICalls';
import { useMsal } from '@azure/msal-react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
function DAFormGenerator() {

    //Account information
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();


    const [companyName, setCompanyName] = useState("none");
    const [date, setDate] = useState(dayjs())
    const [logs, setLogs] = useState([])



    function handleCompanySelectChange(_company) {


        setCompanyName(_company.target.value);



    }


    useEffect(() => {
        async function fetchData() {


            let data = await getLogsInRange(instance, accounts, companyName, date.format("YYYYMMDD"), date.format("YYYYMMDD")); //only load current day's logs
            console.log(date.format("YYYYMMDD"))
            setLogs(data)
        }
        fetchData().then(() => {

            console.log(log)
        });

    }, [date, companyName]);
    return (<>

<Typography variant='h2'>DA FORM GENERATOR</Typography>
   
        <Typography variant='h6'>Date</Typography>
    <DatePicker value={date} onChange={(newDate) => setDate(newDate)}></DatePicker>
    <Typography variant='h6'>Company</Typography>
<Select value={companyName} onChange={handleCompanySelectChange}>

    {regiments.map((regiment) => (

        regiment.companies.map((company) => (
            <MenuItem value={company.name}>{company.name}</MenuItem>
        ))

    ))}

</Select>

    

        <DAForm logs={logs} date={date.format("YYYY/MM/DD")} />
    </>)
}

export default DAFormGenerator;