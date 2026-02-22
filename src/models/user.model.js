import bcrypt from 'bcryptjs'
import mongoose, {Schema} from 'mongoose'
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
     
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true
    }
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password') || !this.password){next()};
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model.User || mongoose.model("User", userSchema);