const functions = require('firebase-functions');

const admin = require('firebase-admin')

const service = require('./hrdemo-b09ab-firebase-adminsdk-o7ziw-0656606d2f.json')

const databaseURL = "https://hrdemo-b09ab.firebaseio.com/"

const cors = require('cors')({origin: true})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp({
  credential: admin.credential.cert(service),
  databaseURL: "https://hrdemo-b09ab.firebaseio.com"
});

const database = admin.database()

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.send("Hello from Firebase!");
  })
});

exports.getData = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    let todosRef = database.ref('todos')
    todosRef.once('value', todos => {
      if(snap.val()) {
        console.log('snap', snap.val())
        response.status(200).send(snap.val())
      } else {
        response.status(200).send("oh no")
      }
    })
  }) 
})


