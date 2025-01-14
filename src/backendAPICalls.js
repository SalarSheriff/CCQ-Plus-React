import dayjs from "dayjs";

//instance and accounts have to be passed as parameters and cannot be used here because they are react hooks

//How often data is called from the backend
let dataFetchRate = import.meta.env.VITE_DATA_FETCH_RATE

let apiEndpoint =   import.meta.env.VITE_API_ENDPOINT// 'http://localhost:4000/api/' //container instance ip:port

//Data used to generate backenddata
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
          }, 
          {
              id: 8,
              name: 'H1',
              mascot: "Hogs",
              slogan: "H1 SLOGAN!"
          }, 
          {
              id: 9,
              name: 'I1',
              mascot: "Iron Horses",
              slogan: "Rum Em Down!"
          }
      ]
  },
  {
      id: 2,
      name: '2nd Regiment',
      motto: 'Second to None',
      companies: [
          {
              id: 1,
              name: 'A2',
              mascot: "Spartans",
              slogan: "A2 SLOGAN!"
          },
          {
              id: 2,
              name: 'B2',
              mascot: "Bulldogs",
              slogan: "B2 SLOGAN!"
          },
          {
              id: 3,
              name: 'C2',
              mascot: "Circus",
              slogan: "C2 SLOGAN!"
          },
          {
              id: 4,
              name: 'D2',
              mascot: "Dragons",
              slogan: "D2 SLOGAN!"
          },
          {
              id: 5,
              name: 'E2',
              mascot: "Brewdawgz",
              slogan: "E2 SLOGAN!"
          },
          {
              id: 6,
              name: 'F2',
              mascot: "Zoo",
              slogan: "F2 SLOGAN!"
          },
          {
              id: 7,
              name: 'G2',
              mascot: "Gators",
              slogan: "G2 SLOGAN!"
          }, 
          {
              id: 8,
              name: 'H2',
              mascot: "Happy",
              slogan: "H2 SLOGAN!"
          }, 
          {
              id: 9,
              name: 'I2',
              mascot: "Moose",
              slogan: "I2 SLOGAN!"
          }
      ]
  },
  {
      id: 3,
      name: '3rd Regiment',
      motto: 'Tried and True',
      companies: [
          {
              id: 1,
              name: 'A3',
              mascot: "Anacondas",
              slogan: "A3 SLOGAN!"
          },
          {
              id: 2,
              name: 'B3',
              mascot: "Bandits",
              slogan: "B3 SLOGAN!"
          },
          {
              id: 3,
              name: 'C3',
              mascot: "Coyotes",
              slogan: "C3 SLOGAN!"
          },
          {
              id: 4,
              name: 'D3',
              mascot: "Dinos",
              slogan: "D3 SLOGAN!"
          },
          {
              id: 5,
              name: 'E3',
              mascot: "Eagles",
              slogan: "E3 SLOGAN!"
          },
          {
              id: 6,
              name: 'F3',
              mascot: "Troop",
              slogan: "F3 SLOGAN!"
          },
          {
              id: 7,
              name: 'G3',
              mascot: "Gophers",
              slogan: "G3 SLOGAN!"
          }, 
          {
              id: 8,
              name: 'H3',
              mascot: "Hurricanes",
              slogan: "H3 SLOGAN!"
          }, 
          {
              id: 9,
              name: 'I3',
              mascot: "Icemen",
              slogan: "I3 SLOGAN!"
          }
      ]
  },
  {
      id: 4,
      name: '4th Regiment',
      motto: 'Fourth and Fierce',
      companies: [
          {
              id: 1,
              name: 'A4',
              mascot: "Apaches",
              slogan: "A4 SLOGAN!"
          },
          {
              id: 2,
              name: 'B4',
              mascot: "Buffaloes",
              slogan: "B4 SLOGAN!"
          },
          {
              id: 3,
              name: 'C4',
              mascot: "Cowboys",
              slogan: "C4 SLOGAN!"
          },
          {
              id: 4,
              name: 'D4',
              mascot: "Dukes",
              slogan: "D4 SLOGAN!"
          },
          {
              id: 5,
              name: 'E4',
              mascot: "Elephants",
              slogan: "E4 SLOGAN!"
          },
          {
              id: 6,
              name: 'F4',
              mascot: "Frogs",
              slogan: "F4 SLOGAN!"
          },
          {
              id: 7,
              name: 'G4',
              mascot: "Guppies",
              slogan: "G4 SLOGAN!"
          }, 
          {
              id: 8,
              name: 'H4',
              mascot: "Hogs",
              slogan: "H4 SLOGAN!"
          }, 
          {
              id: 9,
              name: 'I4',
              mascot: "I-Beams",
              slogan: "I4 SLOGAN!"
          }
      ]
  }
]



async function wakeUpServer() {
  try {
    const response = await fetch(apiEndpoint.replace("api/", ""));
    console.log("Server is awake");
    return response;  // Return the response if needed
  } catch (error) {
    console.error("Server is not awake", error);
    return error;  // Return the error
  }
}




//Base function to send authentication to server
async function callNode(instance, accounts) {

    
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    //console.log(response.accessToken)

    const nodeCall = await fetch( apiEndpoint + 'protected', {
      headers: {
        'Authorization': `${response.accessToken}`
      }
    });

  }
 
  // Gets the latest logs for each company so that the company selector can display the latest log for each company
