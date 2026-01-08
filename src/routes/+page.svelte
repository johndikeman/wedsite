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
</script>

<div id="smooth-wrapper">
  <div id="smooth-content" bind:this={scrollContainer}>
    <nav>
      {#each Object.entries(sections) as [sectionId, sectionText]}
        <a
          href="#{sectionId}"
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
    <!--- ALL YOUR CONTENT HERE --->
    <div class="container" id="top">
      <div class="lhalf">
        <p class="right">hey! we are getting married :)</p>
      </div>
      <div class="rhalf">
        <div class="img-container flip-in-right">
          <enhanced:img
            src="/static/photo1.jpg?w=800;400&q=80"
            alt="Wedding couple portrait"
            loading="eager"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="lhalf">
        <div class="img-container flip-in-left">
          <enhanced:img
            src="/static/photo2.jpg?w=800;400&q=80"
            alt="Wedding ceremony moment"
            loading="lazy"
          />
        </div>
      </div>
      <div class="rhalf"></div>
    </div>

    <div class="container" id="faq">
      <div class="lhalf">
        <p class="right">
          Ceremony is at <a
            href="https://www.google.com/maps/dir//14711+Ranch+Rd+12,+Wimberley,+TX+78676/@30.4613453,-97.3084708,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b5dd9037f83b3:0xb650420cc3f03760!2m2!1d-98.1032852!2d30.0062927?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            >St. Mary's Catholic Church, Wimberley</a
          > at 2pm
        </p>
      </div>
      <div class="rhalf">
        <div class="img-container flip-in-right">
          <enhanced:img
            src="/static/photo1.jpg?w=800;400&q=80"
            alt="St. Mary's Catholic Church exterior"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="lhalf">
        <div class="img-container flip-in-left">
          <enhanced:img
            src="/static/photo2.jpg?w=800;400&q=80"
            alt="Wildflower Event Center garden area"
            loading="lazy"
          />
        </div>
      </div>
      <div class="rhalf">
        <p class="left">
          followed by time at the <a
            href="https://www.google.com/maps/dir//900+Ranch+to+Market+32,+San+Marcos,+TX+78666/@30.4613453,-97.3084708,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b5fa5af3fc113:0x99967aa00b6905e5!2m2!1d-98.1030273!2d29.9426193?entry=ttu&amp;g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            >Wildflower Event Center</a
          >
        </p>
      </div>
    </div>

    <div id="rsvp">
      <p>we hope you can join us!</p>
      <RsvpForm />
    </div>

    <div class="container" id="registry">
      <div class="lhalf">
        <p class="right">
          if you want to <a href="">buy us something...</a>
        </p>
      </div>
      <div class="rhalf">
        <div class="img-container flip-in-right">
          <enhanced:img
            src="/static/photo1.jpg?w=800;400&q=80"
            alt="Wedding guest seating area"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div class="container" id="fun">
      <div class="lhalf">
        <div class="img-container flip-in-left">
          <enhanced:img
            src="/static/photo2.jpg?w=800;400&q=80"
            alt="Wedding reception dance floor"
            loading="lazy"
          />
        </div>
      </div>
      <div class="rhalf">
        <p class="left">
          or <a href="">request a song!</a>
        </p>
      </div>
    </div>

    <div class="container">
      <div class="lhalf">
        <p class="right">
          or <a href="">see a cat pic!</a>
        </p>
      </div>
      <div class="rhalf">
        <div class="img-container flip-in-right">
          <enhanced:img
            src="/static/photo1.jpg?w=800;400&q=80"
            alt="Wedding cake or dessert table"
            loading="lazy"
          />
        </div>
      </div>
    </div>
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

  #rsvp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 100%;
  }
  #rsvp p {
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
    padding-top: 10%;
  }
</style>
