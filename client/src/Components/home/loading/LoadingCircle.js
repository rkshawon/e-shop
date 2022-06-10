import './loading.css'

function LoadingCircle({loadingColor}) {
  return (
    <div className="loading_circle">
    {
      loadingColor === 'orange'?
        <div className="outer_circle">
          <div className="inner_circle"></div>
        </div>
        :
      <div className="outer_circleB">
        <div className="inner_circleB"></div>
      </div>
    }

    </div>
  )
}

export default LoadingCircle