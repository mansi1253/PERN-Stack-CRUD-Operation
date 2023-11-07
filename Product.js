
const {pool}=require('./DB_connection')

const createProduct = (req, res) => {
  const { prodName, isactive, cost, ProdCat,description } = req.body;


    let filteredProdCat='{"'
    if(ProdCat.length===1){
        filteredProdCat=`{"${ProdCat[0]}"}`
    }
    else{
        filteredProdCat+=ProdCat[0]
        for(let i=1;i<ProdCat.length;i++){
            filteredProdCat+='","'
            filteredProdCat+=ProdCat[i]
        }
        filteredProdCat+='"}'
    }

  
    pool.query(
    `INSERT INTO product (prodName,isactive,description, cost, ProdCat) VALUES ($1,$2,$3,$4,'${filteredProdCat}') RETURNING * `,
    [prodName, isactive, description, cost],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json({
        msg: "Product created succeffully",
        data: result.rows[0],
      });
    }
  );
};


const getproduct = (req,res) => {
    pool.query('SELECT * FROM product', (err,result) =>{
        if(err){
            throw err
        }
        res.json({
            data : result.rows
        })
    })
} 

const updateproduct = (req,res) => {
    
    let id = parseInt(req.params.id)
    const { name,status,cost,categories,description }  = req.body

    let filteredProdCat='{"'
    if(categories.length===1){
        filteredProdCat=`{"${categories[0]}"}`
    }
    else{
        filteredProdCat+=categories[0]
        for(let i=1;i<categories.length;i++){
            filteredProdCat+='","'
            filteredProdCat+=categories[i]
        }
        filteredProdCat+='"}'
    }


    pool.query(`UPDATE product  SET prodName='${name}', isactive=${status}, cost='${cost}',ProdCat='${filteredProdCat}', description='${description}' WHERE id=${id}`, (err,result) => {
        if(err){
            throw err
        }
    })
}

const deleteproduct = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query(`DELETE FROM product WHERE id=${id}`, (err,result) => {
        if(err){
            throw err
        }
        res.json({
            msg: `product Deleted successfuly`
        })
    })
}

module.exports = {
    createProduct, getproduct ,updateproduct, deleteproduct
}
