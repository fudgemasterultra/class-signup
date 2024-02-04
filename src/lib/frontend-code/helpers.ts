  import { db } from '$lib/firebase/firebase.app';
  import { collection, getDoc, getDocs, where, query } from 'firebase/firestore';
  import type { Types } from '$lib/types/types';

export const  grabPersons = async (uid: string, personType: string): Promise<Array<Types.PersonsDoc> | undefined> => {
      let personsInfo: Array<Types.PersonsDoc> = [];
    if (uid === '') {
      return;
    }
    const persons = collection(db, personType);
    const q = query(persons, where('userID', '==', uid));
    const documents = await getDocs(q);
    documents.forEach((doc) => {
      const id = doc.id
      const person = doc.data() as Types.Parent | Types.Child;
      personsInfo.push({
        docID: id,
        doc: person
      });
    });
    return personsInfo;
}

export const emailCheck = (email: string) => {
      return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export const passwordStrong = (password: string) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}