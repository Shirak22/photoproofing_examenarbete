

export default function H1({ children, styling }: { children: React.ReactNode, styling?: string}) {
  return <h1 className={`text-5xl  font-sans font-semibold my-10 ${styling}`} >{children}</h1>;
}