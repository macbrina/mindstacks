"use server";

export async function subscribeEmail(formData) {
  const errors = {};

  const email = formData.get("email");

  if (!email || email.trim() === "") {
    errors.email = "Email is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/email-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      return { error: result.error || "Error sending mail" };
    }

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      throw new Error(result.error || "Unknown error");
    }
  } catch (error) {
    return { error: error.message || "Error sending mail" };
  }
}
