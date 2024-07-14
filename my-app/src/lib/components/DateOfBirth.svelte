<!-- DateOfBirth.svelte -->
<script>
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
    // @ts-ignore
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();

    if (!day || !month || !year || selectedDate > today) {
      dateError = 'Invalid date. Please select a valid date.';
    } else {
      dateError = '';
    }
  }

  // Event listeners for date selection
  $: {
    validateDate();
  }
</script>

<div>
  <label class="gender-l">Date of Birth</label>
  <div class="dob">
    <select bind:value={day} class="gender-in">
      <option value="">Day</option>
      {#each days as day}
        <option value={day}>{day}</option>
      {/each}
    </select>
    <select bind:value={month} class="gender-in">
      <option value="">Month</option>
      {#each months as month, index}
        <option value={index + 1}>{month}</option>
      {/each}
    </select>
    <select bind:value={year} class="gender-in">
      <option value="">Year</option>
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>
  {#if dateError}
    <div class="mobile"><span>{dateError}</span></div>
  {/if}
</div>

<style>
  .dob {
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

  .mobile {
    font-size: 12px;
    color: #dc3545;
    text-align: center;
  }
</style>
