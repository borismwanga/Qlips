// eslint-disable-next-line no-unused-vars
import React from "react"
import { ExternalLink } from 'react-external-link';


export default function Footer(){
    return(
        <div className="footer">
            <ExternalLink href="https://example.com">
                <span>Privacy & Term</span>
            </ExternalLink>
            <ExternalLink href="mailto:qlips@mail.com">
                <span>Support</span>
            </ExternalLink>
        </div>
        )
}