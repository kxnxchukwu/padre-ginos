import { GetSingleOrderResponse } from "../../types";

export default async function getPastOrder(
  orderNumber: string,
): Promise<GetSingleOrderResponse> {
  const response = await fetch(`/api/past-order/${orderNumber}`);
  const data = (await response.json()) as GetSingleOrderResponse;
  return data;
}
