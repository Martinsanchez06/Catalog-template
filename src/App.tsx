import './App.css';
import CardMainComponent from './components/cardMainComponent';
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='max-w-screen-xl flex gap-[50px] m-auto flex-col mt-[50px]'>
        <section className='w-full border-2 border-secondaryColor flex justify-between items-center py-5 px-[15px] rounded-lg'>
          <div className='flex border-tertiaryColor border-2 py-[5px] px-[9px] rounded-lg w-96 h-8'>
            <img src="/icons/home/searchIcon.svg" alt="" />
            <input type="text" className='w-full' />
          </div>
          <div className='flex justify-center gap-4 items-center'>
            <p>Explorar por categorias</p>
            <div className='border-tertiaryColor border-2 py-[5px] px-[9px] rounded-2xl w-64 h-8 flex justify-end items-center' >
              <img src="icons/home/arrowDown.svg" alt="" />
            </div>
          </div>
        </section>

        <section className='flex gap-[30px] flex-col'>
          <h2 className='font-semibold	text-xl'>Lorem ipsum dolor</h2>
          <div className="flex gap-x-5 gap-y-[50px] flex-wrap">
            {Array.from({ length: 12 }).map((_, index) => (
              <CardMainComponent key={index} />
            ))}
          </div>

        </section>

        <section>
          {/* Otros contenidos */}
        </section>
        <section>
          {/* Otros contenidos */}
        </section>
      </main>
    </div>
  );
}

export default App;
