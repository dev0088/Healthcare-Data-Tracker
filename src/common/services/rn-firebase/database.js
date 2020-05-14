import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import firebaseConfig from '~/common/config/firebase';

const USER_TABLE_NAME = 'users';
const MEASUERS_TABLE_NAME = 'measures';
const HEART_RATE_TABLE_NAME = `${MEASUERS_TABLE_NAME}/HeartRates`;
const BLOOD_PRESSURE_TABLE_NAME = `${MEASUERS_TABLE_NAME}/BloodPressures`;

export async function onlineDatabase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.ios);
  }
  firebase.database().setPersistenceEnabled(false);
  await firebase.database().goOnline();
}

export async function createAccount({credential, signupInfo}) {
  const { firstName, lastName, email, birthday } = signupInfo;
  const user = credential.user._user;
  const { uid } = user;
  if (uid) {
    var userData = {
      uid,
      actived: true,
      signedUp: firebase.database.ServerValue.TIMESTAMP,
      lastLoggedIn: firebase.database.ServerValue.TIMESTAMP,
      isSocialUser: false,
      firstName,
      lastName,
      birthday: birthday || '',
      ...user
    };
    try {
      return firebase.database().ref(`${USER_TABLE_NAME}/${uid}`)
        .set(userData).then(() => {
          return userData;
        });
    } catch (e) {
      console.log('==== error: ', e)
      return null
    }
  }
  return null;
}

export async function createSocialAccount(credential) {
  const user = credential.user._user;
  const { uid } = user;
  if (uid) {
    var userData = {
      uid,
      actived: true,
      signedUp: firebase.database.ServerValue.TIMESTAMP,
      lastLoggedIn: firebase.database.ServerValue.TIMESTAMP,
      isSocialUser: true,
      birthday: user.providerData[0].birthday || '',
      ...user
    };
    try {
      return firebase.database()
        .ref(`${USER_TABLE_NAME}/${uid}`)
        .set(userData).then(() => {
          return userData;
        });
    } catch (e) {
      console.log('==== createSocialAccount: error: ', e);
      return null;
    }
  }
  return null;
}

export function getUserInfo(uid) {
  return firebase.database()
    .ref(`users/${uid}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.val();
      else return null;
    }
  );
}

export function getCurrentUserInfo() {
  const uid = firebase.auth().currentUser.uid;
  return getUserInfo(uid)
}

export async function findUserByEmail(email) {
  var items = [];
  firebase.database()
    .ref(`users`)
    .orderByChild("email")
    .startAt(email)
    .endAt(email)
    .on('value', (snap) => {
      items = [];
      snap.forEach((child) => {
        items.push(child);
      });
      console.log('==== items: ', items);
      return items;
    });
  return items;
}

export function getAllHeartRates() {
  const uid = firebase.auth().currentUser.uid;
  if (uid) {
    return firebase.database().ref(`${HEART_RATE_TABLE_NAME}/${uid}`)
      .once('value')
      .then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.val()
      } else {
        throw new Error('HR table does not exist')
      }
    });
  }
  return null
}

export async function addHeartRate(heartRate) {
  const uid = firebase.auth().currentUser.uid;
  if (uid) {
    try {
      return firebase.database().ref(`${HEART_RATE_TABLE_NAME}/${uid}`)
        .push(heartRate).then(() => {
          return heartRate;
        });
    } catch (e) {
      console.log('==== error: ', e)
      return null
    }
  }
  return null;
}

export function getAllBloodPressures() {
  const uid = firebase.auth().currentUser.uid;
  if (uid) {
    return firebase.database().ref(`${BLOOD_PRESSURE_TABLE_NAME}/${uid}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.val()
      } else {
        throw new Error('HR table does not exist')
      }
    });
  }
  return null;
}

export async function addBloodPressure(bloodPressure) {
  const uid = firebase.auth().currentUser.uid;
  if (uid) {
    try {
      return firebase.database().ref(`${BLOOD_PRESSURE_TABLE_NAME}/${uid}`)
        .push(bloodPressure).then(() => {
          return bloodPressure;
        });
    } catch (e) {
      console.log('==== error: ', e)
      return null
    }
  }
  return null;
}
