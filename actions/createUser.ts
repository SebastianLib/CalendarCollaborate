import db from "@/db";

export async function createUser(user:{
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
  }) {
    console.log(user);
    
    try {
  
      const newUser = await db.user.create({
        data:{
            ...user
        }
      })
      return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
      console.log(error);
    }
  }