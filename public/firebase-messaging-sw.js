/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 **/
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 
firebase.initializeApp({
  messagingSenderId: "94888484309"
});

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  let title = '';
  let options = {
    data: payload.data
  };
  
  if (payload.data.type === 'MATCH') {
    title = 'Parsed $match'.replace('$match', payload.data.match_id),
    options.body = 'Check out your performance on OpenDota.';
    options.actions = [{action: "View Match", title: "View Match"}];
  }

  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  console.log(event);
  event.notification.close();
  
  // Allow the notification to open page even if the button isn't clicked
  if (event.action === 'View Match' || event.notification.data.type === 'MATCH') {
    event.waitUntil(
      clients.openWindow(`https://www.opendota.com/matches/${event.notification.data.match_id}` + "?notification=true")
    );
  }
})