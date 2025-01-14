import { Container, Box, Dialog, DialogActions,Button, DialogContent, DialogContentText,DialogTitle, Slide, CircularProgress ,Link} from "@mui/material";
import CompanyDisplayPaper from "./CompanyDisplayPaper";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { uploadLog, getLastLogForEachCompany, wakeUpServer, dataFetchRate , regiments, apiEndpoint} from '../backendAPICalls.js'

import Cookies from 'js-cookie';
//Transition for the dialogue modal
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  
function CompanySelectorPage() {


  

    const { instance, accounts } = useMsal();
//This has to be retrieved here rather than passed through App.jsx because if the user is not logged in, 
//getting {accounts[0].name}{accounts[0].username} will throw an error
//When this page is loaded a user has to be logged in
    let accountName = Cookies.get("username")
    let accountEmail = Cookies.get("email")

const navigate = useNavigate(); 

//The latest logs for each company
    const [lastLogs, setLastLogs] = useState([]);


   

    //This will be used to track the company that the user has selected to sign in to. Whose button they clicked
    const [selectedCompany, setSelectedCompany] = useState(null);

    //This will be used to track if the data has been loaded or not. Controls displaying "<Circular Indeterminate/>"
    const [dataLoaded, setDataLoaded] = useState(false);
      

    //This will be used to track if the dialogue box is open or not to confirm singing in
      const [confirmationDialogueOpen, setConfirmationDialogueOpen] = React.useState(false);

      const handleConfirmationDialogueOpen = () => {
        setConfirmationDialogueOpen(true);
      };
    
      const handleConfirmationDialogueClose = () => {
       setConfirmationDialogueOpen(false);
      };

      function handleConfirmationDialogueAccept() {

        //upload to database

        
        uploadLog(Cookies.get("username"), Cookies.get("email"),"assumes", selectedCompany);//backendAPICalls.js

        navigate("/ccq/" + selectedCompany);
      }
        





    
    

    //This function will be called when a user clicks on a company to sign in
    //It will open a dialogue box asking if the user is sure they want to sign in
    //If the user clicks yes, it will call the sign in function and pass the company
    function handleSelectCompany(_company) {

        //alert(_company)
      
        setSelectedCompany(_company);
        
setConfirmationDialogueOpen(true);
        
    }

    useEffect(() => { 

      // Async functions must be defined in useEffect
    const fetchLastLogs = async () => { 
      try {
          const logs = await getLastLogForEachCompany(); //backendAPICalls.js
          setLastLogs(logs);
          setDataLoaded(true); // Set dataLoaded to true only after successfully fetching the data
      } catch (error) {
          console.error("Failed to fetch logs:", error);
      }
  }
      // Function to ping the server and fetch data
      const pingServerAndFetchLogs = async () => {
          try {
              const serverResponse = await wakeUpServer(); // Wake up the server
              if (serverResponse instanceof Error) {
                  console.error("Error waking up server:", serverResponse);
                  // Handle the error case as needed
              } else {
                  await fetchLastLogs(); // Fetch data after server wakes up

                  //DO not constanly ping server to reload logs on home page
                  //const intervalId = setInterval(fetchLastLogs, dataFetchRate); // Update data every 2 seconds
  
                  // Cleanup function to clear the interval
                  //return () => clearInterval(intervalId);
              }
          } catch (error) {
              console.error("Unexpected error:", error);
          }
      };
  
      pingServerAndFetchLogs();
  
  }, [instance, accounts]);
  

//Device switch support
  //This will check if the user is signed in to any company and if they are, it will send them to the CCQ page
useEffect(()=> {

  lastLogs.forEach(log => {

    //Check if they are logged in or posted any message, then send them over to the CCQ page
    //This supports device switching. 
    //Make sure not to send them if they are relieved
    if(log.name == Cookies.get("username") && log.action != "relieved") {
      navigate("/ccq/" + log.company);
    }
    
  });

}, [lastLogs])





    //This will take a "last log" and generate the text to be displayed on the button
    //Ex if the last log for I1 was CDT Sheriff assumed, then it would say, CDT Sheriff is currently on the CCQ
    function getButtonDisplayText(log) {
        if(log) {
            return `${log.name} is currently on the CCQ`
        }
    }

    return (

        <>


       {!dataLoaded && <><CircularProgress/> <Link href={apiEndpoint.replace("api/", "")}>Click this link if site is not loading</Link></>}
       
       
       {dataLoaded &&  <Box sx={{
            paddingLeft: { xs: '5%', sm: '5%', md: '5%', lg: '5%' },
            paddingRight: { xs: '5%', sm: '5%', md: '5%', lg: '5%' },
            paddingTop: { xs: '2%', sm: '2%', md: '2%', lg: '2%' },
            margin: 'auto',
           overflow: 'auto',
        }}>

     
            {regiments.map((regiment) => (

                <Grid container spacing={'5%'}>

                    {regiment.companies.map((company) => (
                        <Grid xs={12} sm={12} lg={4} xl={4}>
                           

                           {/* Access the data by setting company to to company.name */}

{/* != relieved rather than === assumes, because if a presence patrol is the last message or there is another message it still means someone is signed in */}
                            {lastLogs.length > 0 && (lastLogs.find(log=>log.company===company.name) && lastLogs.find(log=>log.company===company.name).action != "relieved")? <CompanyDisplayPaper handleSelectCompany={handleSelectCompany} company={company.name} mascot={company.mascot} buttonText={getButtonDisplayText(lastLogs.find(log=>log.company===company.name))}  /> :<CompanyDisplayPaper handleSelectCompany={handleSelectCompany} company={company.name} mascot={company.mascot} buttonText="Sign In" /> }
               
                            
                            
                        </Grid>
                    ))}

                    
                </Grid>

            ))}


<Dialog
        open={confirmationDialogueOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleConfirmationDialogueClose}
        aria-describedby="alert-dialog-slide-description"
        
      >

      
        <DialogTitle >Sign Into the {selectedCompany} CCQ</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description">
           Confirm signing into the {selectedCompany} CCQ as {accountName}({accountEmail}). 
           <br/>
           False Logs are subject to the USMA Honor Code
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogueClose}>Dismiss</Button>
          <Button onClick={handleConfirmationDialogueAccept}>Sign In</Button>
        </DialogActions>
      </Dialog>

        </Box>}
        </>
    )
}

export default CompanySelectorPage;