import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';


export default function ProjectsPage() {
    const [isFlipped, setIsFlipped] = useState([false, false, false]);
    function handleClick (ind) {
        return function () {
            let newIsFlipped = [...isFlipped];
            newIsFlipped[ind] = !newIsFlipped[ind];
            setIsFlipped(newIsFlipped);
        }   
    }
    return (
        <>
        <div >
            <h1 className="font-bold text-5xl text-secondary text-center p-20"> Projects</h1>
            <div className='flex flex-row flex-wrap justify-center'>
            <ReactCardFlip 
            isFlipped={isFlipped[0]} 
            flipDirection="horizontal"
            className = "w-[200px]"
            >
                <div className="border-2 border-secondary w-[200px]  text-accent shadow-sm rounded p-5 m-2 text-center">
                <button onClick={handleClick(0)}>
                <img src='../../src/assets/img/Disneyland.png ' className='w-[250px] h-[100px]'/>

                    </button>
                </div>
                <div className="border-2 border-secondary  w-[200px] text-accent shadow-sm rounded p-5 m-2 flex flex-col align-center">
                <button onClick={handleClick(0)}>
                <p>The Disney reservation checker is a MEN stack app built with the Bootstrap CSS library. 
                    The site pulls publicly available reservation data from Disney websites and displays it for the
                      user filtered by resort, park, date, and annual pass. Requires a Google account to use</p>
                    </button>
                    <a href='https://magic-reservations.herokuapp.com/' target='_blank' className="m-auto"><button className='border-2 border-accent rounded p-1'>Visit the Site</button></a>
                
                </div>
            </ReactCardFlip>
        
            <ReactCardFlip 
            isFlipped={isFlipped[1]} 
            flipDirection="horizontal"
            className = "w-[200px] flex flex-row justify-center"
            >
                <div className="border-2 border-secondary w-[200px]  text-accent shadow-sm rounded p-5 m-2">
                <button onClick={handleClick(1)}>
                <img src='../../src/assets/img/Lego.png' className='w-[250px] h-[100px]'/>

                    </button>
                </div>
                <div className="border-2 border-secondary  w-[200px] text-accent shadow-sm rounded p-5 m-2 flex flex-col align-center">
                <button onClick={handleClick(1)}>
                <p>Brick By Brick is a Django/Python LEGO inventory site powered by a postgreSQL database, 
                    where you can track your LEGO sets and parts.</p>
                    </button>
                <a href='https://brickbybrick.herokuapp.com/' target='_blank' className="m-auto"><button className='border-2 border-accent rounded p-1'>Visit the Site</button></a>
                </div>
            </ReactCardFlip>
            
            <ReactCardFlip 
            isFlipped={isFlipped[2]} 
            flipDirection="horizontal"
            className = "w-[200px]"
            >
                <div className="border-2 border-secondary w-[200px]  text-accent shadow-sm rounded p-5 m-2">
                <button onClick={handleClick(2)}>
                <img src='../../src/assets/img/mlb.png' className='w-[250px] h-[100px]'/>

                    
                    </button>
                </div>
                <div className="border-2 border-secondary  w-[200px] text-accent shadow-sm rounded p-5 m-2 flex flex-col align-center">
                <button onClick={handleClick(2)}>
                <p>MLB Info is a dynamic single page ReactJS site styled with Tailwind and powered by an 
                    ExpressJS, NodeJS, and MongoDB backend.</p>
                    </button>
                    <a href='https://mlbinfo.herokuapp.com/' target='_blank' className="m-auto"><button className='border-2 border-accent rounded p-1'>Visit the Site</button></a>
                
                </div>
            </ReactCardFlip>
                
        </div>
        </div>
        </>
    )
}