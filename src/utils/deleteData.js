import { getDB, getFileSha } from "./db";

export async function deleteDataById(type, id) {
    const sha = await getFileSha();
  
    if (!sha) {
      console.error('Não foi possível obter o SHA do arquivo');
      return;
    }
  
    const db = await getDB();
  
    if (!db) {
      console.error('Não foi possível obter o conteúdo do db.json');
      return;
    }
  
    if (!db[type]) {
      console.error(`Coleção "${type}" não encontrada no db.json.`);
      return;
    }
  
    const updatedCollection = db[type].filter(item => item.id !== id);
    db[type] = updatedCollection;
  
    const dbJson = JSON.stringify(db);
    const dbBase64 = btoa(dbJson); 
  
    const response = await fetch(import.meta.env.VITE_URL_API, {
      method: 'PUT',
      headers: {
        Authorization: import.meta.env.VITE_TOKEN, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Deletando item com ID ${id} da coleção "${type}"`,
        content: dbBase64,
        sha: sha, 
      }),
    });
  
    if (!response.ok) {
      console.error('Erro ao atualizar db.json');
      return;
    }
  
    const data = await response.json();
    console.log('db.json atualizado no GitHub:', data)
    return false
  }