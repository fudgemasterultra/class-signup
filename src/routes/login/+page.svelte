<script lang="ts">
  import Background from '$lib/login/Background.svelte';
  import { auth } from '$lib/firebase/firebase.app';
  import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
  import { FirebaseError } from 'firebase/app';
  import { goto } from '$app/navigation';
  $: forgotPassword = false;
  let email = '';
  let password = '';
  let loading = false;
  const cyclePasswordForgot = () => {
    forgotPassword = !forgotPassword;
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      goto('/account');
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.code);
      }
    }
  };

  const passwordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('An email has been sent');
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.code);
      }
    }
  };

  const handleLoginCycle = async () => {
    if (forgotPassword) {
      await passwordReset();
    } else {
      await login();
    }
  };

  const handleReturnSubmit = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      await handleLoginCycle();
    }
  };
</script>

<svelte:body on:keypress={handleReturnSubmit} />
<Background>
  <div class=" flex justify-center md:min-w-[40%] sm:max-w-[40%]">
    <img src="./logo.png" class="max-w-[10%] min-w-[250px]" />
  </div>
  <div class=" bg-white rounded-lg drop-shadow-xl">
    <div class="py-5 px-3">
      <div class="text-center">
        <p>{forgotPassword ? 'Reset Password' : 'Login'}</p>
      </div>
      <div class="w-full">
        <div class="py-3">
          <input
            bind:value={email}
            placeholder="Email"
            type="email"
            class="border-2 rounded-md py-1"
          />
        </div>
        <div class="py-3">
          {#if !forgotPassword}
            <input
              bind:value={password}
              placeholder="Password"
              type="password"
              class="border-2 rounded-md py-1"
            />
          {/if}
        </div>
      </div>
      <button class="text-center w-full text-blue-500" on:click={cyclePasswordForgot}
        >{forgotPassword ? 'Login' : 'Forgot Password'}</button
      >
      <button class="bg-green-500 w-full py-2 my-2 rounded-xl" on:click={handleLoginCycle}
        >{forgotPassword ? 'Send Reset Link' : 'Login'}</button
      >
    </div>
  </div>
</Background>
