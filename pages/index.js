import Link from "next/link";

const Home = () => {
  return (
    <div className="">
      <h1>User registers first. After registration, they are redirected <Link href="/onboarding">to the onboarding scren</Link> </h1>
    </div>
  );
};

export default Home;
