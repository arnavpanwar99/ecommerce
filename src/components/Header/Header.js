import React from 'react';

import s from './Header.module.scss';

const Header = ({onSearchStringChange, searchString}) => {
    return(
        <header className={s.main}>
            <h1 className={s.main_box}>
                t-Shirt Mart
            </h1>
            <div className={s.main_search}>
                <input 
                 placeholder='Search in brand or description' 
                 className={s.main_search_input} 
                 onChange={onSearchStringChange}
                 value={searchString}
                />
            </div>
        </header>
    )
}

export default Header;