async function getLastLogForEachCompany() {
  console.log("Getting last log for each company");

  console.log(apiEndpoint + "getLastLogForEachCompany")
  try {
   
    const nodeCall = await fetch(apiEndpoint + 'getLastLogForEachCompany', {
      headers: {
        
      }
    });

    // Check if the response status is 401 (Unauthorized)
    if (nodeCall.status === 401) {
      // Redirect to /unauthorizeduser if not authorized
      window.location.href = '/unauthorizeduser';
      return;
    }

    // If not unauthorized, parse the response
    const data = await nodeCall.json();
    return data;

  } catch (error) {
    console.error("Error getting the last log for each company:", error);
    // Handle other errors as needed
    throw error;
  }
}

async function uploadLogOld(instance, accounts, action, company) {

  console.log("Uploading log")
  const request = {
    scopes: ["User.Read"],
    account: accounts[0]
  };
  const response = await instance.acquireTokenSilent(request);

  const nodeCall = await fetch(apiEndpoint+'uploadLog', {
    method: 'POST',
    headers: {
      'Authorization': `${response.accessToken}`,
      'Content-Type': 'application/json'
    },

    //Date stuff is done on the backend
    body: JSON.stringify({
      company: company,
      message: "User " + accounts[0].username + " " + action +  " the CCQ",
      name: accounts[0].name, //This will be verified through token, but use this for now when tokens aren't being used
      action: action

    })
  });




}

async function uploadLog(username, email, action, company) {

    console.log("Uploading log")
    
    const nodeCall = await fetch(apiEndpoint+'uploadLog', {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json'
      },

      //Date stuff is done on the backend
      body: JSON.stringify({
        company: company,
        message: "User " + username + " " + action +  " the CCQ",
        name: username, //This will be verified through token, but use this for now when tokens aren't being used
        action: action

      })
    });




  }

  async function uploadPresencePatrol(username,email, action, company, patrolTime, patrolComments) {

   
    const nodeCall = await fetch(apiEndpoint + 'uploadPresencePatrol', {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json'
      },

      //Date stuff is done on the backend
      body: JSON.stringify({
        company: company,
        message: "User " + username + " inspected the AO. Comments: " + patrolComments,
        name: username, //This will be verified through token, but use this for now when tokens aren't being used
        action: action,
        patrolTime: patrolTime,
        

      })
    });




  }



  async function uploadSpecialMessage(username, email, action, company, specialMessageComments) {
console.log("Uploading Special Message")
    
    
    const nodeCall = await fetch(apiEndpoint + 'uploadLog', {
      method: 'POST',
      headers: {
       
        'Content-Type': 'application/json'
      },

      //Date stuff is done on the backend
      body: JSON.stringify({
        company: company,
        message: specialMessageComments,
        name: username, //This will be verified through token, but use this for now when tokens aren't being used
        action: "special message",
        specialMessageComments: specialMessageComments

      })
    });

  }
  async function getLogs(instance, accounts, company) {

      
      const request = {
        scopes: ["User.Read"],
        account: accounts[0]
      };
      const response = await instance.acquireTokenSilent(request);
  
      const nodeCall = await fetch(apiEndpoint + 'getLogs/'+company, {
        headers: {
          "Authorization": `${response.accessToken}`// Bearer prefix is added server side
        }
      });
  
      const data = await nodeCall.json();
      return data;
  }

 
async function getLogsInRange(company, date1, date2) {

  console.log(`Getting logs in range: ${date1}-${date2} from Company: ${company}`);
    
      const nodeCall = await fetch(apiEndpoint + 'getLogsInRange/'+company+'/'+date1+'/'+date2, {
        
      });
  
      const data = await nodeCall.json().catch((error) => { console.log(error)});
      return data;
}
async function validateAdmin(username, email) {

      
     
      const nodeCall = await fetch(apiEndpoint + 'validateAdmin', {
        headers: {
         
          "email": email
        }
      });
  
      const data = await nodeCall.json();
      return data.isAdmin;
  
    
}


//IDK Why the parameters in this order work?
async function fetchImages(date, company) {
  console.log("Fetching Images from server")
  try {
      // Corrected the order of company and date in the URL
      const response = await fetch(apiEndpoint + "images/" + date + "/" + company);
      console.log(apiEndpoint + "images/" + date + "/" + company);

      if (response.ok) {
          const data = await response.json();
          return data
          console.log('Fetched images:', data);
      } else {
          console.error('Failed to fetch images');
      }
  } catch (error) {
      console.error('Error fetching images:', error);
  }
};
async function getImageInspectionComments(company, date) {

  console.log("Getting Image Inspection Comments")
  

  const nodeCall = await fetch(apiEndpoint + 'getImageInspectionComments/'+company+'/'+date, {
    
  });

  const data = await nodeCall.json();
  return data;

}

async function uploadImageInspectionComments(instance, accounts, company, comment) {

  const request = {
    scopes: ["User.Read"],
    account: accounts[0]
  };
  const response = await instance.acquireTokenSilent(request);

  const nodeCall = await fetch(apiEndpoint + 'uploadImageInspectionComments', {
    method: 'POST',
    headers: {
      'Authorization': `${response.accessToken}`,
      'Content-Type': 'application/json'
    },

    //Date stuff is done on the backend
    body: JSON.stringify({
      company: company,
      comment: comment,
      cadet_name: accounts[0].name, //This will be verified through token, but use this for now when tokens aren't being used
     


    })
  });
}



  export { callNode, uploadLog, getLogs, getLastLogForEachCompany, uploadPresencePatrol, getLogsInRange, uploadSpecialMessage, validateAdmin, fetchImages, wakeUpServer, getImageInspectionComments, uploadImageInspectionComments, regiments, dataFetchRate, apiEndpoint };
