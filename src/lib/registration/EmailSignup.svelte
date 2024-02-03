<script lang="ts">
  import Inputs from './Inputs.svelte';
  import { goto } from '$app/navigation';
  export let register: (username: string, password: string, passwordConf: string) => Promise<void>;
  export let emailGood: boolean;
  export let passwordGood: boolean;
  export let passwordConfGood: boolean;
  export let loading: boolean;
  let email = '';
  let password = '';
  let passwordConf = '';
</script>

<div>
  <div class="text-center">
    <p>Get Registered!</p>
  </div>
  <div class="flex justify-center content-center flex-col">
    <Inputs bind:textData={email} inputType="email" placeHolder="Email" error={emailGood} />
    <Inputs
      bind:textData={password}
      inputType="password"
      placeHolder="Password"
      error={passwordGood}
    />
    <Inputs
      bind:textData={passwordConf}
      inputType="password"
      placeHolder="Password Confirmation"
      error={passwordConfGood}
    />
  </div>
  <div class="flex justify-between gap-3">
    <button
      class="w-full bg-gray-300 hover:bg-gray-400 rounded-lg py-1"
      on:click={() => goto('https://moonlight-tricities.com/')}>Cancel</button
    >
    <button
      on:click={async (e) => await register(email, password, passwordConf)}
      class="w-full bg-green-500 hover:bg-green-700 rounded-lg py-1"
      disabled={loading}>Register</button
    >
  </div>
</div>
