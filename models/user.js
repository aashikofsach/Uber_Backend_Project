const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["passenger", "driver"] },
  location : {
    type : {
        type : String,
        enum : ['Point'],
        default : 'Point'
    },
    coordinates : {
        type : [Number],
        default : [0,0]
    }
  }
});

// this is a middleware which runs before saving the password 
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password , 10);


})

userSchema.methods.comparePassword = async function(password)
{
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports=User;
