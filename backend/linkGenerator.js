import urlSchema from './db/urlSchema.js';

const linkGenerator = () => {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const Link = alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)] + alphabet[Math.floor(Math.random() * 51)]
    return Link;
}

const generateLink = async () => {
    let link = linkGenerator();
    let newLink;

    try {
        const urlSchemaFind = await urlSchema.findOne({ shortenedUrl: link });
        if (urlSchemaFind == null) {
            newLink = link;
        } else if (urlSchemaFind !== null) {
            while (urlSchemaFind !== null) {
                newLink = linkGenerator();
            }
        }
    } catch (err) {
        console.log(err)
    }

    return newLink;
}

export default generateLink;