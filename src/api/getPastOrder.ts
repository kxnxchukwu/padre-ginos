import { GetSingleOrderResponse } from "../../types";

export default async function getPastOrder(
  orderNumber: string,
): Promise<GetSingleOrderResponse> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/api/past-order/${orderNumber}`);
  const data = (await response.json()) as GetSingleOrderResponse;
  return data;
}
