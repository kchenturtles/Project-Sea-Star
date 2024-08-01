<script>
	export let data;
</script>

<main>
    <h1>List of </h1>
    <p>Here is a list of transactions:</p>
    <ul>
        {#each data.user.transactions as transaction}
            <li>{transaction}</li>
        {/each} 
    </ul>
    <div> {data.user.username} </div>
    <div> {data.user.credits} </div>
    <form>
        <label for="transaction">Transaction:</label>
        <input type="text" id="transaction" name="transaction">
        <button type="submit">Submit</button>
    </form>
</main>

<style>
    main {
        text-align: center;
    }   

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline;
        margin: 0 10px;
    }

    form {
        margin-top: 20px;
    }   

    input {
        margin-right: 10px;
    }

    button {
        padding: 5px 10px;
    }

</style>