<script lang="ts">
  import Background from '$lib/registration/Background.svelte';
  import RegistrationBox from '$lib/registration/RegistrationBox.svelte';
  import EmailSignup from '$lib/registration/EmailSignup.svelte';
  import { emailCheck, passwordStrong } from '$lib/frontend-code/helpers';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.app';
  import { doc, setDoc } from 'firebase/firestore';
  import { goto } from '$app/navigation';

  let emailGood = true;
  let passwordGood = true;
  let passwordConfGood = true;
  let loading = false;
  const register = async (email: string, password: string, passwordConf: string) => {
    loading = true;
    if (!emailCheck(email)) {
      emailGood = false;
      alert('Please input a valid email');
      loading = false;
      return;
    }
    if (password != passwordConf) {
      passwordConfGood = false;
      alert("Passwords don't match");
      loading = false;
      return;
    }
    if (!passwordStrong(password)) {
      passwordGood = false;
      alert('Password must be 8 characters, and contain 1 uppercase, special, and number');
      loading = false;
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.user.uid), {
        email,
      });
      goto('/account');
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
