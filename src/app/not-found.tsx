import Link from 'next/link';
import './globals.css';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main
          id="main"
          className="section center"
          style={{ minHeight: '80vh', display: 'grid', placeContent: 'center' }}
        >
          <div className="wrap narrow">
            <p className="eyebrow">404</p>
            <h1 className="h1 display">This page has moved on</h1>
            <p className="lede" style={{ marginTop: '1.2rem' }}>
              The door you knocked on is not here any more.
            </p>
            <p style={{ marginTop: '2rem' }}>
              <Link className="btn" href="/">
                Back to the riad
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
