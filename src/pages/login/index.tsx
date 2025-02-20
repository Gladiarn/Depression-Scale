import Form from "@/components/Auth/Form";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import React from "react";


export default function index() {
  return (
    <div className="w-full overflow-hidden flex flex-col">
      <div className="relative w-full py-[50px] flex justify-center items-center ">
        <Link
          href={"/"}
          className="hover:scale-[.90] scale-100 transition-all ease-in-out absolute z-50 top-5 right-5 bg-surface text-white px-[15px] py-[5px] rounded-[8px] shadow-sm"
        >
          X
        </Link>
        <Form />
      </div>



      <Footer />
    </div>
  );
}
