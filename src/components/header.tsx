const Header: React.FC = () => {
    return (
        <header className="Header bg-[#656565] h-screen w-full py-[50px] px-[75px] text-white">
            <div className="bg-[#888] h-full w-full max-w-screen-xl m-auto rounded-tl-[40px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[40px] flex flex-col justify-between items-center py-[65px] px-[30px]">
                <div className="flex flex-col justify-center items-center gap-8">
                    <div className="h-[200px] w-[1000px] bg-[#fff] rounded-2xl">

                    </div>
                    <div className="flex gap-[15px]">
                        <p>Lorem</p>
                        <p>Lorem</p>
                        <p>Lorem</p>
                        <p>Lorem</p>
                        <img src="/icons/header/shoppingCartIcon.svg" alt="" />
                    </div>
                    <h2 className="text-4xl	">
                        Lorem ipsum dolor sit amet, constetur
                    </h2>
                </div>
                <div className="w-full flex flex-col gap-[36px]">
                    <div className="flex gap-[15px]">
                        <img src="/icons/header/phoneIcon.svg" alt="" />
                        <p>+57 000000000</p>
                    </div>
                    <div className="flex gap-[15px]">
                        <img src="/icons/header/phoneIcon.svg" alt="" />
                        <p>Lorem ipsum dolor sit amet, constetur</p>
                    </div>
                    <div className="flex gap-[15px]">
                        <img src="/icons/header/phoneIcon.svg" alt="" />
                        <p>09:00 AM - 09:00 PM</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
