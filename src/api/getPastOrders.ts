import { OrderResponseType } from "../../types";

export default async function getPastOrders(
  page: number,
): Promise<OrderResponseType> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/api/orders?page=${page}`);
  const data = (await response.json()) as OrderResponseType;
  return data;
}
