import './landingpage.css'
import i1 from './BackgroundImages/image1.jpg'
import i2 from './BackgroundImages/image2.jpg'
import i3 from './BackgroundImages/image3.jpg'
import i4 from './BackgroundImages/image4.jpg'
import i5 from './BackgroundImages/image5.jpg'
import { useEffect, useRef, useState } from 'react'
import {AiOutlineLeft} from 'react-icons/ai'
import {AiOutlineRight} from 'react-icons/ai'
import phone from './Titleimage/phone.jpg'
import computers from './Titleimage/computers.jpg'
import laptops from './Titleimage/laptops.jpg'

function Landingpage({scrlF, slidescrlF, destopScrlF}) {
    const [backImgControllerLeft, setBackImgControllerLeft] = useState(4)
    const [backImgControllerRight, setBackImgControllerRight] = useState(1)
    const [imageToRender, setImageToRender] = useState(0)
    const imageRef = useRef()

    const homeImage = [
        {
            id : 1,
            isrc : i1
        },
        {
            id : 2,
            isrc : i2
        },
        {
            id : 3,
            isrc : i3
        },
        {
            id : 4,
            isrc : i4
        },
        {
            id : 5,
            isrc : i5
        },
    ]
    const handleMobileSection=()=>{
        scrlF.current.scrollIntoView({ behavior: 'smooth' })

    }
    const handleDesktopSection=()=>{
        destopScrlF.current.scrollIntoView({ behavior: 'smooth' })
    }
    const handleLaptopSection=()=>{
        slidescrlF.current.scrollIntoView({ behavior: 'smooth' })
    }
    const changeImage = (direction)=>{
        if(direction === 'right'){
            setImageToRender(backImgControllerRight)
            setBackImgControllerRight(backImgControllerRight + 1)
        }
            
        if(direction === 'left'){
            setImageToRender(backImgControllerLeft)
            setBackImgControllerLeft(backImgControllerLeft - 1)
            
        }
    }
    useEffect(()=>{
        const slider = ()=>{
            if(backImgControllerRight> 4 ){
                setBackImgControllerRight(0)
            }
            if( backImgControllerLeft <1){
                setBackImgControllerLeft(4)
            }
    }
    slider()
    },[backImgControllerRight, backImgControllerLeft])

  return (
    <div className="landingpage">
    <div className="backgroundImage_container" >
        <div className="imageSlider">
            <img
            className="home_image"  ref={imageRef}
            src={homeImage[imageToRender].isrc}
            alt=""
            />
        </div>
        <div className="Container">
            <div className="slider">
                <div className="leftSlider" onClick={()=>changeImage("left")}><AiOutlineLeft className='leftArrow'/></div>
                <div className="rightSlider"  onClick={()=>changeImage("right")}><AiOutlineRight className='leftArrow'/></div>
            </div>
            
            <div className="firstItemContainer">
               <div className="langingpageItems">
                    <div className="landingpageCatagory" onClick={handleLaptopSection}>
                        <h2>Browse Laptops</h2>
                        <img src={laptops} alt=''></img>
                    </div>
                    <div className="landingpageCatagory" onClick={handleDesktopSection}>
                        <h2>Browse Desktops</h2>
                        <img src={computers} alt=''></img>
                    </div>
                    <div className="landingpageCatagory" onClick={handleMobileSection}>
                        <h2>Browse Phones</h2>
                        <img src={phone} alt=''></img>
                    </div>
               </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Landingpage