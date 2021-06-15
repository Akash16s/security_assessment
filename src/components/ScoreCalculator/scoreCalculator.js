import React, { useState, useEffect } from 'react';
import './scoreCalculator.css';
import DropDown from '../DropDown/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const ScoreCalculator = () => {

    const [techniques, setTechniques] = useState([]);

    const getTechniques = async () => {
        let items = JSON.parse(localStorage.getItem('techniques'));
        return items;
    }

    const findScore = () =>{
        let items = JSON.parse(localStorage.getItem('successfulTactics'));
        console.log(items);
    }

    useEffect(() => {
        getTechniques().then(async (data) => {
            setTechniques(data);
        });
    }, [])

    return (
        <div className='scoreCalculator'>
            <p>
                Calculate Your Score
            </p>
            <button className='seeMoreBtn' onClick={() => findScore()} >FIND MY SCORE</button>
            <section className='techniqueTiles'>
                {
                    techniques.map((item) => (
                        <div key={item.techniqueId}>
                            <DropDown tactics={item.tactics} clicked={false} techniqueName={item.techniqueName}/>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default ScoreCalculator;




