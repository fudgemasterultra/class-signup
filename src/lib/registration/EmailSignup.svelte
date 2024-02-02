<script lang="ts">
  import Inputs from './Inputs.svelte';
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
    <Inputs bind:textData={email} inputType="email" placeHolder="Email" />
    <Inputs bind:textData={password} inputType="password" placeHolder="Password" />
    <Inputs bind:textData={passwordConf} inputType="password" placeHolder="Password Confirmation" />
  </div>
  <div class="flex justify-between gap-3">
    <button class="w-full bg-gray-300 hover:bg-gray-400 rounded-lg py-1">Cancel</button>
    <button
      on:click={async (e) => await register(email, password, passwordConf)}
      class="w-full bg-green-500 hover:bg-green-700 rounded-lg py-1">Register</button
    >
  </div>
</div>
