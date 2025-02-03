// src/app/components/PageLayout.tsx
import Footer from './footer'
import SideNav from './sidenav'

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SideNav />
      <div className="flex-1 ml-64 flex flex-col"> {/* Added flex flex-col */}
        <main className="flex-grow bg-gradient-to-r from-blue-500 to-teal-500">
          {children}
        </main>
        <Footer/>
      </div>
    </div>
  )
}