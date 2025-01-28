import { getDB, getFileSha } from "./db";

export async function editDataInDB(id, updatedData, type) {
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

    const itemId = Number(id);
    const itemIndex = db[type].findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
        console.error(`Item com id ${itemId} não encontrado no tipo ${type}`);
        return;
    }

    db[type][itemIndex] = { ...db[type][itemIndex], ...updatedData };

    const dbJson = JSON.stringify(db);
    const dbBase64 = btoa(dbJson);

    const response = await fetch(process.env.URL_API, {
      method: 'PUT',
      headers: {
        Authorization: process.env.TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Editando item com id ${id} no db.json`,
        content: dbBase64,
        sha: sha,
      }),
    });

    if (!response.ok) {
      console.error('Erro ao atualizar db.json');
      return false;
    }

    const data = await response.json();
    return true;
}
