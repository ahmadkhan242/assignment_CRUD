var express          = require('express')
var router           = express.Router();
var pg               = require("pg")
const {Pool}         = require("pg");


//Connect to database 
const pool = new Pool({
    user: 'ahmad242',
    host: 'localhost',
    database: 'crud',
    password: 'ahmad242',
    port: 5432,
  })




// Adding dummy data to database 
function data(){
var names = ["Rakesh", "Anant","Ahmad","Zeshaan","Lakshay"]
var rolls = [1,2,3,4,5]
pool.connect( (err, client) => {
for(var i=0;i<names.length;i++){
        client.query("INSERT INTO crud_api (name, roll) VALUES($1, $2) ",[names[i],rolls[i]])
        console.log(`Name ${names[i]} and roll ${rolls[i]} added to database `)        
    }
})
}
data()

//Getting Home page and fetching all data
router.get('/',(req,res) =>{
    pool.connect( (err, client) => {
        if(err){
            console.log(err)
        }else{
            client.query("SELECT * FROM crud_api")
            .then((result)=>{
                res.render('main.ejs', { crud: result.rows})
                })
            .catch(err)
        }
    })
});


//To view particular user 
router.get('/view/:id', (req,res) => {
    pool.connect( (err, client) => {
        client.query("SELECT * FROM crud_api WHERE id = $1",[req.params.id])
        .then((result)=>{
            res.render('view', { crud: result.rows})
        })
        .catch(err)
    })
})


//To add new user Data
router.get('/input', (req,res) => {
    res.render('input')
})

router.post('/input', (req,res) => {
    pool.connect( (err, client) => {
        client.query("INSERT INTO crud_api (name, roll) VALUES($1, $2) ",[req.body.name,req.body.roll])
        .then(res.redirect('/'))
        .catch(err)
    })
})



//API to render edit template to edit user data with id 
router.get('/edit/:id/edit', (req,res) => {
    pool.connect( (err, client)=> {
        pool.query("SELECT * FROM crud_api WHERE id = $1",[req.params.id])
        .then((result)=>{
            res.render('edit', { crud: result.rows})
        } )
        .catch(err)
    })
})


//API to edit user data with id 
router.post('/edit/:id/edit', (req,res) => {
    pool.connect( (err, client)=> {
        client.query("UPDATE crud_api SET name=$1, roll=$2 WHERE id=$3",[req.body.name,req.body.number,req.params.id])
        .then(res.redirect('/view/'+ req.params.id))
        .catch(err)
    })
})


//API to delete user data with id 
router.post('/delete/:id', (req,res) => {
    pool.connect( (err, client)=> {
        client.query("DELETE FROM crud_api WHERE id=$1",[req.params.id])
        .then(res.redirect('/')).catch(err)
    })
})

module.exports = router;