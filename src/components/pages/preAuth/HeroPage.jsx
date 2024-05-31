import { useNavigate } from "react-router-dom";

const HeroPage = () => {

    const navigate = useNavigate();

    const start_btn = () =>{
        navigate('/login');
    };

    return (
        <section className="text-gray-600 body-font bg-gradient-bg2 dark:bg-slate-900">
    <div className="mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
        <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight -mb-5 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-7xl md:leading-normal">
                Unlock your
            </h1>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight mb-3 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-7xl md:leading-normal">
                Community Impact
            </h1>
            <p className="mb-8 md:pl-0 pl-2 pr-2 text-lg leading-relaxed dark:text-gray-300">
            Help shape our future together, here at NU MoA COMEX CONNECT.
            </p>
            
            <div className="flex justify-center">
                <button 
                onClick={start_btn}
                className="
                btn
                btn-ghost
                btn-wide
                flex
                font-bold 
                justify-center 
                rounded-md 
                bg-nucolor3 
                px-3 py-1.5 
                text-lg 
                font-semibold 
                leading-6 
                text-nucolor4 
                shadow-sm 
                hover:bg-lightyellow 
                hover:text-white3 
                focus-visible:outline 
                focus-visible:outline-2 
                focus-visible:outline-offset-2 
                focus-visible:outline-nucolor2
                ">
                    Let's Start
                </button>
            </div>
        </div>
        <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://www.svgrepo.com/show/490900/hot-air-balloon.svg"/>
        </div>
    </div>
</section>  
    );
}

export default HeroPage;