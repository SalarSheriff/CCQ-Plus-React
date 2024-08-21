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
              mascot: "Archers",
              slogan: "A2 SLOGAN!"
          },
          {
              id: 2,
              name: 'B2',
              mascot: "Berserkers",
              slogan: "B2 SLOGAN!"
          },
          {
              id: 3,
              name: 'C2',
              mascot: "Crusaders",
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
              mascot: "Eagles",
              slogan: "E2 SLOGAN!"
          },
          {
              id: 6,
              name: 'F2',
              mascot: "Falcons",
              slogan: "F2 SLOGAN!"
          },
          {
              id: 7,
              name: 'G2',
              mascot: "Gladiators",
              slogan: "G2 SLOGAN!"
          }, 
          {
              id: 8,
              name: 'H2',
              mascot: "Hawks",
              slogan: "H2 SLOGAN!"
          }, 
          {
              id: 9,
              name: 'I2',
              mascot: "Invincibles",
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
              mascot: "Arrows",
              slogan: "A3 SLOGAN!"
          },
          {
              id: 2,
              name: 'B3',
              mascot: "Bulldogs",
              slogan: "B3 SLOGAN!"
          },
          {
              id: 3,
              name: 'C3',
              mascot: "Centaurs",
              slogan: "C3 SLOGAN!"
          },
          {
              id: 4,
              name: 'D3',
              mascot: "Demons",
              slogan: "D3 SLOGAN!"
          },
          {
              id: 5,
              name: 'E3',
              mascot: "Elks",
              slogan: "E3 SLOGAN!"
          },
          {
              id: 6,
              name: 'F3',
              mascot: "Foxes",
              slogan: "F3 SLOGAN!"
          },
          {
              id: 7,
              name: 'G3',
              mascot: "Griffins",
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
              mascot: "Inquisitors",
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
              mascot: "Aces",
              slogan: "A4 SLOGAN!"
          },
          {
              id: 2,
              name: 'B4',
              mascot: "Bison",
              slogan: "B4 SLOGAN!"
          },
          {
              id: 3,
              name: 'C4',
              mascot: "Cobras",
              slogan: "C4 SLOGAN!"
          },
          {
              id: 4,
              name: 'D4',
              mascot: "Defenders",
              slogan: "D4 SLOGAN!"
          },
          {
              id: 5,
              name: 'E4',
              mascot: "Erasers",
              slogan: "E4 SLOGAN!"
          },
          {
              id: 6,
              name: 'F4',
              mascot: "Furies",
              slogan: "F4 SLOGAN!"
          },
          {
              id: 7,
              name: 'G4',
              mascot: "Guardians",
              slogan: "G4 SLOGAN!"
          }, 
          {
              id: 8,
              name: 'H4',
              mascot: "Hellhounds",
              slogan: "H4 SLOGAN!"
          }, 
          {
              id: 9,
              name: 'I4',
              mascot: "Indestructibles",
              slogan: "I4 SLOGAN!"
          }
      ]
  }
]



async function wakeUpServer() {

  await fetch(apiEndpoint.replace("api/", "")).then(()=> {console.log("Server is awake")}).catch((error) => {console.log("Server is not awake")});
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
  //Gets the latest logs for each company so that the company selector can display the latest log for each company
  async function getLastLogForEachCompany(instance, accounts) {
    //Get the authentication token
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    const nodeCall = await fetch( apiEndpoint+'getLastLogForEachCompany', {
      headers: {
        "Authorization": `${response.accessToken}`// Bearer prefix is added server side
      }
    });

    const data = await nodeCall.json();
    return data;

  }


async function uploadLog(instance, accounts, action, company) {

    
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

  async function uploadPresencePatrol(instance, accounts, action, company, patrolTime, patrolComments) {

    
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    const nodeCall = await fetch(apiEndpoint + 'uploadPresencePatrol', {
      method: 'POST',
      headers: {
        'Authorization': `${response.accessToken}`,
        'Content-Type': 'application/json'
      },

      //Date stuff is done on the backend
      body: JSON.stringify({
        company: company,
        message: "User " + accounts[0].username + " inspected the AO. Comments: " + patrolComments,
        name: accounts[0].name, //This will be verified through token, but use this for now when tokens aren't being used
        action: action,
        patrolTime: patrolTime,
        

      })
    });




  }



  async function uploadSpecialMessage(instance, accounts, action, company, specialMessageComments) {

    
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    const nodeCall = await fetch(apiEndpoint + 'uploadLog', {
      method: 'POST',
      headers: {
        'Authorization': `${response.accessToken}`,
        'Content-Type': 'application/json'
      },

      //Date stuff is done on the backend
      body: JSON.stringify({
        company: company,
        message: specialMessageComments,
        name: accounts[0].name, //This will be verified through token, but use this for now when tokens aren't being used
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
async function getLogsInRange(instance, accounts, company, date1, date2) {

 
      const request = {
        scopes: ["User.Read"],
        account: accounts[0]
      };
      const response = await instance.acquireTokenSilent(request);
  
      const nodeCall = await fetch(apiEndpoint + 'getLogsInRange/'+company+'/'+date1+'/'+date2, {
        headers: {
          "Authorization": `${response.accessToken}`// Bearer prefix is added server side
        }
      });
  
      const data = await nodeCall.json().catch((error) => { console.log(error)});
      return data;
}
async function validateAdmin(instance, accounts) {

      
      const request = {
        scopes: ["User.Read"],
        account: accounts[0]
      };
      const response = await instance.acquireTokenSilent(request);
  
      const nodeCall = await fetch(apiEndpoint + 'validateAdmin', {
        headers: {
          "Authorization": `${response.accessToken}`// Bearer prefix is added server side
          ,"email": accounts[0].username
        }
      });
  
      const data = await nodeCall.json();
      return data;
  
    
}


//IDK Why the parameters in this order work?
async function fetchImages(date, company) {
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




  export { callNode, uploadLog, getLogs, getLastLogForEachCompany, uploadPresencePatrol, getLogsInRange, uploadSpecialMessage, validateAdmin, fetchImages, wakeUpServer, regiments, dataFetchRate, apiEndpoint };
