import './loading.css'

function LoadingCircle({loadingColor, loadingSize}) {

  if(loadingColor === 'orange'){
  return (
    <div className="loading_circle">
        <div className="outer_circle">
          <div className="inner_circle"></div>
        </div>
    </div>
  )}
  else{
    return (
      <div className="loading_circleB">
        <div className="outer_circleB">
          <div className="inner_circleB"></div>
        </div>
      </div>
    )
  }
}

export default LoadingCircle