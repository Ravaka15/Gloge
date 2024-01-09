import React from 'react';
import { Card } from 'react-bootstrap';
import '../../assets/style/Cards.css';
import { CardsData } from '../../layout/CustomMenu';
import '../../layout/CustomMenu';


const Cards = () => {
  return (
    <div className='Cards'>
        {CardsData.map((card, id)=>{
            return(
                <div className='parentContainer'>
                    <Card
                    title={card.title}
                    color={card.color}
                    // barValue={card.barValue}
                    value={card.value}
                    // png={card.png}
                    series={card.series}
                    />
                </div>
            )
        })}
    </div>
  )
}

export default Cards
