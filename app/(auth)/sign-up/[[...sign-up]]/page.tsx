import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return     <div className="flex flex-col justify-center items-center gap-4">
  <SignUp />
  <div className="relative z-50 max-w-fit flex flex-col justify-center bg-white border-2 border-black rounded-xl gap-2 p-6">
    <h2 className="text-xl font-semibold text-center">Demo account:</h2>
    <p>
      email: <span className="font-semibold">sebastianlib04@gmail.com</span>
    </p>
    <p>
      Password: <span className="font-semibold">applicationdemo</span>
    </p>
  </div>
</div>;
}