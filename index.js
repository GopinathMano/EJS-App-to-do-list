const express = require("express");

const app = express();
app.set("view engine", "ejs");
const port = 3000;
let items = ["Eat", "Sleep", "code", "Repeat"];
let workList = [];

// parse req body to json format:
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// day items
app.get("/", (req, res, next) => {
  var options = { weekday: "long", month: "long", day: "numeric" };
  var today = new Date();
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, additem: items });
  res.send();
});

app.post("/", (req, res) => {
  let item = req.body.newitem;
 if(req.body.list =="working"){
    workList.push(item);
    res.redirect("/work");
 }else{
    items.push(item);
    res.redirect("/");
 }
 
  
});

// work item
app.get("/work",(req,res)=>{
    var day = "working List"
    res.render("list", { listTitle: day, additem: workList });
    res.send();
})

app.listen(port, () => {
  console.log("server is running");
});
