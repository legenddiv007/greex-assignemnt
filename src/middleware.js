import { NextResponse } from "next/server";

export function middleware(req) {

    let verify = req.cookies.get("loggedin");
    if (!verify && req.nextUrl.pathname == "/home")
        return NextResponse.redirect(new URL("/", req.url))

    if (verify &&  req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/home",req.url));
    }

}