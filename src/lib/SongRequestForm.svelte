<script>
  import { onMount } from "svelte"

  let songTitle = ""
  let submitting = false
  let submitSuccess = false
  let submitError = ""
  let supabaseUrl = ""

  onMount(async () => {
    // Get Supabase URL from environment variable
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  })

  async function handleSubmit() {
    if (!songTitle.trim()) {
      alert("Please enter a song title")
      return
    }

    submitting = true
    submitError = ""
    submitSuccess = false

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/submit-song-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            song_title: songTitle.trim(),
          }),
        },
      )

      const result = await response.json()

      if (response.ok && result.success) {
        submitSuccess = true
        console.log("Song request saved:", result)

        // Reset form after successful submission
        songTitle = ""
      } else {
        submitError = result.error || "Failed to submit song request"
        console.error("Song request error:", result)
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
    <div class="form-group blanketscarlet">
      <label for="songTitle">Song Title</label>
      <input
        type="text"
        id="songTitle"
        bind:value={songTitle}
        placeholder="Enter the song you'd like to hear"
      />
    </div>

    <button on:click={handleSubmit} disabled={submitting}>
      {submitting ? "Submitting..." : "Request Song"}
    </button>

    {#if submitSuccess}
      <div class="success-message">
        ✓ Thank you! Your song request has been received.
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

  input[type="text"] {
    padding: 0.75rem;
    border: 1px solid var(--bordercolor);
    border-radius: 4px;
    font-size: 1rem;
    font-family: "Cartograph CF", serif;
    font-style: italic;
    background: hsl(from var(--formbg) h s calc(l + 10));
    color: inherit;
  }

  input[type="text"]:focus {
    outline: none;
    border-color: var(--bordercolor);
    box-shadow: 0 0 0 2px rgba(201, 122, 132, 0.2);
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
