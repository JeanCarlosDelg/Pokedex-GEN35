import './styles/PokeDetails.css'

const PokeDetails = ({ sta }) => {

  return (
    <article className="det__container">
      <div className="det__item">
        <div className='det__subcontainer'>
          <span className="det__name">{sta.stat.name}</span>
          <div>
            <span className="det__number">{sta.base_stat}</span><span className="det__max">/120</span>
          </div>
        </div>
        <div className='det__progress-container'>
          <progress className="det__progress" value={sta.base_stat} max={150}></progress>
        </div>
      </div>
    </article>
  )
}

export default PokeDetails