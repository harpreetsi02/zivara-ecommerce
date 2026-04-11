import { lemonMilk } from "@/app/fonts"
import Link from "next/link"

const HeroGrid = () => {

    const items = [
      {
        img: "https://images.unsplash.com/photo-1693987647760-03d7babf5dac?w=500",
        slug: "suits", big: true
      },
      {
        img: "https://images.unsplash.com/photo-1711188053977-5d45da407737?w=500",
        slug: "tops", 
      },
      {
        img: "https://images.unsplash.com/photo-1659107295515-6a0b2fb785a4?w=500",
        slug: "dresses", big: true
      },
      {
        img: "https://images.unsplash.com/photo-1738618807972-97c329ff3ed7?w=500",
        slug: "bottom", big: true
      },
      {
        img: "https://images.unsplash.com/photo-1664552455995-ac507f7dddad?w=500",
        slug: "jackets",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1726930176874-96c2dc7c671d?w=500",
        slug: "bags",
      },
    ];

    return(
        <div className="img-background flex flex-col h-[650px] md:h-[750px] mt-10 w-screen">
            <div className="heading-top h-1/5 flex items-center justify-center p-2 bg-black text-center w-full">
                <h2 className={`${lemonMilk.className} top-text uppercase text-sm flex items-center`}><span className="text-3xl">m</span>ade for your vibe</h2>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 bg-amber-100 px-4 py-2 h-4/5 w-full">
                {items.map((item, index) => {
                  const isBig = index === 0 || index === 4;

                  return (
                    <Link
                      key={index}
                      href={`/category/${item.slug}`}
                      className={`${item.big ? "row-span-2" : ""}`}
                    >
                      <img
                        src={item.img}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </Link>
                  );
                })}
            </div>
            <div className="heading-bottom h-1/5 flex flex-col py-2 items-center justify-center bg-black text-center w-full">
                <h2 className={`${lemonMilk.className} bottom-l line-clamp-2 uppercase text-lg flex items-center tracking-widest`}><span className="text-4xl">f</span>ree shipping</h2>
                <h4 className="bottom-r font-medium text-sm tracking-wide">on order above &#x20B9;1099</h4>
            </div>
        </div>
    )
}

export default HeroGrid