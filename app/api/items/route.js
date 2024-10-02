export async function GET(request) {
  const items = [
    { name: "aaaaa", id: 12, price: 200 },
    { name: "bbbbb", id: 23, price: 120 },
    { name: "ccccc", id: 34, price: 100 },
    { name: "ababa", id: 46, price: 20 },
    { name: "babab", id: 57, price: 110 },
    { name: "cacac", id: 86, price: 500 },
  ];

  return new Response(JSON.stringify(items));
}
