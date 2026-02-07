export async function onRequestPost(context) {
  const formData = await context.request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone") || "Not provided";
  const message = formData.get("message");

  const body = `
New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
  `.trim();

  await context.env.SEND_EMAIL.send({
    from: "no-reply@yourdomain.com",
    to: "you@yourdomain.com",
    subject: "New Contact Form Submission",
    text: body
  });

  return Response.redirect("/thank-you", 302);
}
