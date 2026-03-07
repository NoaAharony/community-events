import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM = "Atlanta IL Community Events <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type } = body;

    let emailPayload;

    // ── EMAIL TYPE 1: Submission confirmation to organizer ──
    if (type === "submission") {
      const { organizer_name, organizer_email, event_name, event_date, edit_link } = body;

      emailPayload = {
        from: FROM,
        to: [organizer_email],
        subject: `✓ Your event "${event_name}" was added`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f5f0e8; padding: 32px 16px;">
            <div style="background: linear-gradient(160deg, #1e4068, #0f2035); border-radius: 10px 10px 0 0; padding: 28px 32px; text-align: center;">
              <div style="font-family: Georgia, serif; font-size: 20px; color: white; font-weight: 600; margin-bottom: 16px;">Atlanta <span style="color: #e8b86a; font-style: italic; font-weight: 400;">IL</span> Community Events</div>
            </div>
            <div style="background: white; border-radius: 0 0 10px 10px; padding: 32px;">
              <div style="font-size: 32px; text-align: center; margin-bottom: 12px;">✓</div>
              <h2 style="font-family: Georgia, serif; font-size: 22px; color: #1e4068; text-align: center; margin: 0 0 8px;">Event Submitted Successfully!</h2>
              <p style="color: #6a6058; font-size: 14px; text-align: center; margin: 0 0 28px;">Hi ${organizer_name}, your event is now live on the site.</p>

              <div style="background: #f5f0e8; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a09880; font-weight: 700; margin-bottom: 4px;">Event</div>
                <div style="font-size: 17px; font-weight: 700; color: #1a2028;">${event_name}</div>
                <div style="font-size: 13px; color: #6a6058; margin-top: 4px;">${event_date}</div>
              </div>

              <div style="background: #fff8ee; border: 1.5px solid #c8963e; border-radius: 8px; padding: 16px 20px; margin-bottom: 28px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a09880; font-weight: 700; margin-bottom: 8px;">Your Edit Link - save this!</div>
                <p style="font-size: 13px; color: #6a6058; margin: 0 0 12px;">Use this link to edit or cancel your event at any time. Keep it safe - it's the only way to make changes.</p>
                <a href="${edit_link}" style="display: block; background: #1e4068; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 700; text-align: center;">Edit My Event →</a>
                <div style="margin-top: 10px; font-size: 11px; color: #a09880; word-break: break-all;">${edit_link}</div>
              </div>

              <p style="font-size: 12px; color: #a09880; text-align: center; margin: 0;">Atlanta IL Community Events</p>
            </div>
          </div>
        `,
      };
    }

    // ── EMAIL TYPE 2: Address request to organizer ──
    else if (type === "address_request") {
      const { organizer_email, event_name, requester_fname, requester_lname, requester_email, requester_phone, requester_message } = body;

      emailPayload = {
        from: FROM,
        to: [organizer_email],
        reply_to: requester_email,
        subject: `📍 Address request for "${event_name}"`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f5f0e8; padding: 32px 16px;">
            <div style="background: linear-gradient(160deg, #1e4068, #0f2035); border-radius: 10px 10px 0 0; padding: 28px 32px; text-align: center;">
              <div style="font-family: Georgia, serif; font-size: 20px; color: white; font-weight: 600; margin-bottom: 16px;">Atlanta <span style="color: #e8b86a; font-style: italic; font-weight: 400;">IL</span> Community Events</div>
            </div>
            <div style="background: white; border-radius: 0 0 10px 10px; padding: 32px;">
              <h2 style="font-family: Georgia, serif; font-size: 20px; color: #1e4068; margin: 0 0 6px;">Someone requested your event address</h2>
              <p style="color: #6a6058; font-size: 14px; margin: 0 0 24px;">For: <strong>${event_name}</strong></p>

              <div style="background: #f5f0e8; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a09880; font-weight: 700; margin-bottom: 14px;">Requester Details</div>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="font-size: 12px; color: #a09880; padding: 5px 0; width: 80px;">Name</td>
                    <td style="font-size: 14px; color: #1a2028; font-weight: 600;">${requester_fname} ${requester_lname}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #a09880; padding: 5px 0;">Email</td>
                    <td style="font-size: 14px; color: #1a2028;"><a href="mailto:${requester_email}" style="color: #1e4068;">${requester_email}</a></td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #a09880; padding: 5px 0;">Phone</td>
                    <td style="font-size: 14px; color: #1a2028;">${requester_phone}</td>
                  </tr>
                  ${requester_message ? `
                  <tr>
                    <td style="font-size: 12px; color: #a09880; padding: 5px 0; vertical-align: top;">Message</td>
                    <td style="font-size: 14px; color: #1a2028; font-style: italic;">"${requester_message}"</td>
                  </tr>` : ''}
                </table>
              </div>

              <a href="mailto:${requester_email}" style="display: block; background: #1e4068; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 700; text-align: center; margin-bottom: 24px;">Reply to ${requester_fname} →</a>

              <p style="font-size: 12px; color: #a09880; text-align: center; margin: 0;">Atlanta IL Community Events</p>
            </div>
          </div>
        `,
      };
    }

    else {
      return new Response(JSON.stringify({ error: "Unknown email type" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Send via Resend ──
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Resend error");
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
