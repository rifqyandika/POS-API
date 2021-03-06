const db = require('../config/db')
const fs = require('fs');

const products = {
   getProduct: (name, sort, type, limit, offset) => {
      return new Promise((resolve, reject) => {
         db.query(`SELECT id_product, product.name, price, image, category.category, date, (SELECT COUNT(*) FROM product) AS count FROM product INNER JOIN category on product.id_category = category.id_category WHERE name LIKE '%${name}%' ORDER BY ${sort} ${type} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
            if (err) {
               reject(new Error(err))
            } else {
               resolve(result)
            }
         })
      })
   },
   addProduct: (data, body, date) => {
      return new Promise((resolve, reject) => {
         db.query(`INSERT INTO product (name, price, image, id_category, date) 
            VALUES ('${data.name}','${data.price}','${body}', '${data.category}', now())`, (err, result) => {
            if (err) {
               reject(new Error(err))
            } else {
               resolve(result)
            }
         })
      })
   },
   editProduct: (data, id) => {
      return new Promise((resolve, reject) => {
         db.query(`SELECT * FROM product WHERE id_product =${id}`, (err, result) => {
            if (err) {
               reject(new Error(err))
            } else {
               resolve(new Promise((resolve, reject) => {
                  let newImg = null
                  if(!data.image){
                     newImg = result[0].image
                  } else {
                     newImg = data.image
                     fs.unlink(`src/file/${result[0].image}`, (err) => {
                        if(err) console.log('gagal');
                        console.log('sukses');
                     })
                  }
                  db.query(`UPDATE product SET name='${data.name}', price='${data.price}', image='${newImg}', id_category='${data.category}' WHERE id_product ='${id}'`, (err, res) => {
                     // console.log(result);
                     if (err) {
                        reject(new Error(err))
                     } else {
                        resolve(res)
                     }
                  })
               }))
            }
         })
      })
   },
   deleteProduct: (id) => {
      return new Promise((resolve, reject) => {
         db.query(`SELECT * FROM product WHERE id_product=${id}`, (err, result) => {
            if (err) {
               reject(new Error(err))
            } else {
               db.query(`DELETE FROM product WHERE id_product=${id}`, (err, resdl) => {
                  const img = result[0].image
                  fs.unlink(`src/file/${img}`, (err) => {
                     if (err) throw err
                     console.log('success');
                  })
                  if (err) {
                     reject(new Error(err))
                  } else {
                     resolve(resdl)
                  }
               })
            }
         })
      })
   },
   detailProduct: (id) => {
      return new Promise((resolve, reject) => {
         db.query(`SELECT id_product, product.name, price, image, category.category, date FROM product INNER JOIN category on product.id_category = category.id_category WHERE id_product=${id}`, (err, result) => {
            if (err) {
               reject(new Error(err))
            } else {
               resolve(result)
            }
         })
      })
   }
}

module.exports = products