import { useEffect, useState } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerHeight = scrolled ? '5vh' : '8vh';

  return (
    <>
      <header
        className="fixed-top bg-secondary text-white d-flex align-items-center px-3 py-3"style={{  height: headerHeight, transition: 'height 0.3s ease', zIndex: 1050, }}>
        <h1 className="mb-0" style={{  fontSize: scrolled ? '1.5rem' : '2.5rem',  transition: 'font-size 0.3s ease',  }}>
          Blogger
        </h1>
      </header>
      <div  className="" style={{ height: headerHeight }} />
    </>
  );
};

export default Header;
