// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  urlSquare: 'https://us-central1-yourdriver-7b0c9.cloudfunctions.net/api',
  production: false,
  firebase: {
    apiKey: "AIzaSyBcNHKBL4U1ByRAhX0308NUSqbufPk5dAk",
    authDomain: "yourdriver-7b0c9.firebaseapp.com",
    databaseURL: "https://yourdriver-7b0c9.firebaseio.com",
    projectId: "yourdriver-7b0c9",
    storageBucket: "yourdriver-7b0c9.appspot.com",
    messagingSenderId: "102584529407",
    appId: "1:102584529407:web:168e10b9c5b85c6cc877ca",
    measurementId: "G-DVNQEM607W"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
