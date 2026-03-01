export async function getCityImageUrl(name) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      name,
    )}&gsrlimit=1&prop=pageimages&pithumbsize=400&format=json&origin=*`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response failed!");
    }

    const data = await response.json();

    if (!data.query || !data.query.pages) {
      console.log("Umm didn't get any data" + data);
      return null;
    }
    const pages = Object.values(data.query.pages);
    const firstPage = pages[0];

    if (!firstPage?.thumbnail?.source) {
      console.log("missing source: " + data);
    }
    return firstPage?.thumbnail?.source || null;
  } catch (error) {
    console.error("Image Fetching failed!" + error);
    return null;
  }
}
