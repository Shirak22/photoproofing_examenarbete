import { getImage } from "@/app/actions";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function ImageLayout({children,params} : {children: React.ReactNode , params: { imageId: string }}){

    const { imageId } = params;

    const image = await getImage(imageId);
    if (!image) return notFound();
    const session = await getServerSession();
    if (!session || session?.user?.name !== image.albumId) return redirect(`/client/login?albumId=${image.albumId}`);  

    return (
        <div>
            <h1>Image Layout</h1>
            {children}
        </div>
    )
}