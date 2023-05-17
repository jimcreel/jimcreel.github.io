import {Card} from 'react-bootstrap';

export default function History() {
    return (
        <>
        <div className='flex justify-'>
            <Card className='border-2 border-accent w-1/3 text-accent shadow-sm rounded p-5 m-2'>
                <Card.Body>
                    <Card.Title className='text-center text-xl'>Humanities</Card.Title>
                    <Card.Text>
                        <p>I started my career
                             as an Assistant Professor of English at the
                             University of Wyoming. While there, I taught
                              tech writing, horror film, and video games.
                              I published my research in several academic
                              journals across the world, and wrote a book
                              about how the images and words we see in the world 
                              tell us about who we are.</p>
                    </Card.Text>
                </Card.Body>
                

            </Card>
            <Card className='border-2 border-accent w-1/3 text-accent shadow-sm rounded p-5 m-2'>
                <Card.Body>
                    <Card.Title className='text-center text-xl'>Tech</Card.Title>
                    <Card.Text>
                        <p>While my first career was in humanities, I always
                            had one eye on the tech world. I am an avid gamer, 
                            and I love to tinker with computers. I built my first
                            computer in 1998, and I have been building them ever 
                            since. When the COVID-19 pandemic hit, I taught myself 
                            Python and the concrete outcomes of a potential web 
                            developer career enticed me to make a career change. 
                            I enrolled in General Assembly's Software Engineering 
                            Immersive program, and am ready now to transition
                            to a new career.
                        </p>
                    </Card.Text>
                </Card.Body>
                

            </Card>
            <Card className='border-2 border-accent w-1/3 text-accent shadow-sm rounded p-5 m-2'>
                <Card.Body>
                    <Card.Title className='text-center text-xl'>Personal</Card.Title>
                    <Card.Text>
                        <p>My family and I moved to Southern California where we enjoy
                            the beach, mountain biking, baseball, and Disneyland. I am
                            open to work in and around Riverside, Orange, and San Diego
                            counties. I am also open to remote work.
                        </p>
                    </Card.Text>
                </Card.Body>
                

            </Card>
        </div>
        </>
    )
}