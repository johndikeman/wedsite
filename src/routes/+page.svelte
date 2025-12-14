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
        rotation: 10,
        left: "0%",
        ease: "power3.out",
        duration: 1,
      })
      .play()
    gsap
      .to(".flip-in-right", {
        rotation: -10,
        right: "0%",
        ease: "power3.out",
        duration: 1,
      })
      .play()
  })
</script>

<nav>
  <a href="#faq">faq</a>
  <a href="#rsvp">rsvp</a>
  <a href="#top">jess &lt3 john</a>
  <a href="#registry">registry</a>
  <a href="#fun">fun</a>
</nav>

<div class="container" id="top">
  <div class="lhalf">
    <p class="right">hey! we are getting married :)</p>
  </div>
  <div class="rhalf">
    <div class="img-container flip-in-right">
      <img src="{base}/photo1.jpg" />
    </div>
  </div>
</div>
<div class="container" id="top">
  <div class="lhalf">
    <div class="img-container flip-in-left">
      <img src="{base}/photo2.jpg" />
    </div>
  </div>
  <div class="rhalf">
    <p class="left">what does text look like over here?</p>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
    margin-bottom: 5%;
  }
  nav a {
    display: flex;
  }

  .lhalf,
  .rhalf {
    flex: 1;
    align-content: center;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }
  :global(body) {
    font-family: "Cartograph-CF", sans-serif;
    background: #f5f5f5;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .img-container {
    height: 50%;
    aspect-ratio: 0.75;
    display: flex;
    position: relative;
  }

  .flip-in-left {
    left: -100%;
    float: right;
  }

  .flip-in-right {
    right: -100%;
    float: left;
  }

  .img-container img {
    height: 100%;
    width: auto;
    object-fit: cover;
    z-index: -1;
  }

  .container {
    display: flex;
    flex-wrap: nowrap;
    width: 100vw;
    height: 50vh;
  }
  .container p {
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 10%;
  }
</style>
