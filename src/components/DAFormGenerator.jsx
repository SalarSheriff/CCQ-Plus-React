import { Container, Grid, Typography, Box, Select, MenuItem } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DAForm from './DAForm';
import { getLogsInRange, regiments } from '../backendAPICalls';
import { useMsal } from '@azure/msal-react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Cookies from 'js-cookie'
function DAFormGenerator() {

    //Account information
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();


    //Grab params from url for preload
    const {preSelectedCompany} = useParams()
    const {preSelectedDate} = useParams()


    const [companyName, setCompanyName] = useState(preSelectedCompany.toUpperCase() || "none");
    const [date, setDate] = useState(
     preSelectedDate ? dayjs(preSelectedDate, "YYYYMMDD") : dayjs()
    );
    const [logs, setLogs] = useState([])



    function handleCompanySelectChange(_company) {


        setCompanyName(_company.target.value);



    }


    // Update companyName and date when URL parameters change, this allows pre set links to load data without a state toggle
    useEffect(() => {
        if (preSelectedCompany) {
            setCompanyName(preSelectedCompany.toUpperCase());
        }
        if (preSelectedDate) {
            const parsedDate = dayjs(preSelectedDate, "YYYYMMDD");
            if (parsedDate.isValid()) {
                setDate(parsedDate);
            }
        }
    }, [preSelectedCompany, preSelectedDate]);

    useEffect(() => {
        async function fetchData() {


            let data = await getLogsInRange(companyName, date.format("YYYYMMDD"), date.add(1, "day").format("YYYYMMDD")); //only load current day's logs
            console.log(date.format("YYYYMMDD"))
            setLogs(data)
            console.log(data)
        }
        fetchData().then(() => {

            
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