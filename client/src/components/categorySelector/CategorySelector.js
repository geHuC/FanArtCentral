import './categorySelector.css'

const CategorySelector = ({ initialValue }) => {
    return (
        <>
            <label className='category-label' htmlFor="category">Category: </label>
            <select name='category' className="category-selector" defaultValue={initialValue}>
                <option className="category-option" value="digital-art">Digital Art</option>
                <option className="category-option" value="tradidional-art">Tradidional Art</option>
                <option className="category-option" value="scultpure">Scultpure</option>
                <option className="category-option" value="3D-model">3D model</option>
                <option className="category-option" value="cosplay">Cosplay</option>
            </select>
        </>
    )
}

export default CategorySelector
