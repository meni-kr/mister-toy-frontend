import { NavLink } from "react-router-dom";


export function AppHeader(){
    return (
    <header className="app-header">
    <section className="header-container">
        <h1 className="logo">Toy logo</h1>
        <nav className="app-nav">
            <NavLink to="/" >Home</NavLink>
            {/* <NavLink to="/about" >About</NavLink> */}
            {/* <NavLink to="/toy" >toys</NavLink> */}
            {/* <a onClick={onToggleCart} href="#">🛒 Cart</a> */}

        </nav>
    </section>
</header>
        
    )
}