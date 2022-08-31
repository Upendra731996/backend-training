const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {

  try{
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
  console.log(abcd.newAtribute);
  xyz.status(201).send({ msg: savedData });}

catch(error){ res.status(500).send({status:false,msg:error.message})}
  }
//=========================================================================================================================
const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(401).send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });}
  catch(error){res.status(500).send({status:false,msg:error.message})}
};
//=================================================================================================================================================
const getUserData = async function (req, res) {
  try{
 

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });}

 catch(error){ res.status(201).send({ status: true, data: userDetails });}
};
//==================================================================================================================================
const updateUser = async function (req, res) {
// // Do the same steps here:
// // Check if the token is present
// // Check if the token present is a valid token
// // Return a different error message in both these cases

//    let token=req.headers["x-auth-token"]
//  if(!token) return res.send({msg:"token is not present there"})
try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(404).send({msg:"user data not found"});
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(201).send({ status: updatedUser, data: updatedUser });}
  catch(error){res.status(500).send({status:false,msg:error.message})}
};

//====================================================================================================================================


let isdelete= async function(req,res){
  try{
  let data=req.body
  let userId=req.params.userId
  let user= await userModel.findById({_id:userId})
  if(!user) return res.status(404).send({status: false, msg: 'No such user exists'})
        let updatedUser = await userModel.findOneAndUpdate({_id: user._id},data, {new: true})
  
      return res.status(201).send({status: true, data: updatedUser}) }
      catch(error){res.status(500).send({status:false,msg:error.message})}
  
  }


const postMessage = async function (req, res) {
    //let message = req.body.message
    // Check if the token is present
    // Check if the token present is a valid token
//     // Return a different error message in both these cases
//     let token = req.headers["x-Auth-token"]
// if(!token) token=req.headers["x-auth-token"]

//     if(!token) return res.send({status: false, msg: "token must be present in the request header"})
//     let decodedToken = jwt.verify(token, 'functionup-thorium')

//     if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
//     // //userId for which the request is made. In this case message to be posted.
    // let userToBeModified = req.params.userId
    // //userId for the logged-in user
    // let userLoggedIn = decodedToken.userId

    // //userId comparision to check if the logged-in user is requesting for their own data
    // if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
try{
    let user = await userModel.findById(req.params.userId)
    if(!user) return res.status(404).send({status: false, msg: 'No such user exists'})
    //add the message to user's posts

    let updatedUser = await userModel.findOneAndUpdate({_id: user._id}, {new: true})

    //return the updated user document
    return res.status(201).send({status: true, data: updatedUser})}

    catch(error){res.status(500).send({status:false, mgs1:error})}
}

//=====================================================================================================================================














module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.isdelete=isdelete;
module.exports.postMessage = postMessage
