const {pool}=require('./DB_connection')

const createCategory = (req, res) => {
  const { name, isactive, description } = req.body;

  pool.query(
    "INSERT INTO category (name,isactive,description) VALUES ($1,$2,$3) RETURNING * ",
    [name, isactive, description],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json({
        msg: "Category created successfully",
        data: result.rows[0],
      });
    }
  );
};


const getCategorys = (req,res) => {
    pool.query('SELECT * FROM category', (err,result) =>{
        if(err){
            throw err
        }
        res.json({
            data : result.rows
        })
    })
}

const updateCategory = (req,res) => {
    
    let id = parseInt(req.params.id)
    const { name,status,description }  = req.body
    pool.query(`UPDATE category  SET name='${name}', isactive=${status}, description='${description}' WHERE id=${id}`, (err,result) => {
        if(err){
            throw err
        }
    })
}

const deleteCategory = (req,res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM product', (err,result) =>{
        if(err){
            throw err
        }
        cat = result.rows
        let category = []
        cat.map((d)=>{
        category=d.prodcat
        // console.log(d,category,id)
        console.log(category.length)
        if(category.length===1){
            console.log(category[0])

            if(category[0]===id){
                console.log(`DELETE FROM product WHERE id=${d.id}`)
                pool.query(`DELETE FROM product WHERE id=${d.id}`, (err,result) => {
                    if(err){
                        throw err
                    }
                    
                })
            }
            
        }
        else if(category.length>0){
            if(category.includes(id)){
                let filteredProdCat='{"'
                if (!(category[0]===id))
                {
                    
                
                    filteredProdCat+=category[0]
                    for(let i=1;i<category.length;i++){
                        if(!(category[i]===id)){
                        filteredProdCat+='","'
                        filteredProdCat+=category[i]
                        }
                    }
                    filteredProdCat+='"}'
                }
                else{
                    if(category.length===2){
                        filteredProdCat=`{"${category[1]}"}`
                    }
                    else{
                        filteredProdCat+=category[1]
                        for(let i=2;i<category.length;i++){
                            if(!(category[i]===id)){
                            filteredProdCat+='","'
                            filteredProdCat+=category[i]
                            }
                        }
                        filteredProdCat+='"}'
                    }
                }
                pool.query(`UPDATE product SET ProdCat='${filteredProdCat}' WHERE id=${d.id}`, (err,result) => {
                    if(err){
                        throw err
                    }
                })
                }
                
            }  
            
        })
        pool.query(`DELETE FROM category WHERE id=${id}`, (err,result) => {
            if(err){
                throw err
            }
            res.json({
                msg: `Category Deleted successfuly`
            })
        })
    })


    
}

module.exports = {
    createCategory, getCategorys ,updateCategory, deleteCategory
}
