<script>
  export let src
  export let alt = ""
  export let quality = 80
  export let loading = "lazy"
  export let eager = false
  export let className = ""

  // Note: ${base}/${src}?quality=${quality} will work after enhanced-img setup
  $: currentSrc = `${src}`

  let loaded = false
  let error = false

  const handleLoad = () => {
    loaded = true
  }

  const handleError = () => {
    error = true
  }
</script>

<div class="image-container {className}">
  {#if error}
    <div class="error-state" role="alert">
      <span class="broken-heart">💔</span>
      <p>Couldn't load this precious memory</p>
      <small>Photo: {alt}</small>
    </div>
  {:else if !loaded}
    <!-- Placeholder will be replaced with heart loading indicator in Phase 2 -->
    <div class="loading-placeholder">
      <p>Loading wedding moments...</p>
    </div>
  {/if}

  <enhanced:img
    src={currentSrc}
    {alt}
    loading={eager ? "eager" : loading}
    data-quality={quality}
    on:load={handleLoad}
    on:error={handleError}
    class:loaded
    class:hidden={!loaded || error}
  />
</div>

<style>
  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .loading-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffe9ec;
    color: #3c1419;
    font-style: italic;
    font-weight: 400;
  }

  .error-state {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff0f2;
    color: #5a1d24;
    font-style: italic;
    padding: 1rem;
    text-align: center;
  }

  .broken-heart {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    opacity: 0.7;
  }

  .error-state small {
    font-size: 0.8rem;
    opacity: 0.8;
    margin-top: 0.5rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  img.loaded:not(.hidden) {
    opacity: 1;
  }

  img.hidden {
    display: none;
  }
</style>
