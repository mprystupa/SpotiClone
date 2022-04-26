import { NextResponse } from 'next/server';

const signedInPages = ['/', '/playlist', '/library'];

export default function middleware(req) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    // this is an edge function, so I don't have access to process.env here
    const token = req.cookies.SPOTICLONE_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect('/signin');
    }
  }
}
