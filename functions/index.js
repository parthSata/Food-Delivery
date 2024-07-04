const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.setCustomUserClaims = functions.https.onCall(async (data, context) => {
  // Ensure this endpoint is called by an admin only
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'This function must be called by an admin.'
    );
  }

  const uid = data.uid;
  const role = data.role;

  try {
    await admin.auth().setCustomUserClaims(uid, { role: role });
    return { message: `Success! ${uid} is now a ${role}.` };
  } catch (error) {
    console.error('Error setting custom user claims:', error);
    throw new functions.https.HttpsError('internal', 'Unable to set custom user claims.');
  }
});
