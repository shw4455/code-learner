import React from "react";
import footer from "./footer.module.css";

function Footer() {
    return (
        <div id={footer.footer}>
            <div id={footer.container}>
                <div>
                    <p>© 2023 서휘원 | Portfolio </p>
                    <p>이메일 : hwmain2000@gmail.com</p>
                </div>
                <div>
                    <p>Front-end: React, HTML5, CSS3</p>
                    <p>
                        Back-end: Node.js, Express.js, MySQL. Data fetching with
                        Axios. Deployed with PM2.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
