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

    // navbar "active" styling
    const links = document.querySelectorAll('a[href^="#"]')

    // Add click handler to set active class
    links.forEach((link) => {
      link.addEventListener("click", () => {
        // Remove active from all links
        links.forEach((l) => l.classList.remove("active"))
        // Add active to clicked link
        link.classList.add("active")
      })
    })
  })

  // navbar section stuff
  let activeSection = "top"
  const sections = {
    faq: "faq",
    rsvp: "rsvp",
    top: "jess <3 john",
    registry: "registry",
    fun: "fun",
  }
</script>

<nav>
  {#each Object.entries(sections) as [sectionId, sectionText]}
    <a
      href="#{sectionId}"
      class:active={activeSection === sectionId}
      on:click={() => (activeSection = sectionId)}
    >
      {sectionText}
    </a>
  {/each}
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
  /* Regular */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-Regular.otf") format("opentype");
    font-weight: 400; /* Standard weight for Regular */
    font-style: normal;
    font-display: swap;
  }

  /* Regular Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-RegularItalic.otf")
      format("opentype");
    font-weight: 400;
    font-style: italic; /* Maps this file to the 'italic' style */
    font-display: swap;
  }

  /* Bold */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-Bold.otf") format("opentype");
    font-weight: 700; /* Standard weight for Bold */
    font-style: normal;
    font-display: swap;
  }

  /* Bold Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-BoldItalic.otf") format("opentype");
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }

  /* Heavy (often weight 900 or 950) */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-Heavy.otf") format("opentype");
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  /* Thin */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-Thin.otf") format("opentype");
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  /* Thin Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-ThinItalic.otf") format("opentype");
    font-weight: 100;
    font-style: italic;
    font-display: swap;
  }

  /* Extra Light */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-ExtraLight.otf") format("opentype");
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  /* Extra Light Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-ExtraLightItalic.otf")
      format("opentype");
    font-weight: 200;
    font-style: italic;
    font-display: swap;
  }

  /* Regular */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-Regular.otf") format("opentype");
    font-weight: 400; /* 'normal' also works here */
    font-style: normal;
    font-display: swap;
  }

  /* Regular Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-RegularItalic.otf")
      format("opentype");
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }

  /* Demi Bold (Semi Bold) */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-DemiBold.otf") format("opentype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  /* Demi Bold Italic (Semi Bold Italic) */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-DemiBoldItalic.otf")
      format("opentype");
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }

  /* Bold */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-Bold.otf") format("opentype");
    font-weight: 700; /* 'bold' also works here */
    font-style: normal;
    font-display: swap;
  }

  /* Bold Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-BoldItalic.otf") format("opentype");
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }

  /* Extra Bold */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-ExtraBold.otf") format("opentype");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  /* Extra Bold Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("fonts/Cartograph/CartographCF-ExtraBoldItalic.otf")
      format("opentype");
    font-weight: 800;
    font-style: italic;
    font-display: swap;
  }
  a {
    color: inherit; /* inherit text color from parent */
    text-decoration: none; /* remove default underline */
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline; /* optional: underline on hover */
  }

  a.active {
    text-decoration: underline;
  }
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
    padding-top: 5%;
    font-weight: 200;
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
    font-family: "Cartograph CF", serif;
    font-style: italic;
    font-weight: 600;
    background: #f5f5f5;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #ffe9ec;
    color: #3c1419;
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
