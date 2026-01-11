<script>
  import { base } from "$app/paths"
  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  // ScrollSmoother requires ScrollTrigger
  import { ScrollSmoother } from "gsap/ScrollSmoother"
  import { ScrollToPlugin } from "gsap/ScrollToPlugin"
  import { TextPlugin } from "gsap/TextPlugin"
  import { onMount } from "svelte"

  import RsvpForm from "$lib/RsvpForm.svelte"
  import SongRequestForm from "$lib/SongRequestForm.svelte"

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, TextPlugin)
  let scrollContainer
  let smoother

  onMount(() => {
    const ctx = gsap.context((self) => {
      const fils = self.selector(".flip-in-left")
      fils.forEach((fil) => {
        gsap.to(fil, {
          rotation: 10,
          left: "0%",
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: fil,
            start: "bottom 90%",
            toggleActions: "play reverse play reverse",
          },
        })
      })

      const firs = self.selector(".flip-in-right")
      firs.forEach((fir) => {
        gsap.to(fir, {
          rotation: -10,
          left: "0%",
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: fir,
            start: "bottom 90%",
            toggleActions: "play reverse play reverse",
          },
        })
      })

      smoother = ScrollSmoother.create({
        smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
      })
    }, scrollContainer)
  })

  function scrollToSection(sectionId, e) {
    e.preventDefault()
    const target = document.getElementById(sectionId)
    if (target && smoother) {
      smoother.scrollTo(target, true, "top top")
    }
  }
  // navbar section stuff
  let activeSection = "top"
  const sections = {
    faq: "faq",
    rsvp: "rsvp",
    top: "jess <3 john",
    registry: "registry",
    fun: "fun",
  }
  const sectionColors = {
    faq: "sunflower",
    rsvp: "peach",
    top: "softestpink",
    registry: "velvetblue",
    fun: "greenforests",
  }
</script>

