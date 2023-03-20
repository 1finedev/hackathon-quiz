import Image from "next/image";
import Link from "next/link";
import React from "react";
import notFound from '../assets/not-found.svg'
const ClientError = () => {
  return <section className="flex-col items-center flex justify-center text-center max-w-2xl md:flex-row mx-auto">
    <Image src={notFound} alt='Not Found' />
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-9xl">404</h1>
      <p>Page not found</p>
      <Link href='/' className="text-blue-400"> Got to home page</Link>
    </div>
  </section>;
};

export default ClientError;
