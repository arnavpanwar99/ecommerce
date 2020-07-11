import React from 'react';

import s from './Main.module.scss';

const splitDescription = (des) => {
    const desArray = des.split(" ");
    if(desArray[5]){
        desArray[5] = '///';
        return desArray.join(" ").split("///")[0]+"...";
    }else{
        return des;
    }
}

const Main = ({products}) => {
    return(
        <main className={s.main}>
            {products.map(p => {
                const { image, selection2, selection4, selection3 = 'N/A', selection5 = 'Charges ' } = p;

                return (
                <div className={s.main_card} key={image}>
                    <div className={s.main_card_imageHolder}>
                        <img src={image} className={s.main_card_imageHolder_image}></img>
                    </div>
                    <span className={s.main_card_brand}>{selection2[0].name}</span>
                    <span className={s.main_card_des}>{splitDescription(selection2[1].name)}</span>
                    <span className={s.main_card_price}>₹{selection4}</span>
                    <div className={s.main_card_plate}>
                        <span className={s.main_card_plate_rating}>Rating: {selection3}</span>
                        <span className={s.main_card_plate_delivery}>Delivery: {selection5.split(" ")[0]}</span>
                    </div>
                </div>
                )
            })}
        </main>
    )
};

export default Main;