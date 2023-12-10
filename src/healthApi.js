// healthApi.js
import axios from 'axios';


// Modify this part according to the actual structure of the API response
const fetchHealthIssues = async () => {
   try {
       const url = 'https://api.nhs.uk/conditions/?page=1';
       const response = await axios.get(url, {
           headers: {
               'subscription-key': '   9e584ac0226e4a7f82d95061cfe07f76'
           }
       });


       // Hypothetical adjustment: Change the path according to the actual response
       if (response.data && response.data.actualHealthIssuesField) {
           const healthIssues = response.data.actualHealthIssuesField.map(issue => ({
               value: issue.id, // Adjust these keys according to the actual data structure
               label: issue.name
           }));
           return healthIssues;
       } else {
           console.log('No data found');
           return [];
       }
   } catch (error) {
       console.error("Error fetching health issues:", error);
       return [];
   }
};




export { fetchHealthIssues };


