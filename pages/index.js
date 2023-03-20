import Link from "next/link";

import { useSession } from "next-auth/react";

const Home = () => {
  return <main className="min-h-full flex justify-center items-center"></main>;
};

export default Home;

//  to protect this page from unauthorized access
// Home.auth = true;

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/sign-up",
      permanent: false,
    },
  };
};
