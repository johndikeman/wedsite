<script>
  let formData = {
    name: "",
    attending: "",
    adults: 0,
    kids: 0,
  }

  function handleSubmit() {
    if (!formData.name || !formData.attending) {
      alert("Please fill in all required fields")
      return
    }

    if (
      formData.attending === "yes" &&
      formData.adults === 0 &&
      formData.kids === 0
    ) {
      alert("Please specify number of adults or kids")
      return
    }

    console.log("Form submitted:", formData)
    alert(`Thank you ${formData.name}! Your RSVP has been received.`)
  }
</script>

<div class="form-wrapper">
  <div class="form-container">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        bind:value={formData.name}
        placeholder="Your name"
      />
    </div>

    <div class="form-group">
      <label>Will you be attending?</label>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" bind:group={formData.attending} value="yes" />
          Yes
        </label>
        <label class="radio-label">
          <input type="radio" bind:group={formData.attending} value="no" />
          No
        </label>
      </div>
    </div>

    {#if formData.attending === "yes"}
      <div class="form-group">
        <label for="adults">Number of Adults</label>
        <input type="number" id="adults" bind:value={formData.adults} min="0" />
      </div>

      <div class="form-group">
        <label for="kids">Number of Kids</label>
        <input type="number" id="kids" bind:value={formData.kids} min="0" />
      </div>
    {/if}

    <button on:click={handleSubmit}>Submit RSVP</button>
  </div>
</div>

<style>
  .form-wrapper {
    max-width: 500px;
    padding: 2rem;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    font-size: 0.9rem;
  }

  input[type="text"],
  input[type="number"] {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }

  input[type="text"]:focus,
  input[type="number"]:focus {
    outline: none;
    border-color: #4a90e2;
  }

  .radio-group {
    display: flex;
    gap: 1.5rem;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: normal;
  }

  input[type="radio"] {
    cursor: pointer;
  }

  button {
    padding: 0.75rem 2rem;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #357abd;
  }

  button:active {
    transform: translateY(1px);
  }
</style>
