<script lang="ts">
  import { doc, getDoc } from 'firebase/firestore';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/firebase/firebase.app';
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase/firebase.app';
  const canSeeAdmin = async (uid: string) => {
    try {
      await getDoc(doc(db, 'admin/' + uid));
      return true;
    } catch {
      return false;
    }
  };

  onMount(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user && (await canSeeAdmin(user.uid))) {
      } else {
        goto('/account');
      }
    });
  });
</script>
