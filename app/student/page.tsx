"use client";

import Image from "next/image";
import Link from "next/link";

export default function StudentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Hello World</h1>
      <Link href="/" className="text-blue-600 hover:text-blue-800">
        Back to Home
      </Link>
    </div>
  );
}
