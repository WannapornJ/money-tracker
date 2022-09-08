import { NextResponse } from 'next/server';

export const middleware = (req) => {
  let verify = req.cookies.get('USER');
  let url = req.url;
  let privatePages = ['http://localhost:3000/', 'http://localhost:3000/category'];
  let publicPages = ['http://localhost:3000/signin', 'http://localhost:3000/sigup']

    if (!verify && privatePages.includes(url)) {
      return NextResponse.redirect('http://localhost:3000/signin');
    }

    if(verify && publicPages.includes(url)) {
        return NextResponse.redirect('http://localhost:3000/');
    }
};
