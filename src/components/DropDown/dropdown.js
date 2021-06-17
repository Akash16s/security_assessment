import React, { useState } from 'react';
import './dropdown.css';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { Checkbox } from 'pretty-checkbox-react';

const successfulTacticsList = []

const DropDown = (props) => {

    const getTechniques = async () => {
        let items = JSON.parse(localStorage.getItem('techniques'));
        return items;
    }
    // const getTacticsStatusData = async () => {
    //     let items = JSON.parse(localStorage.getItem('tacticsStatus'));
    //     return items;
    // }

    const [clicked, setClicked] = useState(props.clicked);

    const handleClicked = () => {
        setClicked(!clicked);
    }

    const handleCheckBox = async (id,status) => {

    //     const tacticsStatusData = await getTacticsStatusData();

    //     if(tacticsStatusData!==null){
    //     tacticsStatusData.map( (item) => {
    //         if(item.tacticId === id){
    //             console.log(localStorage[item]);
    //         }
    //     });
    // }

        const localData = await getTechniques();
        let techniqueArray = localData.filter(function (t) {
            return t.techniqueName === props.techniqueName;
        });
        let tacticItem = techniqueArray[0].tactics.filter(function (t) {
            return t.tacticId === id;
        });
        tacticItem[0].status = status;
        successfulTacticsList.push(tacticItem[0]);
        localStorage.setItem('tacticsStatus', JSON.stringify(successfulTacticsList));
    }

    return (

        <div>
            <div onClick={handleClicked} className='techniqueName'>
                {props.techniqueName}
                {clicked ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
            </div>
            {
                clicked ? <article className='tactic'>
                    {
                        props.tactics.map((tactic) =>
                        (
                            <div key={tactic.tacticId} className='tacticsList'>
                                {tactic.tacticName}
                                <div>
                                <Checkbox onClick={()=>handleCheckBox(tactic.tacticId,"Success")} color="success" icon={<i className="mdi mdi-check" />} animation="smooth" />
                                <Checkbox onClick={()=>handleCheckBox(tactic.tacticId,"Failed")} color="danger-o" icon={<i className="mdi mdi-close" />} animation="smooth" />
                                </div>
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