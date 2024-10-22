import React from "react";
import Link from "next/link";

export default function Categories(){  
return(
<><div className='container'><div><h1>Categories</h1>
<h2>Choose from the following categories:</h2></div>
<Link className="button"href="quiz/history">History</Link>
<Link className="button"href="quiz/science">Science</Link>
<Link className="button"href="/">Homepage</Link>
</div>
</>
)
}
