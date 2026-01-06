// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
}

// Define RSVP data interface based on the form
interface RSVPData {
  name: string
  attending: string // "yes" or "no"
  adults: number
  kids: number
}

console.log("RSVP function initialized")

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const data: RSVPData = await req.json()

    // Validate required fields
    if (!data.name || !data.attending || (data.adults === undefined && data.kids === undefined)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: name, attending, adults/kids counts"
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }

    // Validate attending value
    if (!["yes", "no"].includes(data.attending.toLowerCase())) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "attending must be 'yes' or 'no'"
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }

    // Validate counts are non-negative
    if (data.adults < 0 || data.kids < 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Counts cannot be negative"
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }

    // Calculate total guests
    const totalGuests = data.adults + data.kids
    const isAttending = data.attending.toLowerCase() === "yes"

    // If attending yes but no guests, that's invalid
    if (isAttending && totalGuests === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "If attending, must have at least 1 guest"
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      )
    }

console.log("RSVP function initialized")

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const data: RSVPData = await req.json()

    // Validate required fields
    if (!data.name || !data.email || typeof data.attending !== "boolean") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: name, email, attending",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }

    // Validate guests count
    if (data.guests_count < 1) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "guests_count must be at least 1",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }

    // Create Supabase client with service role for admin access
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      throw new Error("Internal server error")
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Format email as a placeholder (no email in form, so use name-based)
    const emailPlaceholder = `${data.name.toLowerCase().replace(/\s+/g, '.')}@rsvp.wedding`
    
    // Insert RSVP into database
    const { data: result, error } = await supabase
      .from("rsvp_responses")
      .insert({
        name: data.name.trim(),
        email: emailPlaceholder,
        attending: isAttending,
        guests_count: isAttending ? totalGuests : 1,
        dietary_restrictions: null,
        message: null
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)

      // Check for duplicate email (if needed)
      if (error.code === "23505") {
        // unique violation
        return new Response(
          JSON.stringify({
            success: false,
            error: "RSVP already submitted for this email address",
          }),
          {
            status: 409,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        )
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to save RSVP",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }

    console.log(`RSVP saved for ${data.name}: attending=${isAttending}, guests=${totalGuests}`)

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: isAttending
          ? `Thank you for confirming your attendance, ${data.name}! We've registered ${totalGuests} guest(s).`
          : "We're sorry you can't make it, but thank you for letting us know!",
        data: result
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Unexpected error:", error)

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/rsvp' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
