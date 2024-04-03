import { NavBarUI } from "../NavBar";
import { Outlet } from "react-router-dom";

function HomeUI() {

  return (
    <>
      <NavBarUI/>
      <div className="progress placeholder-glow" style={{height: '5px'}}>
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '75%'}}></div>
      </div>
      <div className="container-md">
        <div className="row">
        <nav className="m-2" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Library</a></li>
            <li className="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
        </div>
        <Outlet />        
      </div>
    </>
  );
}

export default HomeUI;
