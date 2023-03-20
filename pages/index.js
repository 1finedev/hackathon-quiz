import Link from "next/link";
import SignUp from "../components/signup/SignUp";

import { useSession } from "next-auth/react";

const Home = () => {
  return (
    <main className="min-h-full flex justify-center items-center">
      <SignUp />
    </main>
  );
};

export default Home;

//  to protect this page from unauthorized access
// Home.auth = true;
