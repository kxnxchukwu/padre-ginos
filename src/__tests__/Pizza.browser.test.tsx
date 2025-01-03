import "@vitest/browser/matchers.d.ts";
import { render } from "vitest-browser-react";
import { expect, test, describe } from "vitest";
import Pizza from "../components/Pizza";

describe("Pizza Component Browser Tests", () => {
  test("it should Render Alt Text", async () => {
    const name = "My Favorite Pizza";
    const src = "https://picsum.photos/200";
    const screen = render(
      <Pizza
        name={name}
        toppings={["cheese", "pepperoni", "mushrooms"]}
        image={src}
      />,
    );

    const img = await screen.getByRole("img");

    await expect.element(img).toBeInTheDocument();
    await expect.element(img).toHaveAttribute("src", src);
    await expect.element(img).toHaveAttribute("alt", name);
  });
});
