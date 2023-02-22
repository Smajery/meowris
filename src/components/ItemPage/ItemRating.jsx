import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";

const ItemRating = () => {
    const {selectedMemory} = useSelector(state => state.memoryReducer)
    const {setSelectedMemoryRating} = useActions()

    const [ratingFive, setRatingFive] = useState(false)
    const [ratingFour, setRatingFour] = useState(false)
    const [ratingThree, setRatingThree] = useState(false)
    const [ratingTwo, setRatingTwo] = useState(false)
    const [ratingOne, setRatingOne] = useState(false)

    const setRating = useCallback(() => {
        setRatingFive(selectedMemory.rating === 5)
        setRatingFour(selectedMemory.rating === 4)
        setRatingThree(selectedMemory.rating === 3)
        setRatingTwo(selectedMemory.rating === 2)
        setRatingOne(selectedMemory.rating === 1)
    }, [selectedMemory.rating])

    useEffect(() => {
        setRating()
    }, [setRating])

    const currentRatingIsOne = () => {
        setRatingFive(false)
        setRatingFour(false)
        setRatingThree(false)
        setRatingTwo(false)
        setRatingOne(true)
        setSelectedMemoryRating(1)
    }
    const currentRatingIsTwo = () => {
        setRatingFive(false)
        setRatingFour(false)
        setRatingThree(false)
        setRatingOne(false)
        setRatingTwo(true)
        setSelectedMemoryRating(2)
    }
    const currentRatingIsThree = () => {
        setRatingFive(false)
        setRatingFour(false)
        setRatingTwo(false)
        setRatingOne(false)
        setRatingThree(true)
        setSelectedMemoryRating(3)
    }
    const currentRatingIsFour = () => {
        setRatingFive(false)
        setRatingThree(false)
        setRatingTwo(false)
        setRatingOne(false)
        setRatingFour(true)
        setSelectedMemoryRating(4)
    }
    const currentRatingIsFive = () => {
        setRatingFour(false)
        setRatingThree(false)
        setRatingOne(false)
        setRatingTwo(false)
        setRatingFive(true)
        setSelectedMemoryRating(5)
    }

    return (
        <div className='item-rating'>
            <input type="radio" id="star-5" name={`rating-${selectedMemory.id}`} value="5"
                   checked={ratingFive}
                   onChange={currentRatingIsFive}
            />
            <label htmlFor="star-5" title="Оцінка «5»"/>
            <input type="radio" id="star-4" name={`rating-${selectedMemory.id}`} value="4"
                   checked={ratingFour}
                   onChange={currentRatingIsFour}
            />
            <label htmlFor="star-4" title="Оцінка «4»"/>
            <input type="radio" id="star-3" name={`rating-${selectedMemory.id}`} value="3"
                   checked={ratingThree}
                   onChange={currentRatingIsThree}
            />
            <label htmlFor="star-3" title="Оцінка «3»"/>
            <input type="radio" id="star-2" name={`rating-${selectedMemory.id}`} value="2"
                   checked={ratingTwo}
                   onChange={currentRatingIsTwo}
            />
            <label htmlFor="star-2" title="Оцінка «2»"/>
            <input type="radio" id="star-1" name={`rating-${selectedMemory.id}`} value="1"
                   checked={ratingOne}
                   onChange={currentRatingIsOne}
            />
            <label htmlFor="star-1" title="Оцінка «1»"/>
        </div>
    );
};

export default ItemRating;