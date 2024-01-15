import React from 'react'
import { BiLogoFacebookCircle } from 'react-icons/bi';
import { AiFillInstagram, AiFillGithub } from 'react-icons/ai';
import './Footer.scss'

const Footer = () => {
    return (
        <div>
            <footer>
                <div>
                    <h2>Outfit Hill</h2>
                    <p>We are trying to give you the best as we possible.</p>
                    <em>We give attention to genuine feedback </em>
                    <strong>All right received © outfithill</strong>

                </div>
                <aside>
                    <h4>Follow Us</h4>
                    <div className='socialMedia'>
                        <a href='https://facebook.com/'><BiLogoFacebookCircle /></a>
                        <a href='https://instagram.com/akash_kaushik22'><AiFillInstagram /></a>
                        <a href='https://github.com/akash2001k'><AiFillGithub /></a>
                    </div>
                </aside>
            </footer>
        </div>
    )
}

export default Footer