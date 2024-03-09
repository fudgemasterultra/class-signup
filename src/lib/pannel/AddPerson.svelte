<script lang="ts">
  import PersonInfoBlock from './PersonInfoBlock.svelte';
  import { db } from '$lib/firebase/firebase.app';
  import type { Types } from '$lib/types/types';
  import {
    collection,
    getDoc,
    getDocs,
    where,
    query,
    Timestamp,
    addDoc,
    doc,
  } from 'firebase/firestore';
  import { onMount } from 'svelte';
  import { grabPersons } from '$lib/frontend-code/helpers';
  import { gradeLevels } from '$lib/frontend-code/helpers';

  export let uid: string;
  export let personType: string;
  let dateString = '';
  let personsInfo: Array<Types.PersonsDoc> = [];
  let child: undefined | Types.Child;
  let parent: undefined | Types.Parent;
  let newPerson: Types.Child | Types.Parent;
  let saving = true;
  const resetPerson = () => {
    if (personType === 'child') {
      newPerson = {
        userID: uid,
        fName: '',
        lName: '',
        birthData: Timestamp.now(),
        pronouns: '',
        grade: 'Pre-K/Nursery',
        allergies: '',
        learningDisabled: '',
        calmChild: '',
        teachKnowDisable: false,
        extraInfo: '',
      } as Types.Child;
      dateString = newPerson.birthData.toDate().toISOString().substring(0, 10);
      child = newPerson;
    } else {
      newPerson = {
        userID: uid,
        fName: '',
        lName: '',
        phone: '',
        textAlerts: false,
      } as Types.Parent;
      parent = newPerson;
    }
  };
  resetPerson();

  const refreshData = async () => {
    let persons = await grabPersons(uid, personType);
    if (persons === undefined) {
      return;
    }
    personsInfo = [...persons];
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

  const saveData = async () => {
    if (child !== undefined) {
      await addDoc(collection(db, 'child'), child);
      await refreshData();
      resetPerson();
    }
  };
</script>

<div>
  <h1 class=" text-2xl font-bold text-center">
    {personType === 'child' ? 'Children' : 'Parent & Gaurdians'}
  </h1>
  <div class="flex flex-wrap justify-center">
    {#each personsInfo as person, index}
      <PersonInfoBlock {refreshData} personDoc={person} key={index} />
    {/each}
    <div
      class="border-2 border-blue-700 rounded-lg bg-gray-50 hover:bg-gray-200 w-[300px] ease-in-out transition-all py-3 my-3"
    >
      {#if child !== undefined}
        <div class="flex flex-wrap py-4 px-2 gap-2">
          <input
            type="text"
            class=" border-b-2 border-black bg-transparent"
            placeholder="First Name"
            bind:value={child.fName}
            on:change={() => (saving = false)}
          />
          <input
            type="text"
            class=" border-b-2 border-black bg-transparent"
            placeholder="Last Name"
            bind:value={child.lName}
            on:change={() => (saving = false)}
          />
          <input
            type="text"
            class=" border-b-2 border-black bg-transparent"
            placeholder="Pronouns"
            bind:value={child.pronouns}
            on:change={() => (saving = false)}
          />
          <div>
            <p>Birthday:</p>
            <input
              type="date"
              class=" border-b-2 border-black bg-transparent"
              bind:value={dateString}
              on:change={() => (saving = false)}
            />
          </div>
          <div>
            <p>Grade:</p>
            <select
              class="bg-transparent"
              bind:value={child.grade}
              on:change={() => (saving = false)}
            >
              {#each gradeLevels as grade}
                <option value={grade}>{grade}</option>
              {/each}
            </select>
          </div>
          <div class="flex content-center justify-center">
            <lable>
              <input
                type="checkbox"
                bind:checked={child.bathroomBySelf}
                on:change={() => (saving = false)}
              />
              Can use bathroom byself.
            </lable>
          </div>
          <div>
            <p>Allergies list</p>
            <textarea
              rows="4"
              bind:value={child.allergies}
              on:change={() => (saving = false)}
              class="resize-y"
            />
          </div>
          <div>
            <p>Learning disabilities</p>
            <textarea
              rows="4"
              bind:value={child.learningDisabled}
              on:change={() => (saving = false)}
              class="resize-y"
            />
          </div>
          <div>
            <input
              type="checkbox"
              bind:checked={child.teachKnowDisable}
              on:change={() => (saving = false)}
            />
            Should teacher know about disabilities?
          </div>
          <div>
            <p>Extra info</p>
            <textarea
              rows="4"
              bind:value={child.extraInfo}
              on:change={() => (saving = false)}
              class="resize-y"
            />
          </div>

          <button
            class={`w-full ${saving ? 'bg-gray-800' : 'bg-green-500'} rounded-lg py-1 font-bold text-white`}
            on:click={saveData}
            disabled={saving}>Save</button
          >
        </div>
      {/if}
    </div>
  </div>
</div>
