import CompanyDisplayPaper from "./CompanyDisplayPaper";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2



function CompanySelectorPage() {
    

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
                },{
                    id: 8,
                    name: 'H1',
                    mascot: "Hogs",
                    slogan: "H1 SLOGAN!"
                },{
                    id: 9,
                    name: 'I1',
                    mascot: "Iron Horses",
                    slogan: "Rum Em Down!"
                }
            ]
        }
    ]


    return(

        <>
    <Grid container spacing={'5%'}>


<Grid xs={4}> 

<CompanyDisplayPaper company={"I1"} mascot={"Ironhorses"}/>
</Grid>
<Grid xs={4}> 

<CompanyDisplayPaper company={"I1"} mascot={"Ironhorses"}/>
</Grid>
        </Grid>
            
        </>
    )
}

export default CompanySelectorPage;