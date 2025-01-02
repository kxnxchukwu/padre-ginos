import { OrderResponseType } from "../../types";

export default async function getPastOrders(
  page: number,
): Promise<OrderResponseType> {
  const response = await fetch(`/api/orders?page=${page}`);
  const data = (await response.json()) as OrderResponseType;
  return data;
}
