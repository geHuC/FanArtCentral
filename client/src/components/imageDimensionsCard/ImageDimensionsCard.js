import './imageDimensionsCard.css'
import prettySizes from '../../utils/prettySizes.js'

const ImageDimensionsCard = ({width,height,size}) => {
    return (
        <div className='image-dimensions-container'>
            <div className="image-dimesions-top">Image details</div>
            <div className="image-dimesions-bottom">
                <div className="image-dimesions-bottom-left">Image size</div>
                <div className="image-dimesions-bottom-right">{`${width}x${height}px ${prettySizes(size)}`}</div>
            </div>
        </div>
    )
}

export default ImageDimensionsCard
