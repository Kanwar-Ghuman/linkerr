"use client";
import React from "react";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex overflow-hidden relative">
      <div className="w-1/2 bg-white rounded-tr-[50px] rounded-br-[50px] relative z-10">
        <div className="p-8">
          <Image
            src="/linkerr.png"
            alt="Linkerr Logo"
            width={150}
            height={50}
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="w-full h-full absolute" style={{ background: "#A2B0FF" }}>
        <div className="flex justify-end h-screen">
          <Image
            src="/image.png"
            alt="Right side image"
            width={800}
            height={1000}
            className="object-contain h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
