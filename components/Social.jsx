import Link from 'next/link'
import path from 'path';
import { FaGithub, FaLinkedinIn, FaFacebook, FaEnvelope } from 'react-icons/fa'

const socials = [
    { icon: <FaEnvelope />, path: 'mailto:ha.huy.hoang.tkl@gmail.com' },
    { icon: <FaGithub />, path: 'https://github.com/l1aF-2027' },
    { icon: <FaLinkedinIn />, path: 'https://www.linkedin.com/in/hoang-huy-6b77a12a8/' },
    { icon: <FaFacebook />, path: 'https://www.facebook.com/profile.php?id=100008454588441' },
]
const Social = ({ containerStyles, iconStyles }) => {
    return (
        <div className={containerStyles}>
            {socials.map((item, index) => {
                return <Link key={index} href={item.path} target="_blank" rel="noopener noreferrer" className={iconStyles}>{item.icon}</Link>
            })}
        </div>
    );
};

export default Social;