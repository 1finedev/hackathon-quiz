
import HomeScreen from "../components/Homepage/HomeScreen";

import connectToDb from "../backend/connectToDb";


const Home = () => {
  return (
   <HomeScreen />
  );
};

export default Home;

export async function getServerSideProps({ req, res }) {
  const db = await connectToDb();

  return {
    props: {},
  };
}
