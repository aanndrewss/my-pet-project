import React, {useEffect, useState} from "react";
import classes from './paginator.module.scss'
import cn from 'classnames'
import {Button} from "@mui/material";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage])
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={classes.paginator}>
        {portionNumber > 1 &&
            <Button variant='contained' size='small' onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</Button>}

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
            return <span className={ cn({
                [classes.selectedPage]: currentPage === p
            }, classes.pageNumber)}
                         key={p}
                         onClick={(e) => {
                             if (onPageChanged) {
                                 onPageChanged(p)
                             }
                         }}>{p}</span>
        })}
        {portionCount > portionNumber &&
            <Button variant='contained' size='small' onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</Button>}
    </div>
}

export default Paginator