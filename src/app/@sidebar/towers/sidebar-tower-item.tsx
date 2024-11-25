export default function SidebarTowerItem({
  shots,
  name,
  description,
}: {
  shots: number
  name: string
  description: string
}) {
  return (
    <div className='flex gap-2'>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Shots: {shots}</p>
    </div>
  )
}
