import NotFoundWrapper from "@/components/NotFoundWrapper"

export default async function notFound() {

    return (
        <NotFoundWrapper>
            <h1 className="text-4xl">image not found</h1>
        </NotFoundWrapper>
    )
}