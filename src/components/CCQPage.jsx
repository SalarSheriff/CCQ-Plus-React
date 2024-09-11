import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button,Box, Tab, TextField, Typography } from '@mui/material';
import {Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, Slide } from "@mui/material";
import { useMsal } from '@azure/msal-react';
import {dataFetchRate, getLogs, uploadLog, uploadPresencePatrol, getLogsInRange, uploadSpecialMessage} from '../backendAPICalls.js'
import CircularProgress from '@mui/material/CircularProgress';
import LogDisplayTable from './LogsDisplayTable.jsx';
import dayjs from 'dayjs';
import {  Grid, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import UploadImagesForm from './UploadImagesForm.jsx';

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

    const [patrolComments, setPatrolComments] = useState("");

    //This will be used to track if the data has been loaded or not. Controls displaying "<Circular Indeterminate/>"
    const [dataLoaded, setDataLoaded] = useState(false);

    const [dialogueOpen, setDialogueOpen] = React.useState(false);
    const [dialogueTitle, setDialogueTitle] = React.useState("");
    const [dialogueMessage, setDialogueMessage] = React.useState("");

    const [specialMessageComments, setSpecialMessageComments] = useState("");

    //Reference to the table container so that we can access its scroll
    const tableContainerRef = useRef(null);
    const [previousLogs, setPreviousLogs] = useState([]); // Used to check if logs have changed, this ensures we don't scroll down to the bottom of the table if the user has scrolled up and the data is refreshed with no changes
  

    //Scroll to the bottom of the table when new logs are added and when the table is loaded
      useEffect(() => {
        const container = tableContainerRef.current;
        if (container && (JSON.stringify(previousLogs) !== JSON.stringify(logs))) {
        setPreviousLogs(logs);
          container.scrollTop = container.scrollHeight;
        }
      }, [logs]);
    

    useEffect(()=> {

      //initial load
        async function fetchData() { 


            let data = await getLogsInRange(instance, accounts, companyName, dayjs().format('YYYYMMDD'), dayjs().add(1, "day").format("YYYYMMDD")); //only load current day's logs
            setLogs(data);
        }
        fetchData().then(()=> { setDataLoaded(true)} );
        //setInterval(fetchData, dataFetchRate);
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


//The initial version of this function is called when the page is loaded in useEffect()
// This is called after a log is submitted
// We DO NOT want to now user intervals to constantly load data from SQL every 2 seconds
    async function fetchDataFromServer() {
      let data = await getLogsInRange(instance, accounts, companyName, dayjs().format('YYYYMMDD'), dayjs().add(1, "day").format("YYYYMMDD")); //only load current day's logs
      setLogs(data);
    }


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
            uploadLog(instance, accounts, "relieved", companyName).then(()=> {
              setDialogueOpen(false);
              navigate("/");
            });

            //HAVE TO ADD A DELAY HERE TO ENSURE THE LOG IS UPLOADED BEFORE NAVIGATING


            
            
        }
        else if(dialogueTitle === "Inspection") {
           
          
            //Begin a patrol
                setIsPatrolling(true);
                setDialogueOpen(false);

               
         
           
               
            
            
        }
        else if(dialogueTitle === "End Inspection") {
            setIsPatrolling(false);
            
            setDialogueOpen(false)


            //Upload Inspection to server
            uploadPresencePatrol(instance, accounts, "inspection", companyName, patrolTimer, patrolComments).then(()=> {
//After the message is uploaded, fetch the data from the server to update the ui
fetchDataFromServer()
            })

            //Reset timer
            setPatrolTimer(0);
        }
        else if(dialogueTitle === "Special Message") { 


          uploadSpecialMessage(instance, accounts, "special message", companyName, specialMessageComments).then(()=> {
            //After the message is uploaded, fetch the data from the server to update the ui
        fetchDataFromServer()
          });
          setDialogueOpen(false);
          setSpecialMessageComments("");
        }


        
    }
    function handlePatrolCommentsChange(event) {
        setPatrolComments(event.target.value);
    }
    function handleSpecialMessageCommentsChange(event) { 


        setSpecialMessageComments(event.target.value);
    }

    return(


        <>
        {/* If the data ins't loaded, display a circular progress bar */}
        {!dataLoaded && <CircularProgress/>}
       

       {/* If the data is loaded then display the table */}
        {dataLoaded && <>
        
        
         <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '10%',
          marginRight: '10%',
          textAlign: 'center',
         }}>
<Typography variant='h2'>{companyName} CCQ</Typography>
         

         <LogDisplayTable logs={logs} tableContainerRef={tableContainerRef}/>



         <Button variant='contained' color='success' onClick={()=> { 

//If the button is clicked begin a patrol. If a patrol is already being conducted, end the patrol
            if(!isPatrolling) {
                handleDialogOpen("Inspection", "Begin inspection for " + companyName + "?");
            }
           else {
            handleDialogOpen("End Inspection", "End inspection for " + companyName + "?");
           }

         }} > {isPatrolling ? "Inspecting for: " +  patrolTimer + " seconds": "Begin Inspection" }</Button>




<Box sx={{
  display: 'flex',
  flexDirection: 'row',
  gap:'2',
  
}}>
<TextField onChange={handleSpecialMessageCommentsChange} value={specialMessageComments} placeholder='Special Message'></TextField>


<Button variant='contained' color='warning' onClick={()=> { 

    handleDialogOpen("Special Message", "Send special message to " + companyName + "?");

} }>Send Special Message</Button>
</Box>
        
         <Button variant='contained' onClick={()=> {
            handleDialogOpen("Sign Out", "Are you sure you want to sign out?");
           
           
    
            }}>Sign Out</Button>

<UploadImagesForm companyName={companyName}/>
</Box>

        <Dialog
        open={dialogueOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogueCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogueTitle} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
           {dialogueMessage}
          

            <br/>
            {/* If closing a patrol display an input for a message too. */}
           {isPatrolling && <><TextField onChange={handlePatrolCommentsChange} placeholder='Patrol Comments' value={patrolComments}></TextField></>}


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