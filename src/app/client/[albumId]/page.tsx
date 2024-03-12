export default function ClientGallery({ params }: { params: { albumId: string }}) {
  return (
    <div>
      <h1>Album {params.albumId}</h1>
    </div>
  )
}