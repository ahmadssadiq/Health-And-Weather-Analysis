// src/components/HealthIssueSelector.js
import React from 'react';


const HealthIssueSelector = ({ id, onChange, value, options = [] }) => {
   // Check if options are available
   if (!options.length) {
       return <div>Loading health issues...</div>;
   }


   return (
       <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`health-category-${id}`}>
               Health Issue #{id}
           </label>
           <select
               onChange={(e) => onChange(id, e.target.value)}
               className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
               id={`health-category-${id}`}
               value={value}
           >
               <option value="">Please select...</option>
               {options.map((option, index) => (
                   <option key={index} value={option.value}>{option.label}</option>
               ))}
           </select>
       </div>
   );
};


export default HealthIssueSelector;


