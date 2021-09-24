import moment from 'moment';
import React from 'react'

const NavBar = () => {
  return (
    <div className="p-2 text-danger fw-bold fs-2 text-center">
        <p>COVID-19 TRACKER in {moment().utc(0)
      .format("DD/MM/YYYY")}</p>
    </div>
  )
}
export default NavBar;
