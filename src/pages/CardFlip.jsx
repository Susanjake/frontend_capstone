import React from 'react'
import {useState} from'react'
import {motion} from 'framer-motion'
import '../styles/cardflip.css'



function CardFlip() {
    const[isFlipped,setIsFlipped] = useState(false)
    const [isAnimating,setIsAnimating] = useState(false)

    function handleFlip(){
        if(!isAnimating){
            setIsFlipped(!isFlipped)
            setIsAnimating(true)
        }
    }
  return (
    <div className='flex items-center justify-center bg-pink-500 cursor-pointer'>
      CardFlip
    </div>
  )
}

export default CardFlip
