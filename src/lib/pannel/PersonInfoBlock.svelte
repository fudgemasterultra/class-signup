<script lang="ts">
  import type { Types } from '$lib/types/types';
  export let personDoc: Types.PersonsDoc;
  let isChild = 'grade' in personDoc.doc;
  let parent: Types.Parent | undefined;
  let child: Types.Child | undefined;
  if (isChild) {
    child = personDoc.doc as Types.Child;
  } else {
    parent = personDoc.doc as Types.Parent;
  }
</script>

<div
  class="border-2 border-blue-700 rounded-lg bg-gray-50 hover:bg-gray-200 w-full ease-in-out transition-all py-3 my-3"
>
  Test
</div>
