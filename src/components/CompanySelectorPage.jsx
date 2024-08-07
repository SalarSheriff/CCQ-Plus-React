import { Container, Box, Dialog, DialogActions,Button, DialogContent, DialogContentText,DialogTitle, Slide } from "@mui/material";
import CompanyDisplayPaper from "./CompanyDisplayPaper";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { uploadLog, getLastLogForEachCompany, dataFetchRate } from '../backendAPICalls.js'
//Transition for the dialogue modal
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  
function CompanySelectorPage() {

    const { instance, accounts } = useMsal();
//This has to be retrieved here rather than passed through App.jsx because if the user is not logged in, 
//getting {accounts[0].name}{accounts[0].username} will throw an error
//When this page is loaded a user has to be logged in
    let accountName = accounts[0].name;
    let accountEmail = accounts[0].username;


const navigate = useNavigate(); 

//The latest logs for each company
    const [lastLogs, setLastLogs] = useState([]);


   

    //This will be used to track the company that the user has selected to sign in to. Whose button they clicked
    const [selectedCompany, setSelectedCompany] = useState(null);

    
      

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

        
        uploadLog(instance, accounts,"assumes", selectedCompany);//backendAPICalls.js

        navigate("/ccq/" + selectedCompany);
      }
        




    const regiments = [
        {
            id: 1,
            name: '1st Regiment',
            motto: 'First and Proud',
            companies: [
                {
                    id: 1,
                    name: 'A1',
                    mascot: "Assassins",
                    slogan: "A1 SLOGAN!"
                },
                {
                    id: 2,
                    name: 'B1',
                    mascot: "Barbarians",
                    slogan: "B1 SLOGAN!"
                },
                {
                    id: 3,
                    name: 'C1',
                    mascot: "Celts",
                    slogan: "C1 SLOGAN!"
                },
                {
                    id: 4,
                    name: 'D1',
                    mascot: "Ducks",
                    slogan: "D1 SLOGAN!"
                },
                {
                    id: 5,
                    name: 'E1',
                    mascot: "Vikings",
                    slogan: "E1 SLOGAN!"
                },
                {
                    id: 6,
                    name: 'F1',
                    mascot: "Firehouse",
                    slogan: "F1 SLOGAN!"
                },
                {
                    id: 7,
                    name: 'G1',
                    mascot: "Greeks",
                    slogan: "G1 SLOGAN!"
                }, {
                    id: 8,
                    name: 'H1',
                    mascot: "Hogs",
                    slogan: "H1 SLOGAN!"
                }, {
                    id: 9,
                    name: 'I1',
                    mascot: "Iron Horses",
                    slogan: "Rum Em Down!"
                }
            ]
        }
    ]


    
    

    //This function will be called when a user clicks on a company to sign in
    //It will open a dialogue box asking if the user is sure they want to sign in
    //If the user clicks yes, it will call the sign in function and pass the company
    function handleSelectCompany(_company) {

        //alert(_company)
      
        setSelectedCompany(_company);
        
setConfirmationDialogueOpen(true);
        
    }

    useEffect(() => { 


        //Async functions must be defined in useEffect
        const fetchLastLogs = async () => { 


            const logs = await getLastLogForEachCompany(instance, accounts);//backendAPICalls.js
            console.log(logs)
            setLastLogs(logs);
           console.log( logs.find(log=>log.company==="I1"))
        }

        fetchLastLogs();

        setInterval(fetchLastLogs, dataFetchRate); //updates data every 2 seconds
    
        
    },[] )

    //This will take a "last log" and generate the text to be displayed on the button
    //Ex if the last log for I1 was CDT Sheriff assumed, then it would say, CDT Sheriff is currently on the CCQ
    function getButtonDisplayText(log) {
        if(log) {
            return `${log.name} is currently on the CCQ`
        }
    }

    return (
        <Box sx={{
            paddingLeft: { xs: '5%', sm: '5%', md: '5%', lg: '5%' },
            paddingRight: { xs: '5%', sm: '5%', md: '5%', lg: '5%' },
            paddingTop: { xs: '2%', sm: '2%', md: '2%', lg: '2%' },
            margin: 'auto',
           overflow: 'auto',
        }}>

     
            {regiments.map((regiment) => (

                <Grid container spacing={'5%'}>

                    {regiment.companies.map((company) => (
                        <Grid xs={12} sm={12} lg={6} xl={3}>
                           

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

        </Box>
    )
}

export default CompanySelectorPage;