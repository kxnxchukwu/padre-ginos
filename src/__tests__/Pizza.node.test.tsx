import { render, cleanup } from "@testing-library/react";
import { expect, describe, it, afterEach } from "vitest";
import Pizza, { DEFAULT_IMG_SRC, PizzaProps } from "../components/Pizza";

const PROPS: PizzaProps = {
  name: "My Favorite Pizza",
  toppings: ["cheese", "pepperoni", "mushrooms"],
  image: "https://picsum.photos/200/300",
};

describe("Pizza Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render", () => {
    const { getByText } = render(<Pizza {...PROPS} />);
    expect(getByText("My Favorite Pizza")).toBeTruthy();
  });

  it("should render the name", () => {
    const { getByText } = render(<Pizza {...PROPS} />);
    expect(getByText(PROPS.name)).toBeTruthy();
  });

  it("should render the image, with alt text", () => {
    const { getByAltText, getByRole } = render(<Pizza {...PROPS} />);
    const image = getByRole("img") as HTMLImageElement;
    expect(getByAltText(PROPS.name)).toBeTruthy();
    expect(image.src).toBe(PROPS.image);
    expect(image.alt).toBe(PROPS.name);
  });

  it("should render default image if no image is provided", () => {
    const { getByRole } = render(<Pizza {...PROPS} image="" />);
    const image = getByRole("img") as HTMLImageElement;
    expect(image.src).not.toBe("");
    expect(image.src).toBe(DEFAULT_IMG_SRC);
  });
});
