import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

 const route = Router();

// new user
route.post("/signup", async(req, res) => {
    console.log("REST: request to SignUp ")
    try {
        const {email, password}= req.body;

            

        if(!email || !password) {
            return res.status(400).json({message: "email and password required"});
        }
        const existUser = await User.findOne({email})
        if(existUser) {
            return res.status(400).json({message: "User Already Registered"});
        }

        const hashedPassowrd = await bcrypt.hash(password, 10)

        const user = await User.create({email: email, password:hashedPassowrd});
        res.status(200).json({message:"User Created Successfully"});
    } catch(err) {
        res.status(500).json({message: "Server Error: ", error:(err as Error).message})
    }
});

route.post("/login", async(req, res)=> {
    try{
        const {email, password} = req.body;

                    console.log("REST: request to login user with email: ", email)

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: "User not Registered "});
        }
        
        const isPassMatch = bcrypt.compare(password, user.password);

        if(!isPassMatch) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_KEY as string,
            {expiresIn: '1d'}
        )
        res.json({token: token, email: user.email })
    } catch(err) {
        res.status(500).json({message: "Server Error", error: (err as Error).message})
    }
})

export default route