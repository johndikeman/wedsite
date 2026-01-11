<script>
  import { onMount } from "svelte"

  let formData = {
    name: "",
    email: "",
    attending: "",
    adults: 0,
    kids: 0,
    message: "",
  }

  let submitting = false
  let submitSuccess = false
  let submitError = ""
  let supabaseUrl = ""

  onMount(async () => {
    // Get Supabase URL from environment variable
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  })

  async function handleSubmit() {
    if (!formData.name || !formData.email || !formData.attending) {
      alert("Please fill in all required fields")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address")
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

    submitting = true
    submitError = ""
    submitSuccess = false

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          attending: formData.attending,
          adults: formData.adults,
          kids: formData.kids,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        submitSuccess = true
        console.log("RSVP saved:", result)

        // Reset form after successful submission
        formData = {
          name: "",
          email: "",
          attending: "",
          adults: 0,
          kids: 0,
          message: "",
        }
      } else {
        submitError = result.error || "Failed to submit RSVP"
        console.error("RSVP error:", result)
      }
    } catch (error) {
      submitError = "Network error: " + error.message
      console.error("Submit error:", error)
    } finally {
      submitting = false
    }
  }
</script>

<div class="form-wrapper">
  <div class="form-container">
    <div class="form-group sunflower">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        bind:value={formData.name}
        placeholder="Your name"
      />
    </div>

    <div class="form-group peach">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        bind:value={formData.email}
        placeholder="Your email address"
      />
    </div>

    <div class="form-group blanketscarlet">
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
      <div class="form-group softestpink">
        <label for="adults">Number of Adults</label>
        <input type="number" id="adults" bind:value={formData.adults} min="0" />
      </div>

      <div class="form-group softestpink">
        <label for="kids">Number of Kids</label>
        <input type="number" id="kids" bind:value={formData.kids} min="0" />
      </div>
    {/if}

    <div class="form-group velvetblue">
      <label for="message">Message (Optional)</label>
      <textarea
        id="message"
        bind:value={formData.message}
        placeholder="Leave a message for the couple..."
        rows="4"
      />
    </div>

    <button on:click={handleSubmit} disabled={submitting}>
      {submitting ? "Submitting..." : "Submit RSVP"}
    </button>

    {#if submitSuccess}
      <div class="success-message">
        ✓ Thank you! Your RSVP has been received.
      </div>
    {/if}

    {#if submitError}
      <div class="error-message">
        ⚠ {submitError}
      </div>
    {/if}
  </div>
</div>

<style>
  .offblack {
    color: var(--offblack);
  }
  .eggshell {
    color: var(--eggshell);
  }
  .blanketyellow {
    color: var(--blanketyellow);
    --bordercolor: var(--blanketyellow);
  }
  .blanketscarlet {
    color: var(--blanketscarlet);
    --bordercolor: var(--blanketscarlet);
  }
  .greenforests {
    color: var(--greenforests);
    --bordercolor: var(--greenforests);
  }
  .velvetblue {
    color: var(--velvetblue);
    --bordercolor: var(--velvetblue);
  }
  .softestpink {
    color: var(--softestpink);
    --bordercolor: var(--softestpink);
  }
  .peach {
    color: var(--peach);
    --bordercolor: var(--peach);
  }
  .sunflower {
    color: hsl(from var(--sunflower) h s calc(l - 10));
    --bordercolor: var(--sunflower);
  }
  .form-wrapper {
    max-width: 500px;
    padding: 2rem;
  }

  .form-container {
    --bordercolor: hsl(from var(--greenforests) h s calc(l - 10));
    --buttoncolor: var(--greenforests);
    --formbg: hsl(from var(--greenforests) h s calc(l + 25));
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    /* background-color: hsl(from var(--peach) h s calc(l + 20)); */
    background-color: var(--formbg);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px hsl(from var(--bordercolor) h s calc(l + 10));
    border: 1px solid var(--bordercolor);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    font-size: 0.9rem;
    color: inherit;
    font-family: "Cartograph CF", serif;
    font-style: italic;
  }

  input[type="text"],
  input[type="number"],
  input[type="email"],
  textarea {
    padding: 0.75rem;
    border: 1px solid var(--bordercolor);
    border-radius: 4px;
    font-size: 1rem;
    font-family: "Cartograph CF", serif;
    font-style: italic;
    background: hsl(from var(--formbg) h s calc(l + 10));
    color: inherit;
  }

  textarea {
    resize: vertical;
  }

  input[type="text"]:focus,
  input[type="number"]:focus,
  input[type="email"]:focus,
  textarea:focus {
    outline: none;
    border-color: var(--bordercolor);
    color: var(--offblack);
    box-shadow: 0 0 0 2px rgba(201, 122, 132, 0.2);
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
    background: var(--buttoncolor);
    color: #fff5f7;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    font-family: "Cartograph CF", serif;
    font-style: italic;
  }

  button:hover:not(:disabled) {
    background: hsl(from var(--buttoncolor) h s calc(l - 10));
  }

  button:active:not(:disabled) {
    transform: translateY(1px);
  }

  button:disabled {
    background: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .success-message {
    background: #d4edda;
    color: #155724;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #c3e6cb;
    font-size: 0.9rem;
  }

  .error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #f5c6cb;
    font-size: 0.9rem;
  }
</style>
