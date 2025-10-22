import React from 'react'

export default function SuccessMesage({children}: {children : React.ReactNode}) {
  return (
    <p className="text-center my-4 bg-amber-500 text-white font-bold p-3 uppercase text-sm">{children}</p>
  )
}
