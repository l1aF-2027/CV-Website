import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
// Arrow function component React
const Header = () => {
  return (
    // Thẻ header với các class Tailwind
    <header className="fixed top-0 left-0 w-full py-8 xl:py-12 text-white">
      {/* py-8: padding trên dưới 2rem (32px)
        xl:py-12: padding 3rem (48px) trên màn xl trở lên
        text-white: màu chữ trắng
        bg-pink-50/20: màu nền hồng nhạt với độ trong suốt 20% */}

      {/* Container căn giữa nội dung */}
      <div className="container mx-auto flex justify-between items-center">
        {/* container: width tự động theo breakpoint
          max-auto: margin trái phải auto để căn giữa */}
        {/* logo */}
        <Link href="/">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
            <h1 className="text-4xl font-semibold">
              Huy Hoang<span className="text-accent">.</span>
            </h1>
          </div>
        </Link>

        {/* desktop nav */}
        <div className="hidden xl:flex items-center gap-8 bg-slate-800/50 backdrop-blur-sm rounded-xl px-8 py-2">
          <Nav />
          <Link href="#contact">
            <Button>Hire me</Button>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="xl:hidden bg-slate-800/50 backdrop-blur-sm rounded-lg p-2">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
