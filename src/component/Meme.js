import React from 'react'
import saveAs from 'file-saver'

const downloadImage = () => {
       const img  = "http://i.imgflip.com/1bij.jpg"
       saveAs(img, "meme.png")
}
const Meme = () => {
   const [meme, setmeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage:"http://i.imgflip.com/1bij.jpg"
   })

   const[allMemes, setAllMemes] = React.useState([])

   React.useEffect(() => {
     async function getMemes(){ 
      const res = await fetch("https://api.imgflip.com/get_memes")
      const data = await res.json()
      setAllMemes(data.data.memes)
      }
      getMemes()
   },[])

   function getMemeImage(){
 
    const randomArray = Math.floor(Math.random() * allMemes.length )
    const url = allMemes[randomArray].url;
    setmeme(prevMeme => ({
      ...prevMeme,
      randomImage:url
    }))///call image
   }
   function handleChange(event){
    const {name, value} = event.target
    setmeme(prevmeme => ({
      ...prevmeme,
      [name] : value
    }))
  }
  return (
    <main className='main'>
        <div className='form'>
            <input type="text" 
             id='text'
             placeholder='Top Text'
             name="topText"
             value={meme.topText}
             onChange={handleChange} />

            <input  type="text"
             id='text1'
              placeholder='Bottom Text'
              name="bottomText" 
                value={meme.bottomText}
                onChange={handleChange}
              />
            <button type='click'  onClick={getMemeImage} className='form--button'>Get a New Image💻</button>
            </div>
        <div  className="meme">
        <img  src={meme.randomImage} onClick={downloadImage} className="img" alt='yoy'/>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
    </div>
    </main>
  )
}

export default Meme