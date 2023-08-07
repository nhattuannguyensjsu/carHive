import {db} from "../db.js";
import bcrypt from "bcryptjs";

export const register = (req,res) => {

   
     //Check existing user
    const q = "SELECT * FROM user WHERE email = ?"
    db.query(q,[req.body.emal], (err,data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.passowrd, salt);

        const q = "INSERT INTO user(`email`, `password`) VALUES (?)"
        const values = [
            req.body.name,
            req.body.email, 
            hash,
        ]

        db.query(q,[values], (err,data)=>{
            if (err) return res.json(err);
            return res.status(200).json("User has been created");
        })
    })
}

export const login = (req,res ) => {

}

export const logout = (req,res ) => {
    
}