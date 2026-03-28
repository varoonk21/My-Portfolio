export default async function GetVideo(type, folderId) {
  const API_KEY = process.env.DRIVE_API_KEY;

  console.log(API_KEY);
  console.log(folderId);
  const URL = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,thumbnailLink,webViewLink)&key=${API_KEY}`;

  const response = await fetch(URL);
  console.log(response);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.error?.message || `Failed to fetch ${type}`);
  }
  console.log(json);
  return (json.files || []).map((file) => ({
    id: { videoId: file.id },
    snippet: { title: file.name },
    type,
  }));
}
