<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/firebase/firebase.app';
  import { onMount } from 'svelte';
  onMount(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        goto('/login');
      }
    });
  });
</script>

<slot />
