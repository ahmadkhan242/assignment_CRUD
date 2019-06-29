var express = require('express')
var router = express.Router();
var pg              = require("pg")
const {Pool} = require("pg");


//Connect to database 
const pool = new Pool({
    user: 'ahmad242',
    host: 'localhost',
    database: 'crud',
    password: 'ahmad242',
    port: 5432,
  })


//Getting Home page and fetching all data
router.get('/',function(req,res){
    pool.connect( function(err, client, done) {
        if(err){
            console.log(err)
            }else{
                pool.query("SELECT * FROM crud_api",(err,result) => {
                res.render('main.ejs', { crud: result.rows})
                });
            }
        })
});

//To view particular user 
router.get('/view/:id', (req,res) => {
    pool.connect( function(err, client, done) {
        pool.query("SELECT * FROM crud_api WHERE id = $1",[req.params.id],(err,result) => {
            if(err){
                console.log(err)
                }else{
                    res.render('view', { crud: result.rows})
                }
        });
    })
})


//To add new user Data
router.get('/input', (req,res) => {
    res.render('input')
})

router.post('/input', (req,res) => {
        pool.connect( function(err, client, done) {
            if(err){
                console.log(err)
                }else{
                    client.query("INSERT INTO crud_api (name, roll) VALUES($1, $2) ",[req.body.name,req.body.roll])
                    res.redirect('/')
                }
            })
})



//API to render edit template to edit user data with id 
router.get('/edit/:id/edit', (req,res) => {
    pool.connect( function(err, client, done) {
        if(err){
            console.log(err)
            }else{
                pool.query("SELECT * FROM crud_api WHERE id = $1",[req.params.id],(err,result) => {
                res.render('edit', { crud: result.rows})
            });
        }
    })
})

//API to edit user data with id 
router.post('/edit/:id/edit', (req,res) => {
    pool.connect( function(err, client, done) {
        if(err){
            console.log(err)
            }else{
                 client.query("UPDATE crud_api SET name=$1, roll=$2 WHERE id=$3",[req.body.name,req.body.roll,req.body.id])
                 res.redirect('/')
            }
        })
})

//API to delete user data with id 
router.post('/delete/:id/delete', (req,res) => {
    pool.connect( function(err, client, done) {
        if(err){
        console.log(err)
        }else{
            client.query("DELETE FROM crud_api WHERE id=$1",[req.body.id])
            res.redirect('/')
        } 
})
})

module.exports = router;