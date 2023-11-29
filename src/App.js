import TuneHeartBeat from "./TuneHeartBeat/index";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
function App() {
   return (
       <HashRouter>
           <div>
           <Routes>
           <Route path="/"         element={<Navigate to="/TuneHeartBeat"/>}/>
          <Route path="/TuneHeartBeat/*" element={<TuneHeartBeat/>}/>
        </Routes>
           </div>
       </HashRouter>
   );
}
export default App;