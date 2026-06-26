import memeImg from "../assets/meme-img.jpg"
import React from "react"

export default function Main() {
    
    
    const [index, setIndex] = React.useState(-1)
    const [memeArr, setMemeArr] = React.useState([])

    

    const [meme, setMeme] = React.useState({
        topText:"One does not simply", 
        bottomText:"Walk into Mordor",
        imageUrl: memeImg
    })

    
    React.useEffect(function(){
        fetch("https://api.imgflip.com/get_memes").then(prev => prev.json()).then(
            res => setMemeArr(res.data.memes) )
    }, [])
 

    
    function handleChange(event){
       const {value, name} = event.currentTarget; 
       setMeme(function(oldVal){                  
        return {...oldVal, [name]:value} 
       })
    }

    function getMeme(){
        const index = Math.floor(Math.random() * memeArr.length)
        const randMeme = memeArr[index];
        const randMemeUrl = randMeme.url
        setMeme(prev => {return {...prev, imageUrl:randMemeUrl}})
    } 

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}