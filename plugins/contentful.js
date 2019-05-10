const contentful = require('contentful')

const client = contentful.createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_ACCESS_TOKEN,
    environment: process.env.CTF_ENV
})
console.log("client", client)
module.exports = client