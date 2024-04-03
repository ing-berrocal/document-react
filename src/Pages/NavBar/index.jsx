import { NavLink } from "react-router-dom";

export const NavBarUI = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={'nav-link'}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Home
              </NavLink>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Procesos
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink to="/proceso/plantilla" className={'nav-link'} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    Plantilla
                  </NavLink>
                </li>
                <li><hr className="dropdown-divider"/></li>
                <li className="nav-item">
                  <NavLink to="/proceso/ciclo" className={'nav-link'} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    Ciclo
                  </NavLink>
                </li>
              </ul>
            </li>  
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Repositorios
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink to="/repo/plantilla" className={'nav-link'} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    Plantilla
                  </NavLink>
                </li>
                <li><hr className="dropdown-divider"/></li>
                <li className="nav-item">
                  <NavLink to="/repo/ciclo" className={'nav-link'} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                    Ciclo
                  </NavLink>
                </li>
              </ul>
            </li>                      
            <li className="nav-item">
              <NavLink
                className={'nav-link'}
                to="tercero"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Tercero
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={'nav-link'}
                to="user"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Usuario
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
