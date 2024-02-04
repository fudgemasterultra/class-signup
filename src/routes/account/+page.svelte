<script lang="ts">
  import Auth from '$lib/authwraper/Auth.svelte';
  import AddPerson from '$lib/pannel/AddPerson.svelte';
  import { auth } from '$lib/firebase/firebase.app';
  $: uid = '';
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      uid = user.uid;
    }
  });
  const parrent = 'parent';
  const child = 'child';
</script>

<Auth>
  <AddPerson personType={parrent} {uid} />
  <AddPerson personType={child} {uid} />
</Auth>
