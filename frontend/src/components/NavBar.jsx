import { Link } from 'react-router-dom';

function Navbar() {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top pt-3 pb-3 ps-2 navBarCustom">
            <div className="container-fluid">
                <Link className="navbar-brand navBrand" to="/" onClick={scrollToTop}>Movie App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse align-items-center" id="navbarNav">
                    <ul className="navbar-nav d-md-flex align-items-center justify-content-end">
                        <li className="nav-item navItem">
                            <Link className="nav-link text-white" to="/" onClick={scrollToTop}>Home</Link>
                        </li>
                        <li className="nav-item navItem">
                            <Link className="nav-link text-white" to="/favorites">Favorites</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;