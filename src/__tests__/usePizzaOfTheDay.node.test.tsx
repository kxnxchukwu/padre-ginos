import createFetchMocker from "vitest-fetch-mock";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, vi, it } from "vitest";
import usePizzaOfTheDay from "../hooks/usePizzaOfTheDay";
import { PizzaType } from "../../types";

const fetchMocker = createFetchMocker(vi);
fetchMocker.enableMocks();

const samplePizza: PizzaType = {
  id: "1",
  name: "Pizza of the Day",
  description: "cheese, pepperoni, mushrooms",
  sizes: { S: 10.15, M: 12.25, L: 14.5 },
  image: "https://picsum.photos/200/300",
  category: "Meat",
};

describe("usePizzaOfTheDay Hook", () => {
  afterEach(() => {
    cleanup();
  });

  it("starts with null", () => {
    fetchMocker.mockResponseOnce(JSON.stringify(samplePizza));
    const { result } = renderHook(() => usePizzaOfTheDay());
    expect(result.current).toBeNull();
  });

  it("should return the pizza of the day", async () => {
    fetchMocker.mockResponse(JSON.stringify(samplePizza));
    const { result } = renderHook(() => usePizzaOfTheDay());
    await waitFor(() => expect(result.current).toEqual(samplePizza));
    expect(fetchMocker).toHaveBeenCalledWith("/api/pizza-of-the-day");
  });

  it("should return null if there is an error", async () => {
    fetchMocker.mockResponse(JSON.stringify({ error: "not found" }));
    const { result } = renderHook(() => usePizzaOfTheDay());
    await waitFor(() => expect(result.current).toBeNull());
  });
});
