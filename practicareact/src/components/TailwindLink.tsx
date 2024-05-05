import { Link } from 'react-router-dom';
interface TailwindLinkProps {
    text: string;
    to: string;
}
const TailwindLink = ({ text, to }: TailwindLinkProps) => {
    return (
        <Link  to={to} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
            {text}</Link>
    );
}

export default TailwindLink;