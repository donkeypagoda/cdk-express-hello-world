export const template: Function = (imageURL: String): String => {
    const form = `
    <div style='background-image: url(${imageURL}/whoa.png); background-position: center; height: 50%; width: 50%; display: flex'>
        <h1 style='color: white; text-align: center;'>I have come here to kick ass and chew bubblegum</h1>
        <h2 style='color: white; text-align: center; align-self: flex-end;'>And I am all out of bubblegum</h2>
    </div>
    <div style='display:flex;'>
        <form action="" method="post">
        <label for="yourThoughts">Penny for your thoughts?</label>
        <input type="text" name="yourThoughts" id="yourThoughts" required>
        <input type="submit" value="Send 'em!">
        </form>
    </div>
    `;
    return form
}