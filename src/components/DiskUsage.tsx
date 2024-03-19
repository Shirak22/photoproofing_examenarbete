import { calcDiskUsage, getPhotographer } from "@/app/actions";

export default async function DiskUsage(props: { email: string }) {
    const photographer = await getPhotographer(props.email);
    const __DiskUsage = await calcDiskUsage(photographer?.userId);

    const storageLimit = photographer.storageLimit < 999 ? `${photographer.storageLimit}MB` : `${photographer.storageLimit / 1000}GB`;

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-slate-200 font-bold ">Disk Usage</h2>
            <p className="mx-5 text-blue-200">{__DiskUsage && __DiskUsage}/{storageLimit}</p>

        </div>
    );
}