import React from 'react'
import Affiche from '../../Customs/H_Customs/Affiche'
import SectionAffiche from '../../Customs/H_Customs/SectionAffiche'


const Home = () => {

  return (
    <div>      
      <div className="px-2 md:px-40 mt-6">
        <Affiche />
        {/**Section affichage de données  */}
        <SectionAffiche />
      </div>
    </div >
  )
}

export default Home
