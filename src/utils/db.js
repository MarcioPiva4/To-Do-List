export async function getDB() {
  const response = await fetch(import.meta.env.VITE_URL_API, {
    headers: {
      Authorization: import.meta.env.VITE_TOKEN,
    },
  });

  if (!response.ok) {
    console.error('Erro ao buscar db.json');
    return;
  }

  const data = await response.json();
  const dbJson = atob(data.content); 
  const db = JSON.parse(dbJson);
  return db;
}


export async function getFileSha() {
  const response = await fetch(import.meta.env.VITE_URL_API, {
    headers: {
      Authorization: import.meta.env.VITE_TOKEN, 
    },
  });

  if (!response.ok) {
    console.error('Erro ao buscar SHA do db.json');
    return null;
  }

  const data = await response.json();
  return data.sha;
}
