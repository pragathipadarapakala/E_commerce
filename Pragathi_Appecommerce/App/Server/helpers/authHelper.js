import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try{
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password,saltRound);
        return hashedPassword;

    }catch(e){
        console.log(e);
    }
}

export const comparePassword = async(password, hashedPassword)=>{
    try{
        return  bcrypt.compare(password, hashedPassword);
    }catch(e){
        console.log("error is throen");
        console.log(e);
    }

   
    
}