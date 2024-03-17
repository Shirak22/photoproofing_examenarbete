import { calcDiskUsage } from "@/app/actions";

export default async function DiskUsage(props: { id: string }) {
    const __DiskUsage = await calcDiskUsage(props.id);
    return (
        <div className="flex">
            <h2 className="text-slate-200 font-bold ">Disk Usage</h2>
            <p className="mx-5 text-blue-200">{__DiskUsage && __DiskUsage}</p>
        </div>
    );
}