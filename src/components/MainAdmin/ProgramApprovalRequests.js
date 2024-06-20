import { changePublishStatus, getPublishRequests, publishprogram } from 'features/admin';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProgramApprovalRequests = () => {
    const dispatch = useDispatch();
    const {publishRequests} = useSelector(state=>state.admin)

    useEffect(()=>{
        dispatch(getPublishRequests());
    }, [])
    return (
      <div className="bg-white py-2 shadow-md rounded md:px-6 md:my-6 overflow-x-auto">
        <div className="bg-orange-500 font-bold text-white uppercase text-xl py-2 px-4 flex justify-between">
          Programms: Pending Approval
        </div>
        <div className="overflow-hidden border-t border-gray-200">
          <table className="w-full bg-transparent border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-3 px-2">Name</th>
                <th className="text-left py-3 px-2">Category</th>
                <th className="text-left py-3 px-2">Duration</th>
                {/* <th className="text-left py-3 px-2">Users</th> */}
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-4">Change</th>
              </tr>
            </thead>
            <tbody>
              {publishRequests?.map((programme) => (
                <tr
                  key={programme.id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="border-b border-gray-200 py-4 px-2">
                    {programme?.program_name}
                  </td>
                  <td className="border-b border-gray-200 py-4 px-2">
                    {programme?.category}
                  </td>
                  <td className="border-b border-gray-200 py-4 px-2">
                    <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>
                    {programme?.duration} Days
                  </td>
                  <td className="border-b border-gray-200 py-4 px-2">
                    <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>
                    Published
                  </td>
                  <td className="border-b border-gray-200 py-4 px-2">
                    <button
                      onClick={() => {
                          dispatch(publishprogram(programme?.id));
                      }}
                      className="text-white font-bold bg-yellow-500 hover:opacity-90 rounded shadow-lg px-4 py-1 border-black ml-2"
                    >
                      publish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default ProgramApprovalRequests
