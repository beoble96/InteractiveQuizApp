import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
    

export default function Id(){  
    
    const router = useRouter();
  
    // Get the dynamic page path and query
    const currentUrl = router.asPath;
    
    const category= currentUrl.split("/").reverse()[0];




return(<>
<h1>{category.charAt(0).toUpperCase()+category.slice(1)} category.</h1>

<h2>To start the quiz click on the button "Start"</h2>
<h2>Good luck!</h2>
        
          <Link className="button"href={`/quiz/${category}/question/${category}`}>
            Start
          </Link>
          <Link className="button"href="/">Homepage</Link>
</>
)

} 
