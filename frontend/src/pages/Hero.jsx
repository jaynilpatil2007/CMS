import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EditIcon } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import { useEditStore } from "../store/hero.store";
import { useState } from "react";
import NavbarEditCard from "../component/NavbarCardEdit";
import HeroEditCard from "../component/HeroCardEdit";

function Hero() {
    const [navbarEdit, setNavbarEdit] = useState(false);
    const [heroEdit, setHeroEdit] = useState(false);

    const { authUser } = useAuthStore();
    const { navbar, hero } = useEditStore();
    const navHeadings = navbar?.headings ?? [];
    const heroImages = hero?.eventImg ?? [];

    const fallbackImages = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
    const slides = heroImages.length > 0 ? heroImages : fallbackImages;

  return (

    <div className="px-72 py-8 w-full min-h-screen bg-gray-200 dot-grid">
        <div>
            
        </div>
        <nav className="rounded-lg border border-gray-400 px-4 py-2 bg-gray-100 flex justify-between">
            <div>
            <img 
                src="Logo.png" 
                alt="Logo"
                className="h-8 w-8"    
            /> 
            </div>
            <div className="flex gap-4 items-center">
                {navHeadings.length > 0 ? (
                    navHeadings.map((heading, index) => (
                        <div key={`${heading}-${index}`} className="text-sm font-medium">
                            {heading}
                        </div>
                    ))
                ) : (
                    <div className="text-sm font-medium">
                        Home
                    </div>
                )}
            </div>
            <div>
                <button className="rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500">
                    Login
                </button>
            </div>
        </nav>


        { authUser && <button 
        onClick={() => setNavbarEdit(true)}
        className="w-8 h-8 bg-red-500 rounded-md border border-gray-400 flex justify-center items-center mt-2">
            <EditIcon className="text-white text-sm" />
        </button> }

        {
            navbarEdit && <NavbarEditCard navbar={navbar} onClose={() => setNavbarEdit(!navbarEdit)}/>
        }

        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="h-[500px] border-2 border-gray-400 rounded-xl mt-4"
        >
            {slides.map((image, index) => (
                <SwiperSlide key={`${image}-${index}`}>
                    <img src={image} alt={`Hero slide ${index + 1}`} className="w-full h-full object-cover" />
                </SwiperSlide>
            ))}
        </Swiper>


        { authUser && <button 
        onClick={() => setHeroEdit(true)}
        className="w-8 h-8 bg-red-500 rounded-md border border-gray-400 flex justify-center items-center mt-2">
            <EditIcon className="text-white text-sm" />
        </button>}

        {
            heroEdit && <HeroEditCard hero={hero} onClose={() => setHeroEdit(!heroEdit)} />
        }
    </div>
  )
}

export default Hero
