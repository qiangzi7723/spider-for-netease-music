const query=require('./mysql');
query('select * from singer where singer=1', [], (err, res) => {
    console.log(err,res);
})
