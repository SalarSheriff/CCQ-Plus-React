import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tab } from '@mui/material';

import { useMsal } from '@azure/msal-react';
import {getLogs, uploadLog} from '../backendAPICalls.js'
 


//The page that displays the actual CCQ view


function CCQPage() {

    //Account information
    const { instance, accounts } = useMsal();

    const { companyName } = useParams();
    let [logs, setLogs] = useState([]);


    useEffect(()=> {
        async function fetchData() { 


            let data = await getLogs(instance, accounts, companyName);
            setLogs(data);
        }
        fetchData();
    },[])



    return(



        <>
         CCQ view page to be implemented
         You are on the {companyName} page

         <TableContainer component={Paper}>

        <Table sx={{ minWidth: 650 }}>

            <TableHead>
                <TableRow>
                    <TableCell>Time In</TableCell>
                    <TableCell>Time Out</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{log.time}</TableCell>
                            <TableCell>{log.timeOut}</TableCell>
                            <TableCell>{log.name}</TableCell>
                            <TableCell>{log.message}</TableCell>
                            <TableCell>{log.action}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
           
        </Table>

         </TableContainer>
         <Button variant='contained' onClick={()=> {uploadLog(instance, accounts, "relieved", companyName)}}>Sign Out</Button>
        
        </>
    )
}


export default CCQPage