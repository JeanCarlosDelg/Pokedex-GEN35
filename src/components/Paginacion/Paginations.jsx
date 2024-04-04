import * as FaIcons from 'react-icons/fa'
import './styles/Paginations.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Paginations = ({ howManyPages, setCurrentPage, pokeSearch, typeSelected }) => {

  const [currentButton, setCurrentButton] = useState(1)
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  
  const numberOfPage = []
  for (let i = 1; i <= howManyPages; i++) {
    numberOfPage.push(i)
  }

  useEffect(() => {
    if (typeSelected) {
      setCurrentButton(1)
    }
  }, [typeSelected])
  
  useEffect(() => {
    if (!pokeSearch) {
      setCurrentButton(1)
      setCurrentPage(1)
    } else {
      setCurrentButton(1)
    }
  }, [pokeSearch])
  
  

  const handlePrev = () => {
    setCurrentButton(
      currentButton === 1
        ? currentButton
        : currentButton - 1
    )
  }

  const handleNext = () => {
    if (currentButton === numberOfPage.length) {
      setCurrentButton(currentButton)
    } else {
      setCurrentButton(currentButton + 1)
    } 

  }

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons]

    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'
    let dotsEnd = ' ... '

    if (numberOfPage.length < 6) {
      tempNumberOfPages = numberOfPage
    }

    else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPage.length]
    }

    else if (currentButton === 4) {
      const sliced = numberOfPage.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPage.length]
    }

    else if (currentButton > 4 && currentButton < numberOfPage.length - 2) {
      const sliced1 = numberOfPage.slice(currentButton - 2, currentButton)
      const sliced2 = numberOfPage.slice(currentButton, currentButton + 1)
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPage.length])
    }

    else if (currentButton > numberOfPage.length - 3) {
      const sliced = numberOfPage.slice(numberOfPage.length - 4)
      tempNumberOfPages = ([1, dotsEnd, ...sliced])
    }

    else if (currentButton === dotsInitial) {

      setCurrentButton(arrOfCurrButtons[0])
    }

    else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3])
    }

    else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3])
    }

    else if (currentButton === dotsEnd) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 1])
    }
    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentButton)
  }, [currentButton, howManyPages])

  return (
    <div className="pagination-container">
      <button className={`btn_pag ${currentButton === 1 ? 'disabled' : ''}`}
        onClick={handlePrev}
      >
        <FaIcons.FaAngleLeft />
      </button>
      <div className='number__container'>
        {
          arrOfCurrButtons.map((pageInfo, index) => (
            <Link
              key={index}
              onClick={() => setCurrentButton(pageInfo)}
              className={`number__pag ${currentButton === pageInfo && 'active'}`}
            >
              {pageInfo}
            </Link>
          ))
        }
      </div>
      <button
        className={`btn_pag ${currentButton === numberOfPage.length ? 'disabled' : ''}`}
        onClick={handleNext}
      >
        <FaIcons.FaAngleRight />
      </button>
    </div>
  )
}

export default Paginations