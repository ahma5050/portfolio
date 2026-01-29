import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Send notification email to Ahmed
    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["tekisha5050@gmail.com"],
        subject: `New Contact: ${subject}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); color: #f5f5f5; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d4af37; margin: 0; font-size: 28px;">New Portfolio Contact</h1>
              <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #d4af37, #f5d17a); margin: 15px auto;"></div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
              <p style="margin: 0 0 15px 0;"><strong style="color: #d4af37;">From:</strong> ${name}</p>
              <p style="margin: 0 0 15px 0;"><strong style="color: #d4af37;">Email:</strong> <a href="mailto:${email}" style="color: #00ffff;">${email}</a></p>
              <p style="margin: 0 0 15px 0;"><strong style="color: #d4af37;">Subject:</strong> ${subject}</p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
                <p style="margin: 0 0 10px 0;"><strong style="color: #d4af37;">Message:</strong></p>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #888;">
              Sent from your portfolio website
            </p>
          </div>
        `,
      }),
    });

    if (!notificationResponse.ok) {
      const error = await notificationResponse.text();
      console.error("Failed to send notification email:", error);
      throw new Error(`Failed to send notification email: ${error}`);
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the sender
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Ahmed Omer <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for reaching out!",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); color: #f5f5f5; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
              <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #d4af37, #f5d17a); margin: 15px auto;"></div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
              <p style="margin: 0 0 20px 0; line-height: 1.6;">
                I've received your message and will get back to you as soon as possible.
              </p>
              <p style="margin: 0 0 20px 0; line-height: 1.6;">
                In the meantime, feel free to check out my latest projects on my portfolio or connect with me on LinkedIn.
              </p>
              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
                <p style="margin: 0; font-size: 14px; color: #888;">Your message:</p>
                <p style="margin: 10px 0 0 0; font-style: italic; color: #ccc;">"${message}"</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="margin: 0; color: #d4af37;">Best regards,</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">Ahmed Omer</p>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #888;">Senior Software Engineer</p>
            </div>
          </div>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      console.error("Failed to send confirmation email, but notification was sent");
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
