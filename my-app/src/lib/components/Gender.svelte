<script>
// @ts-nocheck

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let gender = '';
  export let genderError = '';

  function handleGenderChange(event) {
    gender = event.target.value;
    dispatch('genderChange', { gender });
  }
</script>

<div>
  <label class="gender-label">Gender</label>
  <div class="gender">
    <select bind:value={gender} on:change={handleGenderChange} class="gender-input">
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </div>
  {#if genderError}
    <div class="gender-error"><span>{genderError}</span></div>
  {/if}
</div>

<style>
  .gender {
    display: flex;
    gap: 10px;
  }

  .gender-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-radius: 5px;
    border-color: #ccc;
    width: 100%;
    padding: 5px;
  }

  .gender-label {
    margin-bottom: 10px;
  }

  .gender-error {
    font-size: 12px;
    color: #dc3545;
    text-align: center;
  }
</style>
