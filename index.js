import express from  "express";

const app = express();
const port = 3000;

let blogTitle = [];
let blogBody = [];
let blogDate = [];

let updateRecordIndex;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) =>{
    res.render("index.ejs");
});
app.get("/create", (req,res) =>{
    res.render("create_blog.ejs");
});
app.get("/view", (req,res) =>{
    if (blogDate.length < 1) {
         res.render("view_blog.ejs")   
    } else {
        res.render("view_blog.ejs",{
            bDate: blogDate,
            bTitle: blogTitle,
            bBody: blogBody,
        });  
    }
    
});
app.get("/update", (req,res) =>{
    
    if (blogDate.length < 1) {
        res.render("update_blog.ejs")
    }else{
        res.render("update_blog.ejs",{
            bDate: blogDate,
            bTitle: blogTitle,
            bBody: blogBody,
        }); 
    }
})
/*app.get("/updateForm"){
    res.render("update_blog_form.ejs");
}*/
app.get("/delete", (req,res) =>{
    if (blogDate.length < 1) {
        res.render("delete_blog.ejs");    
    } else {
        res.render("delete_blog.ejs",{
        
            bDate: blogDate,
            bTitle: blogTitle,
            bBody: blogBody,
        });  
    }
    
});
app.post("/submit", (req,res) =>{
    blogTitle[blogTitle.length] = req.body.blog_title;
    blogBody[blogBody.length] = req.body.blog_body;
    blogDate[blogDate.length] = req.body.blog_date;
    console.log(`blog ${blogTitle[blogTitle.length-1]} have saved successfully`);
    res.redirect("/create");
});

app.post("/delete",(req,res) =>{
    blogDate.splice(Number(req.body.index),1);//splice method is used to remove array elements takes index,no. of elements
    blogTitle.splice(Number(req.body.index),1);//number method is used to convert string to number
    blogBody.splice(Number(req.body.index),1);
    console.log(`blog at [${+req.body.index}] deleted`);
    res.redirect('/delete');
});
app.post("/updateLogic",(req,res) =>{
    updateRecordIndex = req.body.index
    res.render("update_blog_form.ejs",{
        bDate: blogDate[updateRecordIndex],
        bTitle: blogTitle[updateRecordIndex],
        bBody: blogBody[updateRecordIndex],
    }); 
});
app.post("/updateBlog",(req,res) =>{
    blogTitle[updateRecordIndex] = req.body.blog_title;
    blogBody[updateRecordIndex] = req.body.blog_body;
    blogDate[updateRecordIndex] = req.body.blog_date;
    console.log(`blog ${blogTitle[blogTitle.length-1]} have been updated successfully`);
    res.redirect("/");
});
app.listen(port, ()=> {
    console.log(`listening on the port ${port}`);
});
