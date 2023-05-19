import { Link } from 'react-router-dom'
export default function Nav () {
    return (
        <>
        
        <nav className='bg-black text-secondary font-sans text-xl' >
            <ul className='flex flex-row justify-start items-center' >
            <Link to="/" ><li className='m-2'>Home</li></Link>
            <Link to="/about"><li className='m-2'>About</li></Link>
            <Link to="/projects"><li className='m-2'>Projects</li></Link>
            <li className='m-2'><a href='https://github.com/jimcreel'><img src='../../src/assets/img/github-mark-white.svg' className='w-[25px]'/></a></li>
            <li className='m-2'><a href='https://www.linkedin.com/in/jim-creel'><img src='../../src/assets/img/icons8-linkedin.svg' className='w-[25px]'/></a></li>
            <li className='m-2'><a href='mailto: jim.creel@gmail.com'><img src='../../src/assets/img/Aiga_mail_white.svg.png' className='w-[25px]'/></a></li>
            
            </ul>
            
        </nav>
        
        </>
    )
}