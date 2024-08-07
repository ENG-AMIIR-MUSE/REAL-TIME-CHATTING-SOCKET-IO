import mongoose from "mongoose";

export const setConnection  = async(url)=>{

    try {
        await mongoose.connect(url)
        console.log('connected to te database')
    } catch (error) {
        console.log(error)
    }
}