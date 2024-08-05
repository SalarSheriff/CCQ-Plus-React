import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tab } from '@mui/material';
import {Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, Slide } from "@mui/material";
import { useMsal } from '@azure/msal-react';
import {dataFetchRate, getLogs, uploadLog, uploadPresencePatrol} from '../backendAPICalls.js'
import CircularProgress from '@mui/material/CircularProgress';

//Transition for the dialogue modal
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

//The page that displays the actual CCQ view


function CCQPage() {

    
    //Account information
    const { instance, accounts } = useMsal();

    const navigate = useNavigate();

    const { companyName } = useParams();
    let [logs, setLogs] = useState([]);


    //State for managing presence patrol timer
    const [patrolTimer, setPatrolTimer] = useState(0);
    const [isPatrolling, setIsPatrolling] = useState(false);


    //This will be used to track if the data has been loaded or not. Controls displaying "<Circular Indeterminate/>"
    const [dataLoaded, setDataLoaded] = useState(false);

    const [dialogueOpen, setDialogueOpen] = React.useState(false);
    const [dialogueTitle, setDialogueTitle] = React.useState("");
    const [dialogueMessage, setDialogueMessage] = React.useState("");


    useEffect(()=> {
        async function fetchData() { 


            let data = await getLogs(instance, accounts, companyName);
            setLogs(data);
        }
        fetchData().then(()=> { setDataLoaded(true)} );
        setInterval(fetchData, dataFetchRate);
    },[])


    //Manage the patrol timer
    useEffect(() => {
        let timer;
        if (isPatrolling) {
            timer = setInterval(() => {
                setPatrolTimer(prevTime => prevTime + 1);
            }, 1000); // Increment every second
        }

        return () => {
            clearInterval(timer);
        };
    }, [isPatrolling]);



    function handleDialogOpen(title, message) {
        setDialogueTitle(title);
        setDialogueMessage(message);
        setDialogueOpen(true);
    }

    function handleDialogueCancel() {
        setDialogueOpen(false);
    }


    //based on the current dialogue title and message, this function will handle the accept button
    //Rather than having multiple functions and Dialog Objects for each dialogue, this function will handle all of them
    function handleDialogueAccept() {

        if(dialogueTitle === "Sign Out") {
            uploadLog(instance, accounts, "relieved", companyName);
            setDialogueOpen(false);
            navigate("/");
        }
        else if(dialogueTitle === "Presence Patrol") {
           
          
            //Begin a patrol
                setIsPatrolling(true);
                setDialogueOpen(false);

               
         
           
               
            
            
        }
        else if(dialogueTitle === "End Presence Patrol") {
            setIsPatrolling(false);
            
            setDialogueOpen(false)


            //Upload Presence Patrol to server
            uploadPresencePatrol(instance, accounts, "patrol", companyName, patrolTimer);

            //Reset timer
            setPatrolTimer(0);
        }
    }
    return(


        <>
        {/* If the data ins't loaded, display a circular progress bar */}
        {!dataLoaded && <CircularProgress/>}
       

       {/* If the data is loaded then display the table */}
        {dataLoaded && <>
        
        
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

         <Button variant='contained' color='success' onClick={()=> { 

//If the button is clicked begin a patrol. If a patrol is already being conducted, end the patrol
            if(!isPatrolling) {
                handleDialogOpen("Presence Patrol", "Begin presence patrol for " + companyName + "?");
            }
           else {
            handleDialogOpen("End Presence Patrol", "End presence patrol for " + companyName + "?");
           }

         }} > {isPatrolling ? "Patroling for: " +  patrolTimer + " seconds": "Begin Presence Patrol" }</Button>
         <Button variant='contained' onClick={()=> {
            handleDialogOpen("Sign Out", "Are you sure you want to sign out?");
           
           
    
            }}>Sign Out</Button>


        <Dialog
        open={dialogueOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogueCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogueTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
           {dialogueMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogueCancel}>Close</Button>
          <Button onClick={handleDialogueAccept}>Ok</Button>
        </DialogActions>
      </Dialog>

        </>}
        </>
    )
}


export default CCQPage