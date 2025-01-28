import { getDB } from "./db";

export async function generateNewId(type) {
    const db = await getDB();
    const maxId = db[type].reduce((max, user) => Math.max(max, Number(user.id)), 0); 
    return maxId + 1;
}