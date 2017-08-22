const query=require('../mysql');
query('select max(singer) from song_copy',[],(err,res,rs)=>{
    console.log(res[0]['max(singer)']);
})