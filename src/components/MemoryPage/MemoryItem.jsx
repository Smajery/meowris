import React from 'react';
import {useNavigate} from "react-router-dom";
import {ROUTE_MEMORY} from "../../utils/consts";
import {useActions} from "../../hooks/useActions";
import imgRatingStar from "../../img/star-rate.svg";
import imgSticker from "../../img/sticker.svg";
import imgCatStarOne from "../../img/cat-star-1.svg";
import imgCatStarTwo from "../../img/cat-star-2.svg";
import imgCatStarThree from "../../img/cat-star-3.svg";
import imgCatStarFour from "../../img/cat-star-4.svg";
import imgCatStarFive from "../../img/cat-star-5.svg";


const MemoryItem = ({selectedCategoryName, memory}) => {
    const navigate = useNavigate()
    const {setSelectedMemory} = useActions()

    function openItemPage() {
        localStorage.removeItem('itemId')
        localStorage.setItem('itemId', memory.id)
        setSelectedMemory(memory)
        navigate(ROUTE_MEMORY + `/${selectedCategoryName}/${memory.title}`)
    }

    return (
        <div
            className='memory-card'
            onClick={openItemPage}
        >
            <div className='img-box'>
                <img src={memory.img} alt={memory.title} />
            </div>
            <div className='text-box'>
                    <textarea
                        className='name'
                        value={memory.title}
                        readOnly={true}
                    />
            </div>
            <div className='rating-box'>
                <div className='rating-cat'>
                    {(memory.rating === 1) && <img src={imgCatStarOne} alt='cat-1' />}
                    {(memory.rating === 2) && <img src={imgCatStarTwo} alt='cat-2' />}
                    {(memory.rating === 3) && <img src={imgCatStarThree} alt='cat-3' />}
                    {(memory.rating === 4) && <img src={imgCatStarFour} alt='cat-4' />}
                    {(memory.rating === 5) && <img src={imgCatStarFive} alt='cat-5' />}
                </div>
                <div className='rating-stars'>
                    <input type="radio" id="star-5" name={`rating-${memory.id}`} value="5"
                           checked={memory.rating === 5}
                           readOnly={true}
                    />
                    <label htmlFor="star-5" title="Оцінка «5»">
                        <img src={imgRatingStar} alt='' />
                    </label>
                    <input type="radio" id="star-4" name={`rating-${memory.id}`} value="4"
                           checked={memory.rating === 4}
                           readOnly={true}
                    />
                    <label htmlFor="star-4" title="Оцінка «4»">
                        <img src={imgRatingStar} alt='' />
                    </label>
                    <input type="radio" id="star-3" name={`rating-${memory.id}`} value="3"
                           checked={memory.rating === 3}
                           readOnly={true}
                    />
                    <label htmlFor="star-3" title="Оцінка «3»">
                        <img src={imgRatingStar} alt='' />
                    </label>
                    <input type="radio" id="star-2" name={`rating-${memory.id}`} value="2"
                           checked={memory.rating === 2}
                           readOnly={true}
                    />
                    <label htmlFor="star-2" title="Оцінка «2»">
                        <img src={imgRatingStar} alt='' />
                    </label>
                    <input type="radio" id="star-1" name={`rating-${memory.id}`} value="1"
                           checked={memory.rating === 1}
                           readOnly={true}
                    />
                    <label htmlFor="star-1" title="Оцінка «1»">
                        <img src={imgRatingStar} alt='' />
                    </label>
                </div>
            </div>
            <div>
                <img className='left-sticker' src={imgSticker} alt='' />
            </div>
            <div>
                <img className='right-sticker' src={imgSticker} alt='' />
            </div>
        </div>
    );
};

export default MemoryItem;