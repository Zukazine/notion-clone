'use client'

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <main className="h-full">
        {children}
      </main>
    </div>
  )
}
export default MainLayout;