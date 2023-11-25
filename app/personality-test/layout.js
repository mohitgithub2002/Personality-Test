import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
    title: 'Personality Test',
    description: 'Check Your Romantic Personality',
  }
  
  export default function childLayout({ children }) {
    return (
      <html lang="en">
        
        <body className={inter.className}>
            <div className="container h-16 bg-rose-500 flex justify-center items-center">
                <div className="row ">
                    <div className="col-md-12">
                        <h1 className="text-center text-3xl">Personality Test</h1>
                    </div>
                </div>
            </div>
            {children}
        </body>
      </html>
    )
  }