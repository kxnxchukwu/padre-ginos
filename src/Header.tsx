import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    <nav>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <div className="nav-cart">
        🛒
        <span className="nav-cart-number">12</span>
      </div>
    </nav>
  );
}
