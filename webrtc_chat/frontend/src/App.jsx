import VideoPlayer from "./components/VideoPlayer"
import Options from "./components/Options"
import Notifications from "./components/Notifications"

function App() {

  return (
    <>
      <div className=" font-bold text-center my-6 text-5xl ">Video Call APP</div>

      <VideoPlayer/>

      <Options>
        <Notifications/>
      </Options>
    </>
  )
}

export default App
