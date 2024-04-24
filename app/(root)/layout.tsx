import { AppWrapper } from "@/context";
import Navbar from "../../components/shared/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ToastContainer />
      <AppWrapper>
        <Navbar />
        {children}
      </AppWrapper>
    </div>
  );
}
