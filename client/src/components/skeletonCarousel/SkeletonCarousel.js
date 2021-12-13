import './skeletonCarousel.css'

const SkeletonCarousel = () => {
    let items = [];
    for (let x = 0; x < 4; x++) {
        let row = { id: x, cards: [] }
        for (let i = 0; i < 5; i++) {
            const a = Math.floor(Math.random() * (350 - 190) + 190);
            const b = Math.floor(Math.random() * (350 - 190) + 190);
            const maxWidth = a > b ? a : b;
            const minWidth = a < b ? a : b;
            row.cards[i] = { style: { maxWidth, minWidth }, id: i }
        }
        items.push(row);
    }

    return (
        <div className="skeleton-carousel">
            {items.map(x =>
                <div key={x.id} className="skeleton-row">
                    {x.cards.map(c =>
                        <div key={c.id} className="skeleton-item" style={c.style}></div>)}
                </div>)}
        </div>
    )
}

export default SkeletonCarousel
