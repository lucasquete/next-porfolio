import React from 'react'
import styles from "./porfolio.module.css"

const PorfolioLayout = ({children}) => {
  return (
    <div>
        <h1 className={styles.mainWork}>Our Works</h1>
        {children}
    </div>
  )
}

export default PorfolioLayout