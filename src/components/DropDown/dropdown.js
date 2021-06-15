import React, { useState, useEffect } from 'react';
import './dropdown.css';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form';


const successfulTacticsList = []

const DropDown = (props) => {   
    
    const getTechniques = async () => {
        let items = JSON.parse(localStorage.getItem('techniques'));
        return items;
    }

    const [clicked,setClicked] = useState(props.clicked);

    const handleClicked = ()=>{
        setClicked(!clicked);
    }

    const handleCheckBox = async (id) => {
        const localData = await getTechniques();
        let techniqueArray = localData.filter(function (t) {
            return t.techniqueName === props.techniqueName;
        });
        let tacticItem = techniqueArray[0].tactics.filter(function (t) {
            return t.tacticId === id;
        });
       successfulTacticsList.push(tacticItem[0]);
       localStorage.setItem('successfulTactics', JSON.stringify(successfulTacticsList));
    }

    return (

        <div>
            <div onClick={handleClicked} className='techniqueName'>
                {props.techniqueName}
              {clicked ?  <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
            </div>
            {
                clicked ? <article className='tactic'>
                    {
                        props.tactics.map((tactic) =>
                        (
                            <div key={tactic.tacticId} className='tacticsList'>
                                {tactic.tacticName}
                                <Form>
                                    <Form.Check aria-label="option 1" onChange={() => handleCheckBox(tactic.tacticId)} />
                                </Form>
                            </div>
                        )
                        )
                    }
                </article> : null
            }
        </div>

    )
}

export default DropDown;