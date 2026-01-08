<script>
  import { onMount } from "svelte"

  let formData = {
    name: "",
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
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "http://127.0.0.1:54321"
  })

  async function handleSubmit() {
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

    submitting = true
    submitError = ""
    submitSuccess = false

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            (import.meta.env.VITE_SUPABASE_ANON_KEY ||
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"),
        },
        body: JSON.stringify({
          name: formData.name,
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

    <div class="form-group">
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
  .form-wrapper {
    max-width: 500px;
    padding: 2rem;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #fff5f7;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(60, 20, 25, 0.1);
    border: 1px solid #f8d7da;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    font-size: 0.9rem;
    color: #3c1419;
    font-family: "Cartograph CF", serif;
    font-style: italic;
  }

  input[type="text"],
  input[type="number"],
  textarea {
    padding: 0.75rem;
    border: 1px solid #d9a2a9;
    border-radius: 4px;
    font-size: 1rem;
    font-family: "Cartograph CF", serif;
    font-style: italic;
    background: #fff;
    color: #3c1419;
  }

  textarea {
    resize: vertical;
  }

  input[type="text"]:focus,
  input[type="number"]:focus,
  textarea:focus {
    outline: none;
    border-color: #c97a84;
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
    background: #c97a84;
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
    background: #b36771;
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
