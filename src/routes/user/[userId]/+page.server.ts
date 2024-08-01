export async function load(event) {
    const result = await event.fetch(`transaction`);
    const user = await result.json();

    return { user };
}

export const actions = {
    default: async (event) => {
        const result = await event.fetch(`transaction`, {method: 'POST', body: JSON.stringify({amount: 100, comment: "Test"})});
        const user = await result.json();

        return { user };
    }
}