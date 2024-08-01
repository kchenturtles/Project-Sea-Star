<h1>One Project in a Sea of Stars</h1>
<p>This is supposed to be a navbar if you can't tell (and I wouldn't blame you if you couldn't)</p>
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/user">Users</a></li>
        <li><a href="/transaction">Transactions</a></li>
    </ul>
</nav>

<slot></slot>

<style>
    nav {
        background-color: #333;
        color: white;
        padding: 1rem;
    }

    nav ul {
        display: flex;
        justify-content: space-around;
        list-style-type: none;
    }

    nav a {
        color: white;
        text-decoration: none;
    }
</style>