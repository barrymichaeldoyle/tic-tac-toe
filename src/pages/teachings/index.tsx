import React, { FC } from 'react'

import { db } from 'services'

const Teachings: FC = () => {
  const userCollection = db
    .collection('users')
    .get()
    .then(function (snapshot) {
      snapshot.forEach((doc) =>
        console.log(doc.id, '=>', doc.data().displayName)
      )
    })

  return (
    <>
      <h1>teachings</h1>
    </>
  )
}

export default Teachings
