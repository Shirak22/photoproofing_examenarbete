export default async function NotFoundWrapper({ children }: {
    children: React.ReactNode,
}) {
    return (
        <div className="flex justify-center items-center w-full bg-slate-200 font-mono h-svh">
            {children}
        </div>
    )
}