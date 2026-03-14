const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('Connection Open!')
    })
    .catch(err => {
        console.log('Oh No Error')
        console.log(err)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        min: [0, 'Price Must Be Positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

// productSchema.methods.greet = function () {
//     console.log("HELLOW")
//     console.log(`- from ${this.name}`)
// }

// on instance method
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale
    return this.save()
}

// on instance method
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat)
    return this.save() // so that behaves like promise
}

// on model method
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

// model name: Product
// collection name in mongoDB: products
// it automatically lowercases Product to product
// pluralizes it to products
const Product = mongoose.model('Product', productSchema) // it will be automatically toLowerCase 'product'

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Bike Helmet' })
    console.log(foundProduct)
    await foundProduct.toggleOnSale()
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}

Product.fireSale().then(res => console.log(res))

// findProduct()


// const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cycling'], size:'XS' })
// bike.save()
//     .then(data => {
//         console.log("IT WORKED")
//         console.log(data )
//     })
//     .catch(err => {
//         console.log("OH NO ERROR")
//         console.log(err)
//     })

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 9 }, { returnDocument: 'after', runValidators: true })
//     .then(data => {
//         console.log("IT WORKED")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("OH NO ERROR")
//         console.log(err)
//     })

