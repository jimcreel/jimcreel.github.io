import {Card} from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';

export default function History() {
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
        <div className='flex flex-row flex-wrap justify-center'>
            <ReactCardFlip 
            isFlipped={isFlipped[0]} 
            flipDirection="horizontal"
            className = "w-[200px]"
            >
                <div className="border-2 border-secondary w-[200px]  text-accent shadow-sm rounded p-5 m-2 text-center">
                <button onClick={handleClick(0)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-40 h-40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>

                    <p className="text-accent text-2xl"> Humanities</p>
                    </button>
                </div>
                <div className="border-2 border-secondary  w-[200px] text-accent shadow-sm rounded p-5 m-2">
                <button onClick={handleClick(0)}>
                <p>I started my career
                             as an Assistant Professor of English at the
                             University of Wyoming. While there, I taught
                              tech writing, horror film, and video games.
                              I published my research in several academic
                              journals across the world, and wrote a book
                              about how the images and words we see in the world 
                              tell us about who we are.</p>
                    </button>
                </div>
            </ReactCardFlip>
        
            <ReactCardFlip 
            isFlipped={isFlipped[1]} 
            flipDirection="horizontal"
            className = "w-[200px]"
            >
                <div className="border-2 border-secondary w-[200px]  text-accent shadow-sm rounded p-5 m-2">
                <button onClick={handleClick(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-40 h-40">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                </svg>

                    <p className="text-accent text-2xl"> Tech</p>
                    </button>
                </div>
                <div className="border-2 border-secondary  w-[200px] text-accent shadow-sm rounded p-5 m-2">
                <button onClick={handleClick(1)}>
                <p>While my first career was in humanities, I always
                            had one eye on the tech world. I am an avid gamer, 
                            and I love to tinker with computers. I built my first
                            computer in 1998, and I have been building them ever 
                            since. When the COVID-19 pandemic hit, I taught myself 
                            Python and the concrete outcomes of a potential web 
                            developer career enticed me to make a career change. 
                            I enrolled in General Assembly's Software Engineering 
                            Immersive program, and am ready now to transition
                            to a new career.</p>
                    </button>
                </div>
            </ReactCardFlip>
            
            <ReactCardFlip 
            isFlipped={isFlipped[2]} 
            flipDirection="horizontal"
            className = "w-[200px]"
            >
                <div className="border-2 border-secondary w-[200px]  text-accent shadow-sm rounded p-5 m-2">
                <button onClick={handleClick(2)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-40 h-40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                </svg>

                    <p className="text-accent text-2xl"> Personal</p>
                    </button>
                </div>
                <div className="border-2 border-secondary  w-[200px] text-accent shadow-sm rounded p-5 m-2">
                <button onClick={handleClick(2)}>
                <p>My family and I moved to Southern California where we enjoy
                            the beach, legos, mountain biking, baseball, and Disneyland. I am
                            open to work in and around Riverside, Orange, and San Diego
                            counties. I am also open to remote work. Most importantly, 
                            I want a challenging environment that values my unique skillset.</p>
                    </button>
                </div>
            </ReactCardFlip>
                

        </div>
        </>
    )
}