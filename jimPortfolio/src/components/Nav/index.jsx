import { Link } from 'react-router-dom'
export default function Nav () {
    return (
        <>
        <div >
        <nav className='bg-black text-secondary font-sans text-xl' >
            <ul className='flex flex-row justify-start'>
            <Link to="/home" ><li className='m-2'>Home</li></Link>
            <Link to="/about"><li className='m-2'>About</li></Link>
            <Link to="/projects"><li className='m-2'>Projects</li></Link>
            </ul>
        </nav>
        </div>
        </>
    )
}