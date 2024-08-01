import { SvelteKitAuth } from "@auth/sveltekit";
import slack from "@auth/sveltekit/providers/slack";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [slack],
});