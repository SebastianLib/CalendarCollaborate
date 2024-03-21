"use client"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const DeleteTask = () => {
const [isRemoving, setIsRemoving] = useState<boolean>(false);
const router = useRouter();
const {id} = useParams<{ id: string }>();

    const handleRemove = async() => {
        try {
            setIsRemoving(true)
            await axios.delete(`/api/schedule/${id}`)
            toast.success("You have successfully deleted task!")
            router.push("/schedule")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong...")
        }finally{
            setIsRemoving(false)
        }
    }

  return (
    <Button disabled={isRemoving} onClick={handleRemove} variant={"destructive"} size={"lg"}>Remove</Button>
  )
}

export default DeleteTask