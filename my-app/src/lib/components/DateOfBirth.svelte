<script>
// @ts-nocheck

  export let day = '';
  export let month = '';
  export let year = '';
  export let dateError = '';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  $: dispatch('dateChange', { day, month, year });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i);

  function validateDate() {
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();

    if (!day || !month || !year || isNaN(selectedDate) || selectedDate > today) {
      dateError = 'Invalid date. Please select a valid date.';
    } else {
      dateError = '';
    }
  }

  $: validateDate();
</script>

<div>
  <label class="dob-label">Date of Birth</label>
  <div class="dob">
    <select bind:value={day} class="dob-input">
      <option value="">Day</option>
      {#each days as day}
        <option value={day}>{day}</option>
      {/each}
    </select>
    <select bind:value={month} class="dob-input">
      <option value="">Month</option>
      {#each months as month, index}
        <option value={index + 1}>{month}</option>
      {/each}
    </select>
    <select bind:value={year} class="dob-input">
      <option value="">Year</option>
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>
  {#if dateError}
    <div class="dob-error"><span>{dateError}</span></div>
  {/if}
</div>

<style>
  .dob {
    display: flex;
    gap: 10px;
  }

  .dob-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-radius: 5px;
    border-color: #ccc;
    width: 33%;
    padding: 5px;
  }

  .dob-label {
    margin-bottom: 10px;
  }

  .dob-error {
    font-size: 12px;
    color: #dc3545;
    text-align: center;
  }
</style>
