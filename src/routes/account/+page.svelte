<script lang="ts">
  import Auth from '$lib/authwraper/Auth.svelte';
  import { auth } from '$lib/firebase/firebase.app';
  let uid: String | null;
  auth.onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
    }
  });
  const parrent = 'parrent';
  const child = 'child';
</script>

<Auth>
  <div>
    <p>Hello</p>
  </div>
</Auth>
