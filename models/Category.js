const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        unique: [true, 'Category must be unique'],
        millength: [3, 'Too short category name'],
        maxlength: [32, 'Too long category name']
    },
    // A and B => a-and-b
    slug: {
        type: String,
        lowercase: true,
    },
    image:String,
}, { timestamps: true }
);

const setImageURL = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
}
// findOne , findAll , upadate
categorySchema.post('init', (doc) => {
    setImageURL(doc);
});

// Create 
categorySchema.post('save', (doc) => {
    setImageURL(doc);
});

module.exports = mongoose.model('Category', categorySchema);