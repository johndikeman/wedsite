<script>
  import { base } from "$app/paths"
  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  // ScrollSmoother requires ScrollTrigger
  import { ScrollSmoother } from "gsap/ScrollSmoother"
  import { ScrollToPlugin } from "gsap/ScrollToPlugin"
  import { TextPlugin } from "gsap/TextPlugin"
  import { onMount } from "svelte"

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, TextPlugin)

  onMount(() => {
    gsap
      .to(".flip-in-left", {
        rotation: 15,
        left: "0%",
        ease: "power3.out",
        duration: 1,
      })
      .play()
    gsap
      .to(".flip-in-right", {
        rotation: -15,
        right: "0%",
        ease: "power3.out",
        duration: 1,
      })
      .play()
  })
</script>

<div class="container">
  <div class="img-container flip-in-left">
    <img src="{base}/photo1.jpg" />
  </div>
</div>
<div class="container">
  <div class="img-container flip-in-right">
    <img src="{base}/photo2.jpg" />
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: "Cartograph-CF", sans-serif;
    font-size: 2em;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .img-container {
    width: 30%;
    aspect-ratio: 0.75;
    position: relative;
  }

  .flip-in-left {
    left: -30%;
  }

  .flip-in-right {
    float: right;
    right: -30%;
  }

  .img-container img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }

  .container {
    width: 100vw;
    height: 100vh;
  }
</style>
