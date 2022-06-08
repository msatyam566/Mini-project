const mongoose= require("mongoose")
const bookModel = require("../Models/bookModel")
const userModel = require("../Models/userModel")

//=============validations=================//

const isValidObjectId= function(objectId){
    return mongoose.Types.objectId.isValid(ObjectId)
}

//=========================createBook================//

const bookCreate = async function(req,res){
    try{
        let requestBody = req.body;
        const {title,userId,category} = requestBody

        if(Object.entries(requestBody).length == 0){
            return res.status(400).send({status : false, msg: "please provide some data "})
        }

        if(!title)
        return res.status(400).send({status:false, msg: "Title is required"})

        let trimname = title.trim()
        if(!(/^(\w+\s)*\w+$/.test(trimname))){
            return res.status(400).send({ status: false, msg: "Please give a valid title without space" })
                }

        if (!userId)
             return res.status(400).send({ status: false, msg: "userId is required" })

         if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: `${userId} is not a valid user id` })
             
         }

         if (!category)
         return res.status(400).send({status:false, msg : "category is required"})
        

         let createData = await bookModel.create(requestBody)
         return res.status(201).send({status:true, msg: createData})


    }catch(err){
        return res.status(500).send({status:false, msg:error.messege})
    }
}


//===================ViewBooks=====================//

const ViewBooks = async (req,res)=>{
    try {
        let requestBody = req.body;
        let requestquery= req.requestquery;
        let filter = {
            ...query
        }
        const{neW,old}=requestquery

        let user = await userModel.findOne({_id:requestBody.userId})
        if(!user){
            return res.status(401).send({status:false,msg:"user does not exist"})
        }
        let Role=user.role;
           let validRole= function(value){
               for(let i=0;i<value.length;i++){
                   if(((value[i]=="CREATOR")&& (value[i]=="VIEW_ALL"))||((value[i]=="VIEW_ALL"))||((value[i]=="CREATOR")&& (value[i]=="VIEWER") && (value[i]=="VIEW_ALL"))||((value[i]=="VIEWER")&&(value[i]=="VIEW_ALL"))) return true;
               }
               return false;
           }
           if (!validRole(Role)) {
               return res.status(403).send({status: false , message: "You can not do this task"})
           }

           let queryBody = req.requestquery.body
           if(queryBody){
            
            //========Time=========//
            const time = Date.now()-10*60*60

               if(neW){
                   let bookTime = await bookModel.find({createdAt:{$lt:time}})
                   if(!bookTime){
                       return res.status(404).send("No books created within 10 minutes")
                   }else{
                       return res.status(200).send({status:true,msg:" list of books created within 10 minutes"})
                   } 
               }

               if(old){
                let bookTimes= await bookModel.find({createdAt:{$gt:time}})
                if(!bookTimes){
                    res.status(404).send("No book created before 10 minutes")
                }
                return res.status(200).send({ status: true, message: "list of books created before 10 minutes" , data: bookTimes });
    
            }else{
                const filterByQuery = await createModel.find(filter)
                if (filterByQuery.length == 0) {
                    return res.status(404).send({ status: false, msg: "No book found" })
                }
            
        }
    
            }
            return res.status(201).send({ status: true, msg: "Book lists", data: filterByQuery })
        }
        
        
    catch (error) {
        return res.status(500).send({status:false, msg: error.messege})
        
    }
}

const allbooks = async function (req, res) {
    try {
        let query = req.query        
        let filter = {
            ...query
        }

        const filterByQuery = await bookModel.find(filter)
        if (filterByQuery.length == 0) {
            return res.status(404).send({ status: false, msg: "No book found" })
        }
        return res.status(201).send({ status: true, msg: "Book lists", data: filterByQuery })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports= {bookCreate,ViewBooks,allbooks}