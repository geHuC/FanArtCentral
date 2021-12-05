import './categorySelector.css'

const CategorySelector = () => {
    return (
        <>
            <label className='category-label' htmlFor="category">Category: </label>
            <select name='category' className="category-selector">
                <option value="digital-art">Digital Art</option>
                <option value="tradidional-art">Tradidional Art</option>
                <option value="scultpure">Scultpure</option>
                <option value="3D-model">3D model</option>
                <option value="cosplay">Cosplay</option>
            </select>
        </>
    )
}

export default CategorySelector
