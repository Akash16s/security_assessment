import React, { useState, useEffect } from 'react';
import './scoreCalculator.css';
import DropDown from '../DropDown/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Score from "react-score-indicator";
import ReactSpeedometer from "react-d3-speedometer"

const ScoreCalculator = () => {

    const assesmentMessages = {
        0: " You're too safe! Increase the pay of your security guys. Seriously. ",
        1: "Kudos! Nice job keeping your firm safe.",
        2: "Security alright. But, put your security guys to work right now.",
        3: "You're in dangerous waters. This is a severe risk stage. Up your security game!",
        // 4: "bsdk band karde company, kuchh na hona tumhara."
        4: "Your security system requires extreme remediation."
    }

    const coverageMessage = 'Coverage Score represents the total coverage done on the system. For better Protection Score use as many tactics as you can';


    const [techniques, setTechniques] = useState([]);

    const [showResults, setShowResults] = useState(false);

    const [assesmentScore, setAssesmentScore] = useState(0)

    const [coverageScore, setCoverageScore] = useState(0)

    const [scoreCategory, setScoreCategory] = useState(true)

    const getTechniques = async () => {
        let items = JSON.parse(localStorage.getItem('techniques'));
        return items;
    }

    const findMyScore = () => {
        let tactis = JSON.parse(localStorage.getItem('tacticsStatus'));
        if (tactis === null) {
            alert('please select tactics first');
        }
        else {
            setAssesmentScore(Math.round(findScore(tactis)));
            setShowResults(true);
            setCoverageScore(Math.round((tactis.length / 560) * 100));
        }
    }

    const changeScoreCategory = () => {
        setScoreCategory(!scoreCategory);
    }

    const goBackBtn = () => setShowResults(false);

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
            <button className='seeMoreBtn' onClick={() => findMyScore()} >FIND MY SCORE</button>
            <section className='techniqueTiles'>
                {
                    techniques.map((item) => (
                        <div key={item.techniqueId}>
                            <DropDown tactics={item.tactics} clicked={false} techniqueName={item.techniqueName} />
                        </div>
                    ))
                }
            </section>
            <section className={showResults ? "results-overlay showResults transparentBcg " : "results-overlay"}>
                <div className={showResults ? "results-page showResults" : "results-page"}>
                    <h3>Your Protection Score</h3>
                    <article className="scoreCategories">
                        <div onClick={changeScoreCategory}>
                            <h4>Score by Assesment</h4>
                            {
                                scoreCategory ? <div className='bar'></div> : null
                            }

                        </div>
                        <div onClick={changeScoreCategory}>
                            <h4>Score by Coverage</h4>
                            {
                                scoreCategory ? null : <div className='bar'></div>
                            }
                        </div>
                    </article>
                    {
                        scoreCategory ?

                            //    SCORE BY ASSESMENT
                            <ReactSpeedometer
                                value={assesmentScore}
                                minValue={0}
                                maxValue={100}
                                width={400}
                                segments={10}
                                needleColor={'#1487b1'}
                                needleTransition={'easeBounceInOut'}
                                needleHeightRatio={0.8}
                                needleTransitionDuration={1000}
                                valueTextFontSize={'20px'}
                                ringWidth={30}
                                forceRender={true}
                            />
                            :
                            //    SCORE BY COVERAGE  
                            <Score
                                value={coverageScore}
                                lineGap={1}
                                maxValue={100}
                                width={300}
                                borderWidth={10}
                                gap={1}
                                maxAngle={260}
                                rotation={90}
                            // stepsColors={colors}
                            />

                    }
                    <p>
                        {
                            scoreCategory ?
                                assesmentScore >=90 ? assesmentMessages[0] : //vh
                                assesmentScore < 90 && assesmentScore >=70 ? assesmentMessages[1] : //h
                                assesmentScore < 70 && assesmentScore >=30 ? assesmentMessages[2] : //m
                                assesmentScore < 30 && assesmentScore >=10 ? assesmentMessages[3] : //l
                                assesmentMessages[4] //vl

                                : coverageMessage
                        }
                    </p>
                    <button className='seeMoreBtn' onClick={goBackBtn}>Go Back</button>
                </div>
            </section>
        </div>
    )
}

const findScore = (tactics) => {

    // const protectionScoreCategories = {
    //     'VH' : 1,
    //     'H' : 0.8,
    //     'M' : 0.5,
    //     'L' : 0.2,
    //     'VL' : 0.1,
    // }

    const protectionCategorySuccessWeights = {
        'High': 9,
        'Medium': 5,
        'Low': 1,
    };

    const protectionCategoryFailureWeights = {
        'High': 9.5,
        'Medium': 5.5,
        'Low': 1.5,
    };
    var protectionScoreSum = 0;
    var weightSum = 0;
    var finalResult = 0;

    tactics.map((item) => {
        var result = 0;
        if (item.status === 'Success') {
            let expScore = ((protectionCategorySuccessWeights[item.Exploitability] / 1.1) - 5)
            let impScore = ((protectionCategorySuccessWeights[item.Impact] / 1.1) - 5)
            result = ((Math.pow(expScore, 3)) - (Math.pow(impScore, 3)) + 100) / 2;

            if (result >= 90) {
                //very high
                result = result * 1;
                weightSum += 1;

            } else if (result < 90 && result >= 70) {
                //high
                result = result * 0.8;
                weightSum += 0.8;

            } else if (result < 70 && result >= 30) {
                //medium
                result = result * 0.5;
                weightSum += 0.5;

            } else if (result < 30 && result >= 10) {
                //low
                result = result * 0.2;
                weightSum += 0.2;

            } else if (result < 10) {
                //very low
                result = result * 0.1;
                weightSum += 0.1;

            }

            protectionScoreSum += result;

        }
        if (item.status === 'Failed') {
            let expScore = ((protectionCategoryFailureWeights[item.Exploitability] / 1.1) - 5)
            let impScore = ((protectionCategoryFailureWeights[item.Impact] / 1.1) - 5)
            result = ((Math.pow(expScore, 3)) - (Math.pow(impScore, 3)) + 100) / 2;

            if (result >= 90) {
                //very high
                result = result * 1;
                weightSum += 1;

            } else if (result < 90 && result >= 70) {
                //high
                result = result * 0.8;
                weightSum += 0.8;

            } else if (result < 70 && result >= 30) {
                //medium
                result = result * 0.5;
                weightSum += 0.5;

            } else if (result < 30 && result >= 10) {
                //low
                result = result * 0.2;
                weightSum += 0.2;

            } else if (result < 10) {
                //very low
                result = result * 0.1;
                weightSum += 0.1;
            }
            protectionScoreSum += result;

        }
    });

    finalResult = protectionScoreSum / weightSum;
    return finalResult;
}

export default ScoreCalculator;
