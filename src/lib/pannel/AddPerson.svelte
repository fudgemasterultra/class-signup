<script lang="ts">
  import { db } from '$lib/firebase/firebase.app';
  import type { Types } from '$lib/types/types';
  import { collection, getDoc, getDocs, where, query } from 'firebase/firestore';
  import { onMount } from 'svelte';

  export let uid: string | null | undefined;
  export let personType: string;
  const personsInfo: Array<Types.Child | Types.Parent> = [];
  onMount(async () => {
    if (uid === '') {
      return;
    }
    const persons = collection(db, personType);
    const q = query(persons, where('userID', '==', uid));
    const documents = await getDocs(q);
    documents.forEach((doc) => {
      const person = doc.data() as Types.Parent | Types.Child;
    });
  });
</script>

<div></div>
