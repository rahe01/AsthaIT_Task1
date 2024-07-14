<script>
	import DateOfBirth from '$lib/components/DateOfBirth.svelte';
	import Gender from '$lib/components/Gender.svelte';
  
	let formData = {
	  firstName: '',
	  surname: '',
	  emailOrPhone: '',
	  password: '',
	  dateOfBirth: { day: '', month: '', year: '' },
	  gender: ''
	};
  
	let errors = {
	  dateError: '',
	  genderError: ''
	};
  
	// @ts-ignore
	function handleInputChange(e) {
	  // @ts-ignore
	  formData[e.target.name] = e.target.value;
	}
  
	// @ts-ignore
	function handleDateChange(event) {
	  formData.dateOfBirth = event.detail;
	  validateDate(event.detail);
	}
  
	// @ts-ignore
	function handleGenderChange(event) {
	  formData.gender = event.detail.gender;
	  validateGender(event.detail.gender);
	}
  
	// @ts-ignore
	async function handleSubmit(e) {
	  e.preventDefault();
  
	  // Validate form fields before submitting
	  if (!validateForm()) {
		return;
	  }
  
	  try {
		const response = await fetch('http://localhost:5000/signup', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ emailOrPhone: formData.emailOrPhone })
		});
  
		if (!response.ok) {
		  throw new Error('Error validating form');
		}
  
		const data = await response.json();
		alert('Form submitted successfully!');
		// Optionally, you can reset the form data here
		// resetFormData();
	  } catch (error) {
		alert('There was an error submitting the form. Please try again later.');
	  }
	}
  
	function validateForm() {
	  let isValid = true;
  
	  if (!formData.emailOrPhone.trim()) {
		alert('Please enter your email or phone number.');
		isValid = false;
	  }
  
	  if (!formData.password || formData.password.length < 4) {
		alert('Password must be at least 4 characters long.');
		isValid = false;
	  }
  
	  if (errors.dateError || errors.genderError) {
		isValid = false;
	  }
  
	  return isValid;
	}
  
	// @ts-ignore
	function validateDate(date) {
	  const { day, month, year } = date;
	  const selectedDate = new Date(year, month - 1, day);
	  const today = new Date();
  
	  if (!day || !month || !year || selectedDate > today) {
		errors.dateError = 'Invalid date. Please select a valid date.';
	  } else {
		errors.dateError = '';
	  }
	}
  
	// @ts-ignore
	function validateGender(gender) {
	  if (!gender) {
		errors.genderError = 'Please select a gender.';
	  } else {
		errors.genderError = '';
	  }
	}
  </script>
  
  <form on:submit={handleSubmit}>
	<div class="head-div">
	  <h2>Sign Up</h2>
	</div>
	<div class="name">
	  <input type="text" name="firstName" placeholder="First Name" on:input={handleInputChange} />
	  <input type="text" name="surname" placeholder="Surname" on:input={handleInputChange} />
	</div>
	
	<input type="text" name="emailOrPhone" placeholder="Enter Mobile number or email address" on:input={handleInputChange} />
	{#if formData.emailOrPhone.trim()}
	  <!-- Hide the message if emailOrPhone is filled -->
	{:else}
	  <p class='mobile'>Enter Mobile number or email address </p>
	{/if}
	
	<input type="password" name="password" placeholder="Password must be at least 4 chars long" on:input={handleInputChange} />
	<DateOfBirth on:dateChange={handleDateChange} day={formData.dateOfBirth.day} month={formData.dateOfBirth.month} year={formData.dateOfBirth.year} dateError={errors.dateError} />
	<Gender on:genderChange={handleGenderChange} gender={formData.gender} genderError={errors.genderError} />
	<div class="btn-div">
	  <button type="submit" class="s">Sign Up</button>
	  <button type="button" class="c">Cancel</button>
	</div>
  </form>
  
  <style>
	form {
	  max-width: 800px;
	  margin: 0 auto;
	  padding: 20px;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	  background-color: #fff;
	}
  
	input, select {
	  display: block;
	  width: 100%;
	  margin-bottom: 10px;
	  padding: 10px;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	}
  
	button {
	  width: 48%;
	  padding: 10px;
	  margin: 5px 1%;
	  border: none;
	  border-radius: 5px;
	  background-color: #007bff;
	  color: #fff;
	  cursor: pointer;
	}
  
	button[type="button"] {
	  background-color: #dc3545;
	}
  
	button:hover {
	  opacity: 0.9;
	}
  
	.mobile {
	  font-size: 12px;
	  color: #dc3545;
	  text-align: center;
	}
  
	.name {
	  display: flex;
	  gap: 10px;
	}
  
	.head-div {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-bottom: 10px;
	  border-bottom: 1px solid gray;
	}
  
	.btn-div {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
  
	.s {
	  background-color: rgb(58, 56, 56);
	  width: 150px;
	}
  
	.c {
	  width: 150px;
	}
  </style>
  