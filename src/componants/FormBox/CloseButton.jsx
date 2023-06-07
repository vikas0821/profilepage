import React from 'react'

function CloseButton(props) {
  return (
    <div onClick={props.onClick} className="h-10 w-10 text-center rounded-full absolute right-0 -translate-y-9 translate-x-4 cursor-pointer opacity-95 hover:bg-white hover:opacity-100 bg-white">
      <i class="fa-solid fa-x  text-black text-2xl m-1 "></i>
    </div>
  )
}

export default CloseButton
