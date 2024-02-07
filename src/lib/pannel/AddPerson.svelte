<script lang="ts">
  import PersonInfoBlock from './PersonInfoBlock.svelte';
  import { db } from '$lib/firebase/firebase.app';
  import type { Types } from '$lib/types/types';
  import { collection, getDoc, getDocs, where, query } from 'firebase/firestore';
  import { onMount } from 'svelte';
  import { grabPersons } from '$lib/frontend-code/helpers';

  export let uid: string;
  export let personType: string;
  let personsInfo: Array<Types.PersonsDoc> = [];

  const refreshData = async () => {
    let persons = await grabPersons(uid, personType);
    if (persons === undefined) {
      return;
    }
    personsInfo = persons;
  };

  function pushPersons(person: Types.PersonsDoc) {
    personsInfo = [...personsInfo, person];
  }
  onMount(async () => {
    let persons = await grabPersons(uid, personType);
    if (persons === undefined) {
      return;
    }
    personsInfo = persons;
  });
</script>

<div>
  {#each personsInfo as person, index}
    <PersonInfoBlock {refreshData} personDoc={person} />
  {/each}
</div>
