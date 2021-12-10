import { useEffect, useState } from 'react'
import './carousel.css'
import useWindowDimesions from '../../hooks/useWindowDimensions.js'
import SubmissionCard from '../submissionCard/SubmissionCard.js';

const Carousel = (props) => {
    const { width } = useWindowDimesions();
    const [temp, setTemp] = useState([])
    useEffect(() => {
        let rows = [{ submissions: [], style: { height: '300px' }, id: 0 }]
        let currentRow = 0;
        let currentWidth = width > 1200 ? 1200 : width;
        let elementsWidth = 0;
        props.submissions.forEach(x => {
            if (elementsWidth + x.thumbWidth < currentWidth) {
                rows[currentRow].submissions.push(x);
                elementsWidth += (x.thumbWidth + 8);
            } else {
                let height = 300 * (currentWidth / elementsWidth);
                if (height > 300) {
                    rows[currentRow].submissions.push(x);
                    elementsWidth += (x.thumbWidth + 8);
                    height = 300 * (currentWidth / elementsWidth);
                    rows[currentRow].style = { height: `${height}px` };
                    currentRow++;
                    rows[currentRow] = { submissions: [], style: { height: '300px' }, id: currentRow };
                    elementsWidth = 0;
                    return;
                }
                rows[currentRow].style = { height: `${height}px` };
                currentRow++;
                rows[currentRow] = { submissions: [], style: { height: '300px' }, id: currentRow };
                rows[currentRow].submissions.push(x)
                elementsWidth = x.thumbWidth;
            }
        })
        setTemp(rows);
    }, [props.submissions, width])
    return (
        <div className="carousel">
            {temp.map(row => (<div className="carousel-row" style={row.style} key={row.id}>
                {row.submissions.map(submission => <SubmissionCard key={submission._id} {...submission} />)}
            </div>))}
        </div>
    )
}

export default Carousel
