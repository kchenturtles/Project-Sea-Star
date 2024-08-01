<script>
	export let data;
    console.log
</script>

<main>
    <h1>List of Users</h1>
    <p>Here is a list of users:</p>
    <ul>
        {#each data.users as user}
            <li><a href={`user/${user.id}`}>{user.username}</a></li>
        {/each} 
    </ul>
</main>