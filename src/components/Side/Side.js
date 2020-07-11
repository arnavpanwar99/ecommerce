import React from 'react';

import s from './Side.module.scss';

const Side = ({
    onChangePrice,
    minPrice,
    maxPrice,
    rating,
    onChangeRating,
    onChangeDelivery,
    delivery,
    onChangeSort,
    sortObject
}) => {

    const { value, order } = sortObject;

    return(
        <section className={s.main}>
            <div className={s.main_child}>
                <h2 className={s.main_child_heading}>Filter</h2>
                <h3 className={s.main_child_sub}>Price</h3>
                <div className={s.main_child_inputHolder}>
                    <input
                     className={s.main_child_inputHolder_input} 
                     required 
                     type='number' 
                     min={0}
                     value={minPrice}
                     onChange={(e) => onChangePrice(e, true)} 
                     maxLength={4}
                     max={1000} 
                     placeholder='Min'
                    />
                    <hr className={s.main_child_inputHolder_line} />
                    <input
                     className={s.main_child_inputHolder_input} 
                     required
                     type='number' 
                     min={0} 
                     value={maxPrice}
                     onChange={(e) => onChangePrice(e)}
                     max={1000} 
                     placeholder='Max' 
                    />
                </div>
                <h3 className={s.main_child_sub}>Ratings</h3>
                <input
                 className={s.main_child_inputHolder_input} 
                 required 
                 type='number' 
                 min={0} 
                 step={.1}
                 max={4.9} 
                 onChange={onChangeRating}
                 value={rating}
                 placeholder='Min Rating'
                />
                <div className={s.main_child_checkHolder}>
                    <input 
                     id='delivery'
                     checked={delivery}
                     onChange={onChangeDelivery} 
                     className={s.main_child_checkHolder_input} 
                     name='delivery' 
                     type='checkbox' 
                    />
                    <label htmlFor='delivery' className={s.main_child_checkHolder_label}>Free Delivery</label>
                </div>
            </div>
            <div className={s.main_child}>
                <h2 className={s.main_child_heading}>Sort</h2>
                <h3 className={s.main_child_sub}>Price</h3>
                <div className={s.main_child_checkHolder}>
                    <input
                     id='price_asc'
                     checked={value === 'price' && order === 'asc'} 
                     className={s.main_child_checkHolder_input} 
                     onChange={() => onChangeSort('price', 'asc')}
                     name='price_asc' 
                     type='checkbox' 
                    />
                    <label htmlFor='price_asc' className={s.main_child_checkHolder_label}>Low To High</label>
                </div><div className={s.main_child_checkHolder}>
                    <input 
                     id='price_des' 
                     checked={value === 'price' && order === 'des'}
                     onChange={() => onChangeSort('price', 'des')}
                     className={s.main_child_checkHolder_input} 
                     name='price_des' 
                     type='checkbox' 
                    />
                    <label htmlFor='price_des' className={s.main_child_checkHolder_label}>High To Low</label>
                </div>
                <h3 className={s.main_child_sub}>Rating</h3>
                <div className={s.main_child_checkHolder}>
                    <input
                     id='rating_asc' 
                     checked={value === 'rating' && order === 'asc'}
                     onChange={() => onChangeSort('rating', 'asc')}
                     className={s.main_child_checkHolder_input} 
                     name='rating_asc' 
                     type='checkbox' 
                    />
                    <label htmlFor='rating_asc' className={s.main_child_checkHolder_label}>Low To High</label>
                </div><div className={s.main_child_checkHolder}>
                    <input 
                     id='rating_des' 
                     checked={value === 'rating' && order === 'des'}
                     onChange={() => onChangeSort('rating', 'des')}
                     className={s.main_child_checkHolder_input} 
                     name='rating_des' 
                     type='checkbox' 
                    />
                    <label htmlFor='rating_des' className={s.main_child_checkHolder_label}>High To Low</label>
                </div>
            </div>
        </section>
    )
};

export default  Side;