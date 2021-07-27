import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const urlShortenerSchema = new Schema({
    normalUrl: String,
    shortenedUrl: {
        type: String,
        unique: true,
    },
})

const urlShortener = mongoose.model("urlShortener", urlShortenerSchema);

export default urlShortener;