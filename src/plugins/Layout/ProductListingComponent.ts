export const ProductListingsComponent = (editor, commonTraits) => {

    const products = '[{"title":"Apple MacBook Air 13","image_url":"https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/air/macbook-air-select-201706?wid=452&hei=420&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1496085621130","description":"lorem ipsum dolor simit","a_price":123,"location":"Vadodara","discount":25,"d_price":90},{"title":"Lenovo Y50","image_url":"https://rukminim1.flixcart.com/image/832/832/j1mggi80/computer/e/j/f/lenovo-2-in-1-laptop-original-imaezzztyq6zadhj.jpeg?q=70","description":"lorem ipsum dolor simit","a_price":456,"location":"Ahmedabad","discount":5,"d_price":400},{"title":"Acer Aspire R11 Pentium Quad Core ","image_url":"https://rukminim1.flixcart.com/image/832/832/computer/x/f/m/acer-aspire-2-in-1-laptop-original-imaemgnwxcdzxhhq.jpeg?q=70","description":"lorem ipsum dolor simit","a_price":741,"location":"Rajkot","discount":25,"d_price":650},{"title":"HP Core i5 7th Gen","image_url":"https://rukminim1.flixcart.com/image/832/832/computer/x/5/x/hp-pavilion-2-in-1-laptop-original-imaerafa8dyevs4g.jpeg?q=70","description":"lorem ipsum dolor simit","a_price":987,"location":"Surat","discount":25,"d_price":210}]'
    const eachProduct = JSON.parse(products);
    let allProducts = "";

    for (let i in eachProduct) {
        allProducts += '<figure class="product-card"><img class="product-card-img" src="' + eachProduct[i].image_url + '"/> <figcaption> <h5 class="product-card-title">' + eachProduct[i].title + '</h5> <p>' + eachProduct[i].description + '</p><p class="product-card-address"> <i class="fa fa-map-marker"></i>' + eachProduct[i].location + ' </p><div class="product-card-price"> <span class="price-savings">Save ' + eachProduct[i].discount + '%</span> <s class="original-price">$' + eachProduct[i].a_price + '</s> <p class="amount-price"> <span class="from">starting at</span> $' + eachProduct[i].d_price + '<span class="from">/night</span> </p></div></figcaption></figure>'
    }

    editor.BlockManager.add('productListing', {
        label: 'ProductListing',
        content: '<style type="text/css">.product-card{max-width:23%;font-size:12px;margin:5px;box-shadow:2px 2px 15px #999;display:inline-block;box-shadow: 2px 2px 15px #999;}.product-card>a{background:#f2f2f2;color:#333;transition:all .1s;position:relative;display:block;z-index:0;padding-bottom:5px;text-decoration:none}.product-card>a:hover{text-decoration:none;box-shadow:0 1px 3px rgba(0,0,0,.3)}.product-card .product-card-img{display:block;height:250px;width:100%}.product-card figcaption{display:block;padding:0 10px}.product-card .product-card-address{color:#888;line-height:1.2}.product-card .product-card-address i{font-size:14px;margin-right:2px;line-height:1.2}.product-card .product-card-price{display:block;text-align:right}.product-card .product-card-price .original-price,.product-card .product-card-price .price-savings{line-height:22px;display:inline-block;vertical-align:middle}.product-card .product-card-price .price-savings{float:left;color:#82b548}.product-card .product-card-price .original-price{color:#aaa;font-size:14px}.product-card .product-card-price .amount-price{text-align:right;font-size:20px;color:#82b548}.product-card .product-card-price .from{font-size:12px}</style>' + allProducts,
        attributes: {
            class: 'fa fa-user',
            title: 'Product Block'
        },
        category: 'Product components'
    });
}