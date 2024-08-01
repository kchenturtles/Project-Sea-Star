import { GET } from "./+server";

export async function load() {
    const result = await GET();
    const users = await result.json();

    return { users };
}