const mongoose = require("mongoose");
const slugify = require("slugify");

const tourScehma = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true,
        minlength: [5, "tour name must be greater than 5 char"],
        maxlength: [20, "tour name must be less than 20 char"]
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"],
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty"],
        trim: true,
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'difficulty is either easy, medium and difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"],
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have price"],
    },
    priceDiscount: {
        type: Number,
        // required: [true, "A tour must have price"],
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"],
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

tourScehma.virtual('durationsWeek').get(function () {
    return this.duration / 7
})

// DOCUMENT MIDDLEWARE: Runs before create() and save()

tourScehma.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

// tourScehma.pre('save', function (next) {
//     console.log('will save document....');
//     next()
// })

// tourScehma.post('save', function (doc, next) {
//     console.log(doc)
//     next();
// })

// QUERY MIDDLEWARE

// tourScehma.pre('find', function (next) {
tourScehma.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now();
    next();
})

tourScehma.post(/^find/, function (docs, next) {
    console.log(`Query time ${Date.now() - this.start} millisecond`)
    // console.log(docs)
    next();
})

//AGGREGATION MIDDLEWARE
tourScehma.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    next();
})

const Tour = mongoose.model('Tour', tourScehma);
module.exports = Tour;