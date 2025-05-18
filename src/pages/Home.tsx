import { Camera } from "lucide-react";
const Home = () => {
   
  return (
    <>
      <div>Home</div>
      <Camera />
      <button onClick={() => toast("Wow so easy !")}>Notify !</button>
    </>
  );
};
export default Home;
