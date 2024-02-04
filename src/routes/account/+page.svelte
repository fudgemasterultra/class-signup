<script lang="ts">
  import Auth from '$lib/authwraper/Auth.svelte';
  import AddPerson from '$lib/pannel/AddPerson.svelte';
  import { auth } from '$lib/firebase/firebase.app';
  import Background from '$lib/login/Background.svelte';
  $: uid = '';
  auth.onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
    }
  });
  const parrent = 'parent';
  const child = 'child';
</script>

<Auth>
  {#if uid !== ''}
    <AddPerson personType={parrent} {uid} />
    <AddPerson personType={child} {uid} />
  {/if}
</Auth>
