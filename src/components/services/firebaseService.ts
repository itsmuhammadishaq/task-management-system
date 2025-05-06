/* eslint-disable class-methods-use-this */

import { getDocs, collection } from 'firebase/firestore';

import { DB } from 'src/auth/context/FirebaseContext';

class FirebaseService {
  async getData() {
    // const url = 'http://localhost:3000/tasks';
    // const response = await fetch(url, { method: 'GET' });
    // const data = await response.json();
    // return data;
    const querysnapshot = await getDocs(collection(DB, 'tasks'));

    const data = querysnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) || [];

    return data;
  }
}
export default FirebaseService;
