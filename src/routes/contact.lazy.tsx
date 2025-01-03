import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { FormEvent, ReactElement } from "react";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute(): ReactElement {
  const mutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: function (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;
      return postContact({ name, email, message });
    },
  });

  if (mutation.isError) {
    return (
      <>
        <h2>Something went wrong. Please try again later.</h2>
      </>
    );
  }

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!!!</h3>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <textarea name="message" placeholder="Message" />
          <button role="button" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
