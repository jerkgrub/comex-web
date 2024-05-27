import Logo from "./Logo";
import Nav from "./Nav";

export const Header = () => {
  return (
    <div className="text-white sticky top-0 h-3 mx-auto 
    flex items-center bg-gradient-to-tr from-nucolor4 to-nucolor1 justify-between border-b
     border-gray-100 bg-background p-12">
      {/* <img class="h-20" src="https://i.imgur.com/FKLQLuv.png" alt="Your Image"/> */}

      <div className="flex"> 

                <div>
                <img className='h-14 mr-2' src={"https://i.imgur.com/4FyEHPn.png"}/>
                </div>

                <p to="/" className="font-extrabold text-3xl self-center">
                NU MOA Comex
                </p>
            </div>


      <Nav />
    </div>
  );
};

export default Header;