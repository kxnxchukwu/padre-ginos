import { render, cleanup } from "@testing-library/react";
import { expect, describe, it, vi, afterEach } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";
import { ReactElement } from "react";

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const ComponentInTheRealWorld = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>
  );
};

describe("Contact Component Route", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render", async () => {
    const { findByText } = render(<ComponentInTheRealWorld />);
    expect(await findByText("Contact")).toBeTruthy();
  });

  it("should submit form", async () => {
    fetchMocker.mockResponse(JSON.stringify({ success: "ok" }));
    const { getByPlaceholderText, getByRole, findByRole } = render(
      <ComponentInTheRealWorld />,
    );

    const testData = {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hello, I would like to order a pizza.",
    };

    const nameInput = getByPlaceholderText("Name") as HTMLInputElement;
    const emailInput = getByPlaceholderText("Email") as HTMLInputElement;
    const messageInput = getByPlaceholderText("Message") as HTMLTextAreaElement;

    nameInput.value = testData.name;
    emailInput.value = testData.email;
    messageInput.value = testData.message;

    const btn = getByRole("button") as HTMLButtonElement;
    btn.click();

    const h3 = await findByRole("heading", { level: 3 });

    expect(h3.innerText).toContain("Submitted");

    const requests = fetchMocker.requests();
    expect(requests.length).toBe(1);
    expect(requests[0].url).toBe("/api/contact");
    expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });
  });
});
