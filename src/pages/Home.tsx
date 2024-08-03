import { toast } from "react-toastify";
import * as Icon from "react-feather";
const Home = () => {
   
  return (
    <>
      <div>Home</div>
      <Icon.Camera />
      <button onClick={() => toast("Wow so easy !")}>Notify !</button>
    </>
  );
};
export default Home;
