export const responseTemplate: Function = (imageURL: String, data: String): String => {
    const response = `
    <div style='background-image: url(${imageURL}/whoa.png); background-position: center; height: 50%; width: 50%; display: flex'>
        <h1 style='color: white; text-align: center;'>I have come here to kick ass and chew bubblegum</h1>
        <h2 style='color: white; text-align: center; align-self: flex-end;'>And I am all out of bubblegum</h2>
    </div>
    <div style='display:flex;'>
        <h3 style='text-align: center;'>You said ${data}? Really? Well... Okaaay</h3>
    </div>
    `;
    return response
}