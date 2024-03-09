<script lang="ts">
  import type { Types } from '$lib/types/types';
  import { Timestamp } from 'firebase/firestore';
  import { gradeLevels } from '$lib/frontend-code/helpers';
  import { setDoc, doc, deleteDoc } from 'firebase/firestore';
  import { db } from '$lib/firebase/firebase.app';
  export let key: number;
  export let personDoc: Types.PersonsDoc;
  export let refreshData: () => Promise<void>;

  let isChild = 'grade' in personDoc.doc;
  let parent: Types.Parent | undefined;
  let child: Types.Child | undefined;
  let dateString = '';
  let saving = true;
  if (isChild) {
    child = personDoc.doc as Types.Child;
    dateString = child.birthData.toDate().toISOString().substring(0, 10);
  } else {
    parent = personDoc.doc as Types.Parent;
  }

  const saveData = async () => {
    saving = true;
    if (isChild) {
      child = personDoc.doc as Types.Child;
      let toTimestampNumber = () => Date.parse(dateString);
      let timeStamp = Timestamp.fromMillis(toTimestampNumber());
      child!.birthData = timeStamp;
      await setDoc(doc(db, 'child/' + personDoc.docID), personDoc.doc);
      alert('Saved!');
    } else {
      parent = personDoc.doc as Types.Parent;
      await setDoc(doc(db, 'parent/' + personDoc.docID), parent);
    }
  };
  const deletePerson = async () => {
    if (confirm('Are you sure you want to delete this?')) {
      await deleteDoc(doc(db, `${isChild ? 'child' : 'parent'}`, personDoc.docID));
      await refreshData();
    } else {
      return;
    }
  };
</script>

<div class="flex flex-wrap px-5">
  <div
    class="border-2 border-blue-700 rounded-lg bg-gray-100 hover:bg-gray-200 w-[300px] ease-in-out transition-all py-3 my-3"
  >
    {#if child != undefined}
      <div class="flex flex-wrap py-4 px-2 gap-2">
        <input
          type="text"
          class=" border-b-2 border-black bg-transparent"
          bind:value={child.fName}
          on:change={() => (saving = false)}
        />
        <input
          type="text"
          class=" border-b-2 border-black bg-transparent"
          bind:value={child.lName}
          on:change={() => (saving = false)}
        />
        <input
          type="text"
          class=" border-b-2 border-black bg-transparent"
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
        <button
          class={`w-full bg-red-500 rounded-lg py-1 font-bold text-white`}
          on:click={deletePerson}>Delete</button
        >
      </div>
    {/if}
    {#if parent != undefined}
      <div class="flex flex-wrap py-4 px-2 gap-2">
        <input
          type="text"
          class="border-b-2 border-black bg-transparent"
          bind:value={parent.fName}
          on:change={() => (saving = false)}
        />
        <input
          type="text"
          class="border-b-2 border-black bg-transparent"
          bind:value={parent.lName}
          on:change={() => (saving = false)}
        />
        <input
          type="text"
          class="border-b-2 border-black bg-transparent"
          bind:value={parent.phone}
          on:change={() => (saving = false)}
        />
        <div>
          <input
            type="checkbox"
            class="border-b-2 border-black bg-transparent"
            bind:checked={parent.textAlerts}
            on:change={() => (saving = false)}
          />
          Text Alerts
        </div>
        <button
          class={`w-full ${saving ? 'bg-gray-800' : 'bg-green-500'} rounded-lg py-1 font-bold text-white`}
          on:click={saveData}
          disabled={saving}>Save</button
        >
        <button
          class={`w-full bg-red-500 rounded-lg py-1 font-bold text-white`}
          on:click={deletePerson}>Delete</button
        >
      </div>
    {/if}
  </div>
</div>
