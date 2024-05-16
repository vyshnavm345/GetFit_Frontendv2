// src/components/TopProgramsTable.js

import { getPopularPrograms } from "features/program";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopProgramsTable = () =>{
    const {popularPrograms} = useSelector(state=>state.program)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(popularPrograms.length < 1){
            dispatch(getPopularPrograms());
        }
    }, [])
 return (
   <div className="bg-white shadow-2xl rounded-lg p-6">
     <h2 className="text-2xl font-bold mb-4">Top Programs</h2>
     <table className="min-w-full leading-normal">
       <thead>
         <tr>
           <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             Program
           </th>
           <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             Users
           </th>
           <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             Trainer
           </th>
           <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             Revenue
           </th>
           {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Conversion
          </th> */}
         </tr>
       </thead>
       <tbody>
         {popularPrograms.map((program) => (
           <tr key={program.name}>
             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
               {program.name}
             </td>
             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
               {program.followers}
             </td>
             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
               {program.trainer}
             </td>
             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
               {program.sales}
             </td>
             {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {program.conversion}
            </td> */}
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );
}

export default TopProgramsTable;
