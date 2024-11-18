const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-tertiaryColor m-auto mt-[100px] h-[400px]">
      <div className="max-w-screen-xl m-auto h-full flex justify-between items-center px-10">
        <div className="bg-white rounded-xl w-[451px] h-44"></div>
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold	text-white">CONTACTANOS</p>
          <div className="flex justify-between">
            <img src="/icons/footer/facebook.svg" alt="Facebook" />
            <img src="/icons/footer/whatsapp.svg" alt="WhatsApp" />
            <img src="/icons/footer/instagram.svg" alt="Instagram" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
