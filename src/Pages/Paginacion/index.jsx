import { useState } from "react"

const PaginationUI = ({numPages, currentPage}) => {
    
    const [ current, setCurrent ] = useState(currentPage);


    const onLast = () => {

    }

    const onNext = () => {

    }    

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous" onClick={onLast}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                { new Array(Math.round(numPages)).fill(1).map( (_, i) => i+1 ).map(itemPage=><li key={itemPage} className={`page-item ${ itemPage == current ? 'active' : ''}`}><a className="page-link" href="#">{itemPage}</a></li>) }                                
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next" onClick={onNext}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default PaginationUI;