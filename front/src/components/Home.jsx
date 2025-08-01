import { useEffect,useState } from "react";
import axios from "axios"
function Home() {

const [advice, setAdvice] = useState();

const handleAdvice=()=>{
    console.log("handle Advice ran");
    setAdvice("");
    fetchAdvice();
}
 const fetchAdvice=()=>{
    axios.get("https://api.adviceslip.com/advice")
    .then((res)=>{
       console.log(res.data);
        setAdvice(res.data.slip.advice);
    })
    .catch((err)=>{
      console.log(err.message)
    })
}

useEffect(() => {
    console.log("useEffect ran");
    fetchAdvice();
  },[]);
    
  return (
    <div>
       {advice ? `"${advice}"` : "Fetching wisdom..."}
      <div>
        <button onClick={()=>handleAdvice()}>MORE ADVICE</button>
      </div>
    </div>
  )
}

export default Home



