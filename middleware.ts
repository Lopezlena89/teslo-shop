import { NextResponse, type NextRequest } from "next/server";
import { jwt } from '@/utils';
import { getToken } from "next-auth/jwt";
 

 
export const  middleware = async(req: NextRequest) => {
  
  const session = await getToken({req,secret:process.env.NEXTAUTH_SECRET})
  //Informacion util del usuario
  // console.log(session); 
  if(!session){
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  // return NextResponse.redirect(new URL('/about-2',req.url))
  return NextResponse.next();

}
 
export const config = {
  matcher: ["/checkout/address","/checkout/summary"],
};

// const previousPage = req.nextUrl.pathname;
 
 
//   if (previousPage.startsWith("/checkout")) {
   
//     const  token = req.cookies.get("token")?.value;
 
//     if (!token) {
//       return NextResponse.redirect(
//         new URL(`/auth/login?p=${previousPage}`, req.url)
//       );
//     }
   
//     try {
    
//       // await jwt.isValidToken(token);
      
//       return NextResponse.next();
//     } catch (error) {
     
//       return NextResponse.redirect(
//         new URL(`/auth/login?p=${previousPage}`, req.url)
//       );
//     }
//   }