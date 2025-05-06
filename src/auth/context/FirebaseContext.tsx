import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { CONFIG } from 'src/config-global';

const firebaseApp = initializeApp(CONFIG.firebase);

export const DB = getFirestore(firebaseApp);
