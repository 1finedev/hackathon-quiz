import HomeScreen from "../components/Homepage/HomeScreen";
import { useSession } from "next-auth/react";

const Home = () => {
  return <HomeScreen />;
};

export default Home;

//  to protect this page from unauthorized access
Home.auth = true;
