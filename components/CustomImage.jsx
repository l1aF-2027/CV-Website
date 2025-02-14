import { useState } from "react";
import Image from "next/image";

const CustomImage = ({ src, alt, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        if (!imgSrc.startsWith("./")) {
            setImgSrc(`./${src}`);
        }
    };

    return <Image src={imgSrc} alt={alt} onError={handleError} {...props} />;
};

export default CustomImage;