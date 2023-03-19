import connectToDb from "../backend/connectToDb";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;

export async function getServerSideProps({ req, res }) {
  const db = await connectToDb();

  return {
    props: {},
  };
}
