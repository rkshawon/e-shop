import './slideItems.css'
import {AiOutlineLeft} from 'react-icons/ai'
import {AiOutlineRight} from 'react-icons/ai'
import {FaStar} from 'react-icons/fa'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React,{ Component } from "react";
import axios from 'axios'
import {v4} from 'uuid'
import Modal from '../modal/Modal';
import { Context } from '../../../context/shooping/Context';
import { BasketContext } from '../../../context/shooping/BasketContext';


export default class SlideItems extends Component{
  static contextType = Context
  
  constructor(props) {
    super(props);
    this.slideRef = React.createRef();
    this.slideScrlRef = React.createRef();
    this.state = {
      user: '',
      products: [],
      openModal: false,
      product: null,
    }
    
  }

  
  addToCard(basketContext, id, name, price, image){
    const {basket, dispatchB} = basketContext;
    let repeatecheck = true
    repeatecheck = basket?.every( b => {
      if(b.id === id){
        return false
      }else{
        return true
      }
    })
    repeatecheck === true && dispatchB({
      type: "ADD_TO_CARD",
      item:{
        id:id,
        name:name,
        price:price,
        image: image,
        quantity: 1
      }
    })
  }

  changeState(product){
    this.setState({product: product})
    this.setState({openModal: true})
  }

  componentDidMount() {
    this.setState({user: this.context.user})

    axios.get('http://localhost:8000/product/allproduct')
    .then(res => {
      const products = res.data;
      this.setState ({products});
    })
    this.props.slidescroll(this.slideScrlRef)
  }

  render() {
  var settings = {
    draggable: true,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };    
   
  return (
    <>
    <h1 ref={this.slideScrlRef}>Top Rated Laptops</h1>
    <BasketContext.Consumer>{(basketContext)=>{
      return(
      <div className='slider_container'>
      {
        this.state.openModal && <Modal
        open = {this.state.openModal}
        close = {()=>this.setState({openModal: false})}
        productid = {this.state.product._id}
        userid = {this.state.user._id}/>
      }
        <div className="item_leftSlider"
          onClick={()=>this.slideRef.current.slickPrev()}>
          <AiOutlineLeft className='arrow_icon'/>
        </div>
          <Slider {...settings} ref={this.slideRef} className='slide_items'>
          {
            this.state.products.map((product, index) =>{
              if(product.category === 'Laptop')
                return <div key ={index} className="single_item_container">
                  <div className="item_container">
                    <div className="p_image_container">
                      <img src={product.images} alt=''/>
                    </div>
                    <div className="p_details_container">
                      <div className='p_names'>{product.name}</div>
                      <div className="p_prices">${product.price}</div>
                      <div className="p_ratings">
                      {
                        [...Array(5)].map((star, i)=>{
                          let ratingValue = i+1
                          return(
                              <FaStar
                                key={v4()}
                                className='star_rating'
                                color={ratingValue <= product.rating.user_rating ? '#ffc107' : '#e4e5e9'}
                                onClick={()=>{ this.changeState(product)}}
                              />
                          )
                        })
                      }
                      </div>
                      <button className="add_to_card"
                      onClick={()=>{this.addToCard(basketContext, product._id, product.name, product.price, product.images)}}>
                      Add to Card
                      </button>
                    </div>
                  </div>
                </div>
              else
                return undefined
            })
          }
          </Slider> 
          <div className="item_rightSlider"
            onClick={()=>this.slideRef.current.slickNext()}>
            <AiOutlineRight className='arrow_icon'/>
          </div> 
      </div>
      )
    }}
    </BasketContext.Consumer>
    </>
  )
}
}