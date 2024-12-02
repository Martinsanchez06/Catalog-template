import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../hooks/ScrollContext';
import { Link } from 'react-router-dom';
import { RootState, useAppSelector } from '../redux/store';
import CartSummary from './Header/CartSummaryHeader';

interface HeaderProps {
  scroll?: number;
  blur?: number;
}

const Header: React.FC<HeaderProps> = ({ scroll, blur }) => {
  const { scrolled, isBlur } = useScroll(scroll, blur);

  const location = useLocation();
  // Verifica si estás en el Home o en otra ruta
  const isHomePage = location.pathname === '/';
  const headerScrolled = isHomePage ? scrolled : true; // Siempre en estado "scrolled" si no es Home
  const headerBlur = isHomePage ? isBlur : isBlur; // Aplica "blur" también si no es Home
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  return (
    <header className={`top-0 w-full transition-all duration-300 backdrop-blur-sm ${headerScrolled ? 'fixed h-[170px] py-4 px-8' : 'h-screen py-[50px] px-[75px]'} ${headerBlur ? "bg-[rgba(101, 101, 101, 0.01)]" : "bg-mainColor"} text-white z-[100]`}>
      <div className={`transition-all duration-300 max-w-screen-xl m-auto bg-secondaryColor ${headerScrolled ? 'h-20 py-2 px-4 rounded-lg' : 'h-full w-full m-auto rounded-tl-[40px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[40px] py-[65px] px-[30px]'} flex flex-col justify-between items-center`}>
        <div className={`flex flex-col justify-center items-center gap-8  ${headerScrolled ?  "text-white" : "text-black"}`}>
          <div className={`transition-all duration-300 ${headerScrolled ? 'h-16 w-80' : 'h-[200px] w-[1000px]'} bg-[#fff] rounded-2xl`} />
          <div className={`flex gap-[15px] transition-all duration-300 ${headerBlur ? "text-black" : `${headerScrolled ?  "text-white" : "text-black"}`}`}>
            <Link to={"/"}>
              home
            </Link>
            <p>Lorem</p>
            <p>Lorem</p>
            <p>Lorem</p>
            <CartSummary blur={headerBlur} />
          </div>
          {!headerScrolled && (
            <h2 className="text-4xl">
              Lorem ipsum dolor sit amet, constetur
            </h2>
          )}
        </div>
        <div className={`transition-all duration-300 ${headerScrolled ? 'hidden text-white' : 'w-full flex flex-col gap-[36px] text-black'}`}>
          <div className="flex gap-[15px]">
            <img src="/icons/header/phoneIcon.svg" alt="Teléfono" />
            <p>+57 000000000</p>
          </div>
          <div className="flex gap-[15px]">
            <img src="/icons/header/phoneIcon.svg" alt="Ubicación" />
            <p>Lorem ipsum dolor sit amet, constetur</p>
          </div>
          <div className="flex gap-[15px]">
            <img src="/icons/header/phoneIcon.svg" alt="Horario" />
            <p>09:00 AM - 09:00 PM</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
