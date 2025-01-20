const { json } = require("body-parser");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(json());

let MemoDB = [];
let id = 1;
app.post("/addpost",(req,res)=>{
   const {name,gift} = req.body;
   const newPerson = {id:id++, name,gift}
   MemoDB.push(newPerson)

   return res.status(201).send({message:"New person added", newPerson})
})

app.get("/peopleandgifts",(req,res)=>{
    return res.send({People: MemoDB})
})

app.get("/peopleandgifts/:id",(req,res)=>{
    const id = req.params.id;
    const selectedItem = MemoDB.find(item=> item.id===Number(id));
    console.log(selectedItem)
    console.log(MemoDB)
    return res.status(200).send({Eachperson:selectedItem})
  /*  if(selectedItem){
    return res.status(200).send({ChosenItem:selectedItem})
   }else{
    return res.status(404).send("Error")
   } */
})

/* Update */
app.put("/updatepeopleandgifts/:id",(req,res)=>{
    const id = req.params.id;
    const personToUpdate = MemoDB.find(person=> person.id === Number(id));
    if(!personToUpdate){
        return res.status(404).send({Message:"Not found the person"})
    }
    const {name,gift} = req.body;
    personToUpdate.name = name;
    personToUpdate.gift = gift;

    return res.status(200).send({Message:"Successfully Updated"})
})

/* Delete */
app.delete("/peopleandgiftsdelete/:id",(req,res)=>{
    const {id} = req.params;
    const indexOfdeletepost = MemoDB.findIndex(person=> person.id=== Number(id));
    if(indexOfdeletepost<0){
       return res.status(404).send({Message:"Error occured"})
    }
    MemoDB.splice(indexOfdeletepost,1)

    res.status(200).send({Message: "Person deleted"})
})

app.listen(PORT,(respond)=>{
    console.log("Express server has been established.")
})