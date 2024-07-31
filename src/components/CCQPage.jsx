import { useParams } from 'react-router-dom';
//The page that displays the actual CCQ view


function CCQPage() {


    const { companyName } = useParams();
    return(



        <>
         CCQ view page to be implemented
         You are on the {companyName} page
        
        </>
    )
}


export default CCQPage