<div id="smooth-wrapper">
  <div id="smooth-content" bind:this={scrollContainer}>
    <nav>
      {#each Object.entries(sections) as [sectionId, sectionText]}
        <a
          href="#{sectionId}"
          class={sectionColors[sectionId]}
          class:active={activeSection === sectionId}
          on:click={(e) => {
            activeSection = sectionId
            scrollToSection(sectionId, e)
          }}
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
          <enhanced:img
            src="/static/ep/jjfinal-98.jpg?w=800;400&q=80"
            alt="cute pic of us loading..."
            loading="eager"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="lhalf">
        <div class="img-container flip-in-left">
          <enhanced:img
            src="/static/ep/jjfinal-140.jpg?w=800;400&q=80"
            alt="cute pic of us loading..."
            loading="lazy"
          />
        </div>
      </div>
      <div class="rhalf">
        <p class="left">
          Ceremony is at <a
            href="https://www.google.com/maps/dir//14711+Ranch+Rd+12,+Wimberley,+TX+78676/@30.4613453,-97.3084708,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b5dd9037f83b3:0xb650420cc3f03760!2m2!1d-98.1032852!2d30.0062927?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            >St. Mary's Catholic Church, Wimberley</a
          > at 2pm
        </p>
        <p class="left">
          followed by time at the <a
            href="https://www.google.com/maps/dir//900+Ranch+to+Market+32,+San+Marcos,+TX+78666/@30.4613453,-97.3084708,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b5fa5af3fc113:0x99967aa00b6905e5!2m2!1d-98.1030273!2d29.9426193?entry=ttu&amp;g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            >Wildflower Event Center</a
          >
        </p>
      </div>
    </div>
    <hr />

    <h1 id="faq" class={sectionColors["faq"]}>faq</h1>

    <div class="container">
      <div class="lhalf">
        <div class="img-container flip-in-left">
          <enhanced:img
            src="/static/ep/jjfinal-13.jpg?w=800;400&q=80"
            alt="cute pic of us loading..."
            loading="lazy"
          />
        </div>
      </div>
      <div class="rhalf">
        <p class="question">When should I RSVP by?</p>
        <p class="answer">
          let us know to save you a seat no later than April 16, pretty please!
        </p>

        <p class="question">
          I have a food allergy, can I make a special request?
        </p>
        <p class="answer">
          leave us a message in the <a href="#rsvp">rsvp</a>!
        </p>
      </div>
    </div>

    <div class="container">
      <div class="lhalf">
        <p class="question">What should I wear?</p>
        <p class="answer">in:</p>
        <ul class="answer">
          <li>vibrant and colorful,<br /></li>
          <li>dressing to your comfort level,<br /></li>
          <li>the liminal space between cocktail and casual,<br /></li>
        </ul>

        <p class="answer">out:</p>
        <ul class="answer">
          <li>blue jeans,<br /></li>
          <li>heels when you want to wear flats,<br /></li>
          <li>holding back on color<br /></li>
        </ul>
      </div>

      <div class="rhalf">
        <div class="img-container flip-in-right">
          <enhanced:img
            src="/static/ep/jjfinal-172.jpg?w=800;400&q=80"
            alt="cute pic of us loading..."
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="lhalf">
        <div class="img-container flip-in-left">
          <enhanced:img
            src="/static/ep/jjfinal-27.jpg?w=800;400&q=80"
            alt="cute pic of us loading..."
            loading="lazy"
          />
        </div>
      </div>
      <div class="rhalf">
        <p class="question">What time should I arrive at the ceremony?</p>
        <p class="answer">
          we know this is rich coming from Jess, but please arrive no later than
          2:55. our early bird guests may arrive as early as 2:30.
        </p>
        <p class="question">Are kids welcome?</p>
        <p class="answer">
          sure, but the rowdy and unattended will be put to work on the farm, so
          watch out
        </p>
      </div>
    </div>

    <hr />
    <h1 class={sectionColors["rsvp"]} id="rsvp">rsvp</h1>
    <div class="rsvp-container">
      <p>we hope you can join us!</p>
      <RsvpForm />
    </div>

    <hr />
    <h1 class={sectionColors["registry"]} id="registry">registry</h1>
    <div class="container">
      <div class="lhalf">
        <p class="right">
          <a href="">coming soon!</a>
        </p>
      </div>
      <div class="rhalf">
        <div class="img-container flip-in-right">
          <enhanced:img
            src="/static/ep/jjfinal-56.jpg?w=800;400&q=80"
            alt="cute pic of us loading..."
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <hr />
    <h1 class={sectionColors["fun"]} id="fun">fun</h1>
    <div class="container">
      <div class="lhalf">
        <div class="img-container flip-in-left">
          <enhanced:img
            src="/static/ep/jjfinal-72.jpg?w=800;400&q=80"
            alt="cute pic of us loading..."
            loading="lazy"
          />
        </div>
      </div>
      <div class="rhalf">
        <p class="left">request a song!</p>
      </div>
    </div>

    <div id="song-request">
      <SongRequestForm />
    </div>
  </div>
</div>

<style>
  :root {
    --sunflower: #e0b451;
    --peach: #ee9452;
    --softestpink: #d39ba0;
    --velvetblue: #777e88;
    --greenforests: #a0aa74;
    --blanketscarlet: #ea4753;
    --blanketyellow: #f0f067;
    --eggshell: #f0ead6;
    --offblack: #12100f;
  }

  /* Regular */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-Regular.otf")
      format("opentype");
    font-weight: 400; /* Standard weight for Regular */
    font-style: normal;
    font-display: swap;
  }

  /* Regular Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-RegularItalic.otf")
      format("opentype");
    font-weight: 400;
    font-style: italic; /* Maps this file to the 'italic' style */
    font-display: swap;
  }

  /* Bold */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-Bold.otf")
      format("opentype");
    font-weight: 700; /* Standard weight for Bold */
    font-style: normal;
    font-display: swap;
  }

  /* Bold Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-BoldItalic.otf")
      format("opentype");
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }

  /* Heavy (often weight 900 or 950) */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-Heavy.otf")
      format("opentype");
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  /* Thin */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-Thin.otf")
      format("opentype");
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  /* Thin Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-ThinItalic.otf")
      format("opentype");
    font-weight: 100;
    font-style: italic;
    font-display: swap;
  }

  /* Extra Light */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-ExtraLight.otf")
      format("opentype");
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  /* Extra Light Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-ExtraLightItalic.otf")
      format("opentype");
    font-weight: 200;
    font-style: italic;
    font-display: swap;
  }

  /* Regular */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-Regular.otf")
      format("opentype");
    font-weight: 400; /* 'normal' also works here */
    font-style: normal;
    font-display: swap;
  }

  /* Regular Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-RegularItalic.otf")
      format("opentype");
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }

  /* Demi Bold (Semi Bold) */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-DemiBold.otf")
      format("opentype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  /* Demi Bold Italic (Semi Bold Italic) */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-DemiBoldItalic.otf")
      format("opentype");
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }

  /* Bold */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-Bold.otf")
      format("opentype");
    font-weight: 700; /* 'bold' also works here */
    font-style: normal;
    font-display: swap;
  }

  /* Bold Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-BoldItalic.otf")
      format("opentype");
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }

  /* Extra Bold */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-ExtraBold.otf")
      format("opentype");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  /* Extra Bold Italic */
  @font-face {
    font-family: "Cartograph CF";
    src: url("/static/fonts/Cartograph/CartographCF-ExtraBoldItalic.otf")
      format("opentype");
    font-weight: 800;
    font-style: italic;
    font-display: swap;
  }

  hr {
    width: 80%;
    border: none;
    border-top: 1px solid var(--softestpink);
    margin: 20px auto;
  }
  h1 {
    letter-spacing: -0.1rem;
    padding-left: 2%;
  }

  .offblack {
    color: var(--offblack);
  }
  .eggshell {
    color: var(--eggshell);
  }
  .blanketyellow {
    color: var(--blanketyellow);
  }
  .blanketscarlet {
    color: var(--blanketscarlet);
  }
  .greenforests {
    color: var(--greenforests);
  }
  .velvetblue {
    color: var(--velvetblue);
  }
  .softestpink {
    color: var(--softestpink);
  }
  .peach {
    color: var(--peach);
  }
  .sunflower {
    color: var(--sunflower);
  }

  .question {
    font-weight: 400;
  }

  .answer {
    font-size: 0.9rem;
  }

  ul {
    padding-left: 20px;
  }
  a {
    color: inherit; /* inherit text color from parent */
    cursor: pointer;
  }
  nav a {
    text-decoration: none; /* remove default underline */
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
    font-weight: 600;
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
    font-weight: 200;
    font-size: 1.1rem;
    letter-spacing: -1px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--eggshell);
    color: var(--offblack);
  }

  .img-container {
    height: 70%;
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

  .rsvp-container,
  #song-request {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 100%;
  }
  .rsvp-container p {
    margin-left: 0;
    margin-right: 0;
    text-align: center;
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
    padding-top: 5%;
  }
</style>
