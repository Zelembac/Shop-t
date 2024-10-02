export async function DataFetch() {
  const res = await fetch("http://localhost:3000/api/items");
  const items = await res.json();

  return items;
}
