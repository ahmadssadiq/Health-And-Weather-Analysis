// healthApi.js
import axios from 'axios';

const fetchHealthIssues = async () => {
   try {
       const url = 'https://api.nhs.uk/conditions/?page=1';
       const response = await axios.get(url, {
           headers: {
               'subscription-key': '   9e584ac0226e4a7f82d95061cfe07f76'
           }
       });

       if (response.data && response.data.actualHealthIssuesField) {
           const healthIssues = response.data.actualHealthIssuesField.map(issue => ({
               value: issue.id, 
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


