export interface PostContactPayload {
  name: string;
  email: string;
  message: string;
}

export default async function postContact({
  name,
  email,
  message,
}: PostContactPayload): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to post contact, please try again later.");
  }
}
