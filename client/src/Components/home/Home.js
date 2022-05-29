import { useState } from 'react'
import Citems from './computer/Citems'
import './home.css'
import Items from './items/Items'
import Landingpage from './landingPage/Landingpage'
import SlideItems from './slideItems/SlideItems'

function Home() {
  const [slidescrlF, setSlideScrlF] = useState()
  const [scrlF, setScrlF] = useState()
  const [destopScrlF, setdesktopScrlF] = useState()

function scroll(scrl) {
    setScrlF(scrl)
}
function desScroll(scrl) {
  setdesktopScrlF(scrl)
}
function slidescroll(scrl) {
  setSlideScrlF(scrl)
}
  return (
      <div className="home">
        <Landingpage scrlF={scrlF} slidescrlF={slidescrlF} destopScrlF={destopScrlF}/>
        <div className="itemList">
            <SlideItems  slidescroll={slidescroll}/>
            <Citems desScroll={desScroll}/>
            <Items scroll={scroll}/>
        </div>
      </div>
  )
}

export default Home