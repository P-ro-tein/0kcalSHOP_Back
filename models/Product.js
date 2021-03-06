const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    productID: { // 동일한 title을 가진 상품을 내부적으로 구별하기 위해 ID 사용 추가
        type:String,
    }, 
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    deleted: { // 상품 삭제시, 실제로 DB에서 삭제하는 것이 아닌 보이지않게만 해야 하므로 해당 상품을 관리자가 삭제했는지 표시
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
})


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }