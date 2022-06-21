import './footer.css'

function Footer({scrTop}) {

  const handleTopSection=()=>{
    scrTop.current.scrollIntoView({ behavior: 'smooth' })
  
  }

  return (
    <div className='footer'>
    <div className="back_to_top_btn"
    onClick={handleTopSection}>
    Back to top
    </div>
<div className="footer-middle-container">
    <div className="footer_section_1">
        <h3>Get to Know Us</h3>
        <span>Careers</span>
        <span>Blog</span>
        <span>About Amazon</span>
        <span>Investor Relations</span>
        <span>Amazon Devices</span>
        <span>Amazon Science</span>
    </div>

    <div className="footer_section_2">
        <h3>Make Money with Us</h3>
            <span>Sell products on Amazon</span>
            <span>Sell on Amazon Business</span>
            <span>Sell apps on Amazon</span>
            <span>Become an Affiliate</span>
            <span>Advertise Your Products</span>
            <span>Self-Publish with Us</span>
            <span>Host an Amazon Hub</span>
            <span>›See More Make Money with Us</span> 
      </div>
      <div className="footer_section_3">
        <h3>Amazon Payment Products</h3>
          <span> Amazon Business Card</span> 
          <span> Shop with Points</span> 
          <span>Reload Your Balance</span>  
          <span> Amazon Currency Converter</span> 
        </div>
      <div className="footer_section_4">
            <h3>Let Us Help You</h3>
              <span> Amazon and COVID-19</span> 
              <span> Your Account</span> 
              <span>Your Orders</span>  
              <span>Shipping Rates & Policies</span> 
              <span>Returns & Replacements</span>
              <span>Manage Your Content and Devices</span>
              <span>Amazon Assistant</span>
              <span>Help</span>
            </div>
      </div>
      <div className="footer-middle-container-2">
        <div className="footer_section_5">
                <span>Amazon.com</span>
                <span>Your Lists</span>
                <span>Find a Gift</span>
                <span>Browsing History</span>
                <span>Returns</span>
                <span>Customer Service</span>
          </div>

            <div className="footer_section_6">
                    <span>Your Oders</span>
                    <span>Gift Cards & Registry</span>
                    <span>Your Account</span>
                    <span>Sell products on Amazon</span>
            </div>
        </div>
        <div className="footerItemContainer">
        <span>
            <span>Condition Of Use</span>
            <span>Privacy Notice</span>
            <span>Interest-Based Ads</span>
        </span>
        <span>
          <span>© 1996-2022, Amazon.com, Inc. or its affiliates</span>
        </span> 
        </div>
    </div>
  )
}

export default Footer