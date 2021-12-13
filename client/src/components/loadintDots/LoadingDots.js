import './loadingDots.css'

const LoadingDots = ({ size = 'large' }) => {
    const dotSizes = {
        small: '0.5rem',
        medium: '1rem',
        large: '2rem'
    }
    return (
        <div className='loading-dots-container'>
            <div className="loading-dots-dot" style={{ animationDelay: '0s', width: dotSizes[size], height: dotSizes[size] }}></div>
            <div className="loading-dots-dot" style={{ animationDelay: '0.2s', width: dotSizes[size], height: dotSizes[size] }}></div>
            <div className="loading-dots-dot" style={{ animationDelay: '0.4s', width: dotSizes[size], height: dotSizes[size] }}></div>
        </div>
    )
}

export default LoadingDots
