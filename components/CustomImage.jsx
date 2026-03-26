import Image from "next/image";

const CustomImage = ({ src, alt, ...props }) => {
    return <Image src={src} alt={alt} {...props} />;
};

export default CustomImage;
