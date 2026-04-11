import Categories from '@/components/home/Categories'
import HeroGrid from '@/components/home/HeroGrid'
import NewArrival from '@/components/home/NewArrival'
import PriceDrop from '@/components/home/PriceDrop'
import ShopNow from '@/components/home/ShopNow'
import SpringEdit from '@/components/home/SpringEdit'
import Trending from '@/components/home/Trending'
import 'remixicon/fonts/remixicon.css'

const Home = () => {
  return(
    <div className="bg-amber-50 mt-15 h-full overflow-hidden">
      <HeroGrid/>
      <NewArrival/>
      <Categories/>
      <Trending/>
      <PriceDrop/>
      <SpringEdit/>
      <ShopNow/>
    </div>
  )
}

export default Home