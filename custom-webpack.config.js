const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        product_api: JSON.stringify(process.env.PRODUCT_API),
        order_api: JSON.stringify(process.env.ORDER_API),
        payment_api: JSON.stringify(process.env.PAYMENT_API),
        customer_api: JSON.stringify(process.env.CUSTOMER_API)
      }
    })
  ]
};