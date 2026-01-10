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

console.log("Song request function initialized")

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const data = await req.json()
    const songTitle = data.song_title?.trim()

    // Validate required field
    if (!songTitle) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Song title is required",
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

    // Insert song request into database
    const { data: result, error } = await supabase
      .from("song_requests")
      .insert({
        song_title: songTitle,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to save song request",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }

    console.log(`Song request saved: "${songTitle}"`)

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: `Thank you! "${songTitle}" has been added to our playlist.`,
        data: result,
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/submit-song-request' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"song_title":"Dancing Queen"}'

*/
