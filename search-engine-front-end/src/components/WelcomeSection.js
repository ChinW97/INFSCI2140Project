import React, {useState, useEffect}  from 'react';
import { Button } from './Button';
import './WelcomeSection.css';
import '../App.css';
import Alert from 'react-popup-alert'
import userEvent from '@testing-library/user-event';

const renderResult = (item, i) => {
    let info = item.split(' ');
    let courseNum = info[0] + ' ' + info[1];
    let size = info.length;

    return (<li key={i}> 
    <p>Course Num: {courseNum}</p>
    <p>Course Title: {info.slice(2,size).join(' ')}</p>
    <p>Description: N/A</p>
    </li>)
};

function WelcomeSection() {
    const [keywords, setKeywords] = useState("");
    const [results, setResult] = useState([]);
    // const [visibleMsg, setVisibleMsg] = useState(false);

    const handleSearch = async () => {
        try {
            const apiResponseObj = await fetch(
              "http://localhost:3001/api", {method:'POST', headers: {
                "Content-Type": "application/json",},
                body: JSON.stringify({terms: keywords})}
            );
            const apiResponse = await apiResponseObj.json();
            setResult(apiResponse.data);
            
          } catch (err) {
            console.log(err);
          }
    };

    return (
        <div className='welcome-container'>
            <video src='/videos/video-2.mp4' autoPlay loop muted/>
            <h1>Welcome!</h1>
            <div className='welcome-btns'>
                {/* <Button className='btn' 
                buttonStyle='btn--outline'
                buttonSize='btn--large'>
                    Get Started
                </Button> */}

                {/* <Button className='btn' 
                buttonStyle='btn--outline'
                buttonSize='btn--medium'>
                    Search
                </Button> */}
            </div>
            
            <div className='search-container'>
                <input placeholder="Enter keywords"
                onChange={event =>{setKeywords(event.target.value)}}
                onKeyDown={(event)=>{
                    if(event.key === 'Enter'){
                        if(keywords.length > 0){
                            handleSearch();
                        }else{
                            setResult([]);
                        };
                    }
                    
                }}
                />

                {/* <Button className='btn' 
                buttonStyle='btn--outline'
                buttonSize='btn--medium'
                onClick={()=>{console.log(keywords)}}>
                    Search
                </Button> */}
            </div>

            <div className='display-window'>
                <ul className='result-container'>
                    {results.map((item, i) => renderResult(item, i))}
                </ul>
            </div>
            
            

        </div>

        
    )
}

export default WelcomeSection
