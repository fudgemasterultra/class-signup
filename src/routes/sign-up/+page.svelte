<script lang="ts">
  import Background from '$lib/registration/Background.svelte';
  import RegistrationBox from '$lib/registration/RegistrationBox.svelte';
  import EmailSignup from '$lib/registration/EmailSignup.svelte';
  import { emailCheck, passwordStrong } from '$lib/frontend-code/helpers';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.app';

  let emailGood = true;
  let passwordGood = true;
  let passwordConfGood = true;
  let loading = false;
  const register = async (email: string, password: string, passwordConf: string) => {
    loading = true;
    if (!emailCheck(email)) {
      emailGood = false;
      loading = false;
      return;
    }
    if (password != passwordConf) {
      passwordConfGood = false;
      loading = false;
      return;
    }
    if (!passwordStrong(password)) {
      passwordGood = false;
      loading = false;
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user.user.uid);
    } catch (e) {
      alert('Email already in use!');
      emailGood = false;
      loading = false;
    }
  };
</script>

<Background>
  <div>
    <div class="flex justify-center">
      <img src="./logo.png" alt="Logo" class="max-w-[60%] min-w-[250px]" />
    </div>
  </div>
  <RegistrationBox>
    <EmailSignup {register} {emailGood} {passwordGood} {passwordConfGood} {loading} />
  </RegistrationBox>
</Background>
