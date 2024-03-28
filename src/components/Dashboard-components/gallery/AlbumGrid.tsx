import Image from "next/image";

export default function AlbumGrid({ files }: { files: any[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-4"
    >
      {files.map((file, index) => (
        <li key={index} className="relative">
          <Image
            width={400}
            height={256}
            src={file.source}
            alt={file.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-70 rounded-b-lg">
            <h2 className="text-lg font-bold">{file.title}</h2>
            <p className="text-sm">{file.size}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
