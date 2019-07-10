import React from 'react'
import { Link } from 'gatsby'
import './style.scss'
import bulb from './bulb.jpg'

class Menu extends React.Component {
  render() {
    const menu = this.props.data

    const menuBlock = (
      <ul className="menu__list">
        {menu.map(item => (
          <li className="menu__list-item" key={item.path}>
            <Link
              to={item.path}
              className="menu__list-item-link"
              activeClassName="menu__list-item-link menu__list-item-link--active"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <div>Toggle for night/dark mode</div>
        <div className="menu__bulb_main">
          <h5>Swtich to Bulb Energy! Use this <a href="https://www.bulb.me/johnm6944?utm_campaign=account-referral-share&utm_medium=copy-link&utm_source=copy-button">link</a> to get a quote and £75 free credit!</h5>
          <img className="menu__bulb" src={bulb} alt="hello" />
        </div>
      </ul>
    )

    return <nav className="menu">{menuBlock}</nav>
  }
}

export default Menu;