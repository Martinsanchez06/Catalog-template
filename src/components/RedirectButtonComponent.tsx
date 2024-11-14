import { Link } from 'react-router-dom';

interface ButtonProps {
    text: string;
    className?: string;
    imgPath?: string;
    link: string;
    blank?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, className, imgPath, link, blank }) => {
    return (
        <Link className={`button justify-center items-center flex ${className}`} to={link} target={blank ? "_blank" : "_self"}>
            <p>{text}</p>
            {imgPath && <img src={imgPath} alt="" />}
        </Link>
    );
}

export default Button;
