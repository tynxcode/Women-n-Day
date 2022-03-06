import { useEffect, useState } from 'react';
import './App.css';
import { Helmet } from "react-helmet";
import Image from './components/image';
import Loading from './components/loading';
import SoundPlayer from './components/soundPlayer';
import { BiFullscreen, BiVolumeFull } from 'react-icons/bi';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({
    x: 0,
    y: 0
  })

  const [images, setImages] = useState([
    { url: '/img/img1.png', translateX: 0, translateY: 0 },
    { url: '/img/img2.jpg', translateX: 0, translateY: 0 },
    { url: '/img/img3.jpg', translateX: 0, translateY: 0 },
    { url: '/img/img4.jpg', translateX: 0, translateY: 0 },
    { url: '/img/img5.jpg', translateX: 0, translateY: 0 },
    { url: '/img/img6.jpg', translateX: 0, translateY: 0 },
    { url: '/img/img7.jpg', translateX: 0, translateY: 0 },
    { url: '/img/img8.jpg', translateX: 0, translateY: 0 },
    { url: '/img/img9.jpg', translateX: 0, translateY: 0 },
    { url: '/img/img10.png', translateX: 0, translateY: 0 },
  ])

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [playerActive, setPlayerActive] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const handleFullScreen = useFullScreenHandle();

  const onSetFullscreen = () => {
    setIsFullscreen(s => !s)
    isFullscreen ? handleFullScreen.exit() : handleFullScreen.enter()
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMousePosition({
      x: e.pageX,
      y: e.pageY
    })
  }

  const translateRatio = (index: number) => {
    switch (index) {
      case 0:
        return 15
      case 1:
        return 25
      case 2:
        return 15
      case 3:
        return 20
      case 4:
        return 18
      case 5:
        return 22
      case 6:
        return 23
      case 7:
        return 27
      case 8:
        return 17
      case 9:
        return 15

      default:
        return 20
    }
  }

  useEffect(() => {
    const newImgPostition = images.map((value, index) => {

      const newXPos = mousePosition.x / translateRatio(index + 1)
      const newYPos = mousePosition.y / translateRatio(index + 1)

      return {
        ...value,
        translateX: newXPos,
        translateY: newYPos
      }
    })

    setImages(newImgPostition)

  }, [mousePosition])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2500)
  }, [])

  const renderImages = () => {
    return images.map((value, index) => {
      return <Image image={value} imgIndex={index} key={index} />
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <FullScreen handle={handleFullScreen}>
      <div className="App" onMouseMove={e => onMouseMove(e)}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Women's Day</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <div className="images">
          {renderImages()}
        </div>
        <div className='heart' style={{
          top: mousePosition.y - 10,
          left: mousePosition.x - 20
        }}>
        </div>
        {!playerActive
          && (
            <div className='content'>
              <div className='content__title'>
                Women's Day
              </div>
              <div className='content__wishes'>
                Chúc em 8/3 xinh đẹp như ảnh trên mạng
              </div>
            </div>
          )
        }
        <div className='extentions'>
          <div className='button-smooth' onClick={() => setPlayerActive(s => !s)}>
            <BiVolumeFull />
          </div>
          <div className='button-smooth button-smooth--red' onClick={() =>  onSetFullscreen()}>
            <BiFullscreen />
          </div>
        </div>
        <SoundPlayer active={playerActive} />

      </div>
    </FullScreen>
  );
}

export default App;
