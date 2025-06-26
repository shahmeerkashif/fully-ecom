const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteUserByUid = functions.https.onCall(async (data, context) => {
    // Verify the user is authenticated and has admin privileges
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated', 
            'You must be logged in to perform this action'
        );
    }

    // Optional: Check for admin role if you have role-based access
    // const userDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    // if (!userDoc.exists || userDoc.data().role !== 'admin') {
    //     throw new functions.https.HttpsError(
    //         'permission-denied', 
    //         'Only admins can delete users'
    //     );
    // }

    const uid = data.uid;
    if (!uid) {
        throw new functions.https.HttpsError(
            'invalid-argument', 
            'User ID is required'
        );
    }

    try {
        // Delete user from Authentication
        await admin.auth().deleteUser(uid);
        
        // Delete user document from Firestore
        await admin.firestore().collection('users').doc(uid).delete();
        
        // Optional: Delete any related data in other collections
        // Example: await admin.firestore().collection('posts').where('userId', '==', uid).get();
        
        return { 
            success: true,
            message: `User ${uid} deleted successfully`,
            uid: uid
        };
    } catch (error) {
        console.error('Error deleting user:', error);
        
        // Handle specific errors
        if (error.code === 'auth/user-not-found') {
            throw new functions.https.HttpsError(
                'not-found',
                'User not found in authentication system'
            );
        }
        
        throw new functions.https.HttpsError(
            'internal', 
            error.message || 'Failed to delete user'
        );
    }
});