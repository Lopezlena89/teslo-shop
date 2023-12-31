import Head from "next/head";
import { FC } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props{
    children:React.ReactNode;
    title:string;
    pageDescription:string;
    imagenFullUrl?:string;
}

export const ShopLayout:FC<Props> = ({children,title,pageDescription,imagenFullUrl}) => {
  return (
    <>
        <Head>
            <title>{title}</title>

            <meta name='description' content={pageDescription}/>
            <meta name='og:title' content={title}/>
            <meta name='og:description' content={pageDescription}/>
            {
                imagenFullUrl &&(
                    <meta name='og:image' content={imagenFullUrl}/>
                )
            }
        </Head>

        <nav>
            <Navbar/>
        </nav>

        <SideMenu/>

        <main style={{
            margin:'80px auto',
            maxWidth:'1440px',
            padding:'0px 30px'
        }}>
            {children}
        </main>

        {/* Footer */}
        <footer>
            {/* TODO: mi custom footer */}
        </footer>
    </>
  )
}
