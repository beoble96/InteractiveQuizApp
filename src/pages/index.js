import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <main>
    <h1>Welcome to my quiz app!</h1>
    <h2>It's time to test your knowledge!</h2>
 <h2>   I wish you the best of the luck!
    
    
  
    
    
    </h2>
    
    <Link className="button"href="./categories">Category</Link>
    <Link className="button"href="./newQuestion">Add a new question</Link>
    </main>
  );
}
