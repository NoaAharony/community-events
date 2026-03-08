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
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #d8d0c4; padding: 32px 16px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; background:#f5f0e8;"><tr><td>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px 10px 0 0;"><tr>
            <td bgcolor="#1e4068" style="background: linear-gradient(160deg, #1e4068, #0f2035); border-radius: 10px 10px 0 0; padding: 28px 32px; text-align: center; border-bottom: 3px solid #c8963e;">
              <div style="font-family: Georgia, serif; font-size: 20px; color: white; font-weight: 600; text-align: center; margin-bottom: 20px;">Atlanta <span style="color: #e8b86a; font-style: italic; font-weight: 400;">IL</span> Community Events</div>
              <div style="width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(232,184,106,0.45); display: inline-flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(232,184,106,0.85)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div style="font-family: Georgia, serif; font-size: 20px; color: white; font-weight: 400; margin-bottom: 4px;">Your event was added successfully!</div>
              <div style="font-size: 13px; color: rgba(255,255,255,0.6);">It will appear on the events page shortly</div>
            </td></tr></table>
            <div style="background: white; border-radius: 0 0 10px 10px; padding: 28px 32px;">
              <p style="font-family: Georgia, serif; font-size: 18px; color: #1a2028; margin: 0 0 6px;">Hi <strong>${organizer_name}</strong>,</p>
              <p style="font-size: 14px; color: #6a6058; margin: 0 0 28px; line-height: 1.6;">Thank you for adding your event to Atlanta IL Community Events. It will appear on the site shortly.</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px; border-radius: 0 8px 8px 0;"><tr>
                <td width="3" bgcolor="#c8963e" style="background: #c8963e; border-radius: 3px 0 0 3px;">&nbsp;</td>
                <td bgcolor="#f9f5ef" style="background: #f9f5ef; padding: 14px 18px; border-radius: 0 8px 8px 0;">
                  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a09880; font-weight: 700; margin-bottom: 8px;">Your Event</div>
                  <div style="font-family: Georgia, serif; font-size: 20px; font-weight: 400; color: #1a3a5c; margin-bottom: 4px;">${event_name}</div>
                  <div style="font-size: 13px; color: #6a6058;">${event_date}</div>
                </td>
              </tr></table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;"><tr>
                <td bgcolor="#fff8ee" style="background: #fff8ee; border: 2px solid #c8963e; border-radius: 8px; padding: 20px 24px; text-align: center;">
                  <div style="font-family: Georgia, serif; font-size: 17px; color: #1a3a5c; font-weight: 400; margin-bottom: 8px;">Manage Your Event</div>
                  <p style="font-size: 14px; color: #5c3d10; font-weight: 600; margin: 0 0 18px; line-height: 1.6;">Save this email - it's the only way to edit or cancel your event.</p>
                  <table width="100%" cellpadding="0" cellspacing="0"><tr>
                    <td bgcolor="#1e4068" style="background: #1e4068; border-radius: 6px; text-align: center; padding: 14px 20px;">
                      <a href="${edit_link}" style="font-size: 15px; font-weight: 700; color: white; text-decoration: none;">Edit My Event →</a>
                    </td>
                  </tr></table>
                </td>
              </tr></table>

              <p style="font-size: 12px; color: #c8b89a; text-align: center; margin: 0; border-top: 1px solid #ede8e0; padding-top: 16px;">Atlanta IL Community Events</p>
            </div>
          </td></tr></table></td></tr></table></div>
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
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #d8d0c4; padding: 32px 16px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; background:#f5f0e8;"><tr><td>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px 10px 0 0;"><tr>
            <td bgcolor="#1e4068" style="background: linear-gradient(160deg, #1e4068, #0f2035); border-radius: 10px 10px 0 0; padding: 28px 32px; text-align: center; border-bottom: 3px solid #c8963e;">
              <div style="font-family: Georgia, serif; font-size: 20px; color: white; font-weight: 600; text-align: center; margin-bottom: 20px;">Atlanta <span style="color: #e8b86a; font-style: italic; font-weight: 400;">IL</span> Community Events</div>
              <div style="width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(232,184,106,0.45); display: inline-flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(232,184,106,0.85)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div style="font-family: Georgia, serif; font-size: 20px; color: white; font-weight: 400; margin-bottom: 4px;">Someone requested your event address</div>
              <div style="font-size: 13px; color: rgba(255,255,255,0.6);">For: <strong style="color: rgba(255,255,255,0.85);">${event_name}</strong></div>
            </td></tr></table>
            <div style="background: white; border-radius: 0 0 10px 10px; padding: 28px 32px;">

              <p style="font-family: Georgia, serif; font-size: 18px; color: #1a2028; margin: 0 0 6px;">Someone wants your address,</p>
              <p style="font-size: 14px; color: #6a6058; margin: 0 0 28px; line-height: 1.6;">A visitor requested the address for <strong>${event_name}</strong>. Their details are below.</p>

              <div style="border-left: 3px solid #c8963e; padding: 14px 18px; background: #f9f5ef; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a09880; font-weight: 700; margin-bottom: 12px;">Requester Details</div>
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

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;"><tr>
                <td bgcolor="#1e4068" style="background: #1e4068; border-radius: 6px; text-align: center; padding: 14px 20px;">
                  <a href="mailto:${requester_email}?subject=Address for: ${event_name}" style="font-size: 15px; font-weight: 700; color: white; text-decoration: none;">Reply to ${requester_fname} →</a>
                </td>
              </tr></table>

              <p style="font-size: 12px; color: #c8b89a; text-align: center; margin: 0; border-top: 1px solid #ede8e0; padding-top: 16px;">Atlanta IL Community Events</p>
            </div>
          </td></tr></table></td></tr></table></div>
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
