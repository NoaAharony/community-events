import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM = "Atlanta IL Community Events <noreply@ilcommunityevents.com>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const goldDivider = `<tr><td bgcolor="#c8963e" style="background-color: #c8963e; height: 3px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">&nbsp;</td></tr>`;
const siteTitle = `<p style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; color: #ffffff; font-weight: 600; margin: 0 0 20px; line-height: 1.3; text-align: center;">Atlanta <span style="color: #e8b86a; font-style: italic; font-weight: 400;">IL</span> Community Events</p>`;
const footer = `<p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #a09880; text-align: center; margin: 0; border-top: 1px solid #e8e2d8; padding-top: 16px;">Atlanta IL Community Events</p>`;

function wrapEmail(headerContent: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<style>
  :root { color-scheme: light only; supported-color-schemes: light only; }
  body { margin: 0; padding: 0; background-color: #f4f1ec; }
  table { border-collapse: collapse; }
  a { color: #1a3a5c; }
  @media only screen and (max-width: 600px) {
    .email-outer-td { padding: 16px 8px !important; }
    .email-inner-table { width: 100% !important; }
    .email-header-td { padding: 20px 18px !important; }
    .email-body-td { padding: 20px 18px !important; }
    .email-btn-text { font-size: 14px !important; }
    .email-event-box td { padding: 12px 14px !important; }
    .email-manage-box td { padding: 16px 14px !important; }
    p { font-size: 13px !important; }
  }
</style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f1ec; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f1ec" style="background-color: #f4f1ec;">
  <tr><td align="center" class="email-outer-td" style="padding: 32px 16px;">
    <table class="email-inner-table" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; width: 100%;">
      <tr>
        <td class="email-header-td" bgcolor="#1a3a5c" style="background-color: #1a3a5c; border-radius: 10px 10px 0 0; padding: 28px 32px; text-align: center;">
          ${siteTitle}
          ${headerContent}
        </td>
      </tr>
      ${goldDivider}
      <tr>
        <td class="email-body-td" bgcolor="#ffffff" style="background-color: #ffffff; border-radius: 0 0 10px 10px; padding: 28px 32px;">
          ${bodyContent}
          ${footer}
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type } = body;

    let emailPayload;

    if (type === "submission") {
      const { organizer_name, organizer_email, event_name, event_date, edit_link } = body;

      const headerContent = `
        <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; color: #ffffff; font-weight: 400; margin: 0 0 4px; line-height: 1.3; text-align: center;">Your event was added successfully!</p>
        <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #a8c4e0; margin: 0; line-height: 1.4; text-align: center;">It will appear on the events page shortly</p>`;

      const bodyContent = `
        <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; color: #3a342a; margin: 0 0 6px; line-height: 1.4;">Hi <strong style="color: #3a342a;">${organizer_name}</strong>,</p>
        <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #6b6355; margin: 0 0 28px; line-height: 1.6;">Thank you for adding your event to Atlanta IL Community Events. It will appear on the site shortly.</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
          <tr>
            <td width="4" bgcolor="#c8963e" style="background-color: #c8963e; border-radius: 3px 0 0 3px; font-size: 1px; line-height: 1px;">&nbsp;</td>
            <td bgcolor="#f9f5ef" style="background-color: #f9f5ef; padding: 14px 18px; border-radius: 0 8px 8px 0;">
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a09880; font-weight: 700; margin: 0 0 8px;">Your Event</p>
              <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: 400; color: #1a3a5c; margin: 0 0 4px; line-height: 1.3;">${event_name}</p>
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #6b6355; margin: 0;">${event_date}</p>
            </td>
          </tr>
        </table>
        <table class="email-manage-box" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
          <tr>
            <td bgcolor="#fff8ee" style="background-color: #fff8ee; border: 2px solid #c8963e; border-radius: 8px; padding: 20px 24px; text-align: center;">
              <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 17px; color: #1a3a5c; font-weight: 400; margin: 0 0 8px; line-height: 1.3;">Manage Your Event</p>
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #5c3d10; font-weight: 600; margin: 0 0 18px; line-height: 1.6;">Save this email - it's the only way to edit or cancel your event.</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#1a3a5c" style="background-color: #1a3a5c !important; border-radius: 6px; text-align: center; padding: 0;"><div style="background-color: #1a3a5c !important; border-radius: 6px; padding: 14px 20px;">
                    <a href="${edit_link}" class="email-btn-text" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none; display: inline-block; word-break: break-all;">Edit My Event &rarr;</a></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>`;

      emailPayload = {
        from: FROM,
        to: [organizer_email],
        subject: `Your event "${event_name}" was added`,
        html: wrapEmail(headerContent, bodyContent),
      };
    }

    else if (type === "address_request") {
      const { organizer_email, organizer_name, event_name, event_date, event_time, event_address, requester_fname, requester_lname, requester_email, requester_phone, requester_message } = body;

      const formatDate = (d: string) => {
        if (!d) return "";
        const [y, m, day] = d.split("-");
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return `${months[parseInt(m,10)-1]} ${parseInt(day,10)}, ${y}`;
      };
      const formattedDate = event_date ? formatDate(event_date) : "";

      const isAddressRequest = body.request_type === 'request_address';

      const headerContent = `
        <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; color: #ffffff; font-weight: 400; margin: 0 0 4px; line-height: 1.3; text-align: center;">${isAddressRequest ? 'Someone requested your event address' : 'Someone sent you a message'}</p>
        <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #a8c4e0; margin: 0; line-height: 1.4; text-align: center;">For: <strong style="color: #e8d8b0;">${event_name}</strong></p>`;

      const addressBlock = event_address ? `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
          <tr>
            <td width="4" bgcolor="#c8963e" style="background-color: #c8963e; border-radius: 3px 0 0 3px; font-size: 1px; line-height: 1px;">&nbsp;</td>
            <td bgcolor="#fff8ee" style="background-color: #fff8ee; padding: 14px 18px; border-radius: 0 8px 8px 0;">
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a09880; font-weight: 700; margin: 0 0 8px;">Event Address</p>
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #1a3a5c; font-weight: 700; margin: 0 0 6px;">${event_address}</p>
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #a09880; font-style: italic; margin: 0;">Copy this and paste it into your reply</p>
            </td>
          </tr>
        </table>` : "";

      const messageRow = requester_message ? `
        <tr>
          <td style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #a09880; padding: 5px 0; width: 80px; vertical-align: top;">Message</td>
          <td style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #3a342a; font-style: italic; padding: 5px 0;">"${requester_message}"</td>
        </tr>` : "";

      const replySubject = isAddressRequest
        ? `Address for: ${event_name}${formattedDate ? " - " + formattedDate + (event_time ? ", " + event_time : "") : ""}`
        : `Re: ${event_name}${formattedDate ? " - " + formattedDate : ""}`;
      const replyBody = isAddressRequest
        ? `Hi ${requester_fname},%0A%0AThe address for ${event_name}${formattedDate ? " (" + formattedDate + (event_time ? ", " + event_time : "") + ")" : ""} is:%0A${event_address ? event_address : "[address]"}%0A%0ASee you there!%0A${organizer_name}`
        : `Hi ${requester_fname},%0A%0AThanks for reaching out about ${event_name}${formattedDate ? " (" + formattedDate + ")" : ""}. ${organizer_name}`;

      const bodyContent = `
        <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; color: #3a342a; margin: 0 0 6px; line-height: 1.4;">${isAddressRequest ? 'Someone wants your address' : 'Someone has a question about your event'}</p>
        <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #6b6355; margin: 0 0 20px; line-height: 1.6;">${isAddressRequest ? `A visitor requested the address for <strong style="color: #3a342a;">${event_name}</strong>. Their details are below.` : `A visitor sent a message about <strong style="color: #3a342a;">${event_name}</strong>. Their details are below.`}</p>
        ${isAddressRequest ? addressBlock : ''}
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
          <tr>
            <td width="4" bgcolor="#c8963e" style="background-color: #c8963e; border-radius: 3px 0 0 3px; font-size: 1px; line-height: 1px;">&nbsp;</td>
            <td bgcolor="#f9f5ef" style="background-color: #f9f5ef; padding: 14px 18px; border-radius: 0 8px 8px 0;">
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a09880; font-weight: 700; margin: 0 0 12px;">Requester Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #a09880; padding: 5px 0; width: 80px; vertical-align: top;">Name</td>
                  <td style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #3a342a; font-weight: 600; padding: 5px 0;">${requester_fname} ${requester_lname}</td>
                </tr>
                <tr>
                  <td style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #a09880; padding: 5px 0; vertical-align: top;">Email</td>
                  <td style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #3a342a; padding: 5px 0;"><a href="mailto:${requester_email}" style="color: #1a3a5c; text-decoration: none;">${requester_email}</a></td>
                </tr>
                <tr>
                  <td style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #a09880; padding: 5px 0; vertical-align: top;">Phone</td>
                  <td style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #3a342a; padding: 5px 0;">${requester_phone}</td>
                </tr>
                ${messageRow}
              </table>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
          <tr>
            <td bgcolor="#1a3a5c" style="background-color: #1a3a5c !important; border-radius: 6px; text-align: center; padding: 0;"><div style="background-color: #1a3a5c !important; border-radius: 6px; padding: 14px 20px;">
              <a href="mailto:${requester_email}?subject=${encodeURIComponent(replySubject)}&body=${replyBody}" class="email-btn-text" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none; display: inline-block;">Reply to ${requester_fname} &rarr;</a></div>
            </td>
          </tr>
        </table>`;

      emailPayload = {
        from: FROM,
        to: [organizer_email],
        reply_to: requester_email,
        subject: isAddressRequest ? `Address request for "${event_name}"${formattedDate ? " - " + formattedDate : ""}` : `Someone sent you a message about "${event_name}"${formattedDate ? " - " + formattedDate : ""}`,
        html: wrapEmail(headerContent, bodyContent),
      };
    }

    else {
      return new Response(JSON.stringify({ error: "Unknown email type" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Resend error");

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
