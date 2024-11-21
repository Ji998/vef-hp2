export async function fetcher(url) {
  console.log('Fetching:', url); // 打印加载的 URL
  const response = await fetch(url);

  if (!response.ok) {
    console.error('Failed to fetch:', url, response.status);
    throw new Error(`Failed to load ${url}, status: ${response.status}`);
  }

  const json = await response.json();
  console.log('Loaded JSON:', json);
  return json;
}
