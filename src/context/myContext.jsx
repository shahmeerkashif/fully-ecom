import { createContext, useState, useEffect } from 'react';

const myContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [getAllUser, setGetAllUser] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch all users (you'll need to implement based on your backend)
    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            // Replace this with your actual API call or database query
            // Example for Firebase:
            // const usersCollection = collection(db, 'users');
            // const userSnapshot = await getDocs(usersCollection);
            // const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            // Example for REST API:
            // const response = await fetch('/api/users');
            // const userList = await response.json();
            
            // For now, using mock data - replace with your actual implementation
            const userList = [
                // Your existing users data
            ];
            
            setGetAllUser(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    // Delete user function
    const deleteUser = async (userId) => {
        if (!userId) {
            throw new Error("User ID is required");
        }
        
        try {
            setLoading(true);
            
            // Replace this with your actual delete implementation
            
            // Example for Firebase:
            // await deleteDoc(doc(db, "users", userId));
            
            // Example for REST API:
            // const response = await fetch(`/api/users/${userId}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
            // if (!response.ok) {
            //     throw new Error('Failed to delete user');
            // }
            
            // Update local state by removing the deleted user
            setGetAllUser(prevUsers => prevUsers.filter(user => user.uid !== userId));
            
            console.log("User deleted successfully");
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Add user function (if needed)
    const addUser = async (userData) => {
        try {
            setLoading(true);
            // Your add user implementation
            // After adding, refresh the user list
            await fetchAllUsers();
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Update user function (if needed)
    const updateUser = async (userId, userData) => {
        try {
            setLoading(true);
            // Your update user implementation
            // After updating, refresh the user list
            await fetchAllUsers();
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Fetch users when component mounts
    useEffect(() => {
        fetchAllUsers();
    }, []);

    const contextValue = {
        getAllUser,
        loading,
        deleteUser,
        addUser,
        updateUser,
        fetchAllUsers,
    };

    return (
        <myContext.Provider value={contextValue}>
            {children}
        </myContext.Provider>
    );
};

export default myContext;