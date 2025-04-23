import { Link } from 'next-view-transitions';

export default function Navbar() {
  return (
    <nav className='flex flex-row gap-4 p-4 bg-gray-200'>
      <Link className='hover:bg-gray-300' href="/">Home</Link>
      <Link className='hover:bg-gray-300' href="/about">Sobre</Link>
      <Link className='hover:bg-gray-300' href="/contato">Contato</Link>
      <Link className='hover:bg-gray-300' href="/pdf">PDF</Link>
    </nav>
  );
}
