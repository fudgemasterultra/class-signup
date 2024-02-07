<script lang="ts">
  import type { Types } from '$lib/types/types';
  import { Timestamp } from 'firebase/firestore';
  import { gradeLevels } from '$lib/frontend-code/helpers';
  export let personDoc: Types.PersonsDoc;
  export let refreshData: () => Promise<void>;
  let isChild = 'grade' in personDoc.doc;
  let parent: Types.Parent | undefined;
  let child: Types.Child | undefined;
  let dateString = '';
  if (isChild) {
    child = personDoc.doc as Types.Child;
    console.log(child);
  } else {
    parent = personDoc.doc as Types.Parent;
  }
</script>

<div
  class="border-2 border-blue-700 rounded-lg bg-gray-50 hover:bg-gray-200 w-full ease-in-out transition-all py-3 my-3"
>
  {#if child != undefined}
    <div class="flex flex-wrap py-4 px-2 gap-2">
      <input type="text" class=" border-b-2 border-black bg-transparent" bind:value={child.fName} />
      <input type="text" class=" border-b-2 border-black bg-transparent" bind:value={child.lName} />
      <input
        type="text"
        class=" border-b-2 border-black bg-transparent"
        bind:value={child.pronouns}
      />
      <input type="date" class=" border-b-2 border-black bg-transparent" bind:value={dateString} />
      <div>
        <p>Grade:</p>
        <select class="bg-transparent" bind:value={child.grade}>
          {#each gradeLevels as grade}
            <option value={grade}>{grade}</option>
          {/each}
        </select>
      </div>
      <div class="flex">
        <input type="checkbox" bind:value={child.bathroomBySelf} />
        <p>Can use bathroom alone</p>
      </div>
    </div>
  {/if}
</div>
