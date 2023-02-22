import React from 'react';
import {useSelector} from "react-redux";

const MemorySelect = ({defaultValue, sortSelectedMemories}) => {
    const {options, selectedSort} = useSelector(state => state.memoryReducer)


    return (
        <select
            className='memories-select'
            value={selectedSort}
            onChange={e => sortSelectedMemories(e.target.value)}
        >
            <option disabled value=''>{defaultValue}</option>
            {options.map(option =>
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MemorySelect;