import { Container, Box } from "@mui/material";
import CompanyDisplayPaper from "./CompanyDisplayPaper";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import React, { useEffect, useState } from 'react';

function CompanySelectorPage({getLastLogForEachCompany}) {

//The latest logs for each company
    const [lastLogs, setLastLogs] = useState([]);


   

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


    


    useEffect(() => { 


        //Async functions must be defined in useEffect
        const fetchLastLogs = async () => { 


            const logs = await getLastLogForEachCompany();
            console.log(logs)
            setLastLogs(logs);
           console.log( logs.find(log=>log.company==="I1"))
        }

        fetchLastLogs();
        
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

                            {lastLogs.length > 0 && lastLogs.find(log=>log.company===company.name) ? <CompanyDisplayPaper company={company.name} mascot={company.mascot} buttonText={getButtonDisplayText(lastLogs.find(log=>log.company===company.name))} /> :<CompanyDisplayPaper company={company.name} mascot={company.mascot} buttonText="Sign In" /> }
               
                            
                            
                        </Grid>
                    ))}

                    
                </Grid>

            ))}
        </Box>
    )
}

export default CompanySelectorPage;