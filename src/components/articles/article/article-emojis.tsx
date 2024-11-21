export default function ArticleEmojis({ emojis = [] }: { emojis?: { emoji: string; count?: number }[] }) {
  return (
    <div className='flex items-center gap-2'>
      {emojis.map(({ emoji, count = 0 }) => (
        <div
          key={emoji}
          className='flex items-center gap-1 rounded-[100px] bg-[#F4F4FA] px-[7px] py-1 text-[11px] text-black'
        >
          <span className='text-[14px]'>{emoji}</span> {count}
        </div>
      ))}
    </div>
  )
}
