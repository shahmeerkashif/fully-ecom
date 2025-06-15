import { useContext } from "react";
import myContext from "../../context/myContext";
import { Trash2 } from 'lucide-react';

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser, deleteUser } = context;

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user? This action cannot be undone.");
        
        if (confirmDelete) {
            try {
                await deleteUser(userId);
                // Optional: Show success message
                alert("User deleted successfully!");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user. Please try again.");
            }
        }
    };

    return (
        <div>
            <div>
                <div className="py-5 flex justify-between items-center">
                    {/* text  */}
                    <h1 className=" text-xl text-pink-300 font-bold">All User</h1>
                </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                        <tbody>
                            <tr>
                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Email
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Uid
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                   Role
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Date
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Action
                                </th>

                            </tr>
                            {
                                getAllUser.map((value, index) => {
                                    return (
                                        <tr key={index} className="text-pink-300">
                                            <td
                                                className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                                {index + 1}
                                            </td>

                                            <td
                                                className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                {value.name}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                                {value.email}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500  cursor-pointer ">
                                                {value.uid}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500  cursor-pointer ">
                                                {value.role}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                                {value.date}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                                <button
                                                    onClick={() => handleDeleteUser(value.uid)}
                                                    className="flex items-center justify-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;