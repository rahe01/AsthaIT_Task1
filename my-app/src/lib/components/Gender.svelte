<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
    
    export let gender = '';
    export let genderError = ''; // Define genderError as a prop
    
    // Dispatch the genderChange event when gender changes
    $: dispatch('genderChange', { gender });
  </script>
  
  <div>
    <p class="gender-l">Please choose a gender. You can change who can see this later</p>
    <div class="gender">
      <div class="gender-in">
        <span>Female</span>
        <input type="radio" name="gender" value="female" bind:group={gender} />
      </div>
      <div class="gender-in">
        <span>Male</span>
        <input type="radio" name="gender" value="male" bind:group={gender} />
      </div>
      <div class="gender-in">
        <span>Custom</span>
        <input type="radio" name="gender" value="custom" bind:group={gender} />
      </div>
    </div>
    <p class="click-signup">By clicking Sign Up, you agree to our User Agreement, Privacy Policy, and Cookie Policy</p>
    
    {#if genderError}
      <span class="error">{genderError}</span>
    {/if}
  </div>
  
  <style>
    .gender {
      display: flex;
      gap: 10px;
    }
    .gender-in {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid;
      border-radius: 5px;
      border-color: #ccc;
      width: 33%;
      padding: 5px;
    }
    .gender-in input {
      margin-left: 170px;
    }
    .gender-l {
      margin-bottom: 10px;
    }
    .click-signup {
      text-align: center;
    }
    .error {
      color: red;
      font-size: 12px;
    }
  </style>
  