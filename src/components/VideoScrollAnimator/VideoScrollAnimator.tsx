import React from 'react'
// import ScrollTrigger from 'gsap/ScrollTrigger'
import { Controller, Scene } from 'react-scrollmagic';
import './VideoScrollAnimator.css'

interface Props {
  src: string
  muted?: boolean
}

const VideoScrollAnimator = ({src, muted}:Props) => {

  // scroll position of the video element in the DOM 
  const [scrollpos, setScrollpos] = React.useState(0)
  const [delay, setDelay] = React.useState(0)

  // Video Animation 
  const accelAmount = 0.2

  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    
    if (videoRef.current) {
      console.log(videoRef.current.duration);
    }
  }, [videoRef, src]);

  const handleScroll = (e: any) => {
    setScrollpos(window.pageYOffset/1000)
  }


  // trigger hadle scroll when the component is mounted
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  React.useEffect(() => {
    const video = videoRef.current
    const interval = setInterval(() => {
      // get the scroll position of the video element in the DOM  
      const scrollPos = video?.getBoundingClientRect().top
      // set the delay of the video to the scroll position of the video element in the DOM
      setDelay(scrollPos ? scrollPos : 0)

      if (video) {
        const value = delay + (scrollPos ? scrollPos : window.pageYOffset/1000 - delay ) * accelAmount
        setDelay(value)
        video.currentTime = value
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }


  }, [])

// padding bottom of the pin hook based on the video length
  const [paddingBottom, setPaddingBottom] = React.useState(0)
  React.useEffect(() => {
    const video = videoRef.current
    if (video) {
      const videoHeight = video.clientHeight
      const videoDuration = video.duration
      const videoPaddingBottom = videoHeight * videoDuration
      setPaddingBottom(videoPaddingBottom)
      console.log(videoPaddingBottom, videoHeight*videoDuration);
    }
  }, [src])
  

  return (
      <Scene 
      duration={100000} 
      pin 
      triggerHook={0}>
        <div className='video-scroll-animator'>
          <video
          className='video__scroll'
          ref={videoRef} 
          src={src}  
          muted={muted || false}
          />
        </div>
      </Scene>
  )
}

export { VideoScrollAnimator }