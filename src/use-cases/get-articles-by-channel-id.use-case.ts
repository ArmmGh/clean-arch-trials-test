import { getInjection } from '@/lib/di/container'
import { Address, getAddress } from 'viem'

export default async function getArticlesByChannelIdUseCase({
  id,
  owner,
}: {
  id: string | Address
  owner: string | Address
}) {
  const channelsRepo = getInjection('IChannelsRepository')
  // const channelOwner = await channelsRepo.getChannelOwnerById({ id: getAddress(id) })

  const mockArticles: Record<string, any[]> = {
    '0x123': [
      {
        id: 1,
        title: 'The Future of AI in Content Creation',
        excerpt:
          'Artificial Intelligence is revolutionizing how we create and consume content. From automated writing assistants to personalized recommendations, AI is shaping the future of digital media.',
        author: {
          name: 'Alex Johnson',
          avatar: '/avatars/alex-johnson.jpg',
        },
        date: 'May 15, 2023',
        readTime: '5 min read',
        tags: ['AI', 'Content', 'Technology'],
        image: '/placeholder.svg?height=200&width=400',
      },
      {
        id: 2,
        title: 'Sustainable Living: Small Changes, Big Impact',
        excerpt:
          'Discover how small, everyday choices can lead to a more sustainable lifestyle. From reducing plastic use to embracing renewable energy, learn practical tips for a greener future.',
        author: {
          name: 'Emma Green',
          avatar: '/avatars/emma-green.jpg',
        },
        date: 'May 18, 2023',
        readTime: '7 min read',
        tags: ['Sustainability', 'Lifestyle', 'Environment'],
        image: '/placeholder.svg?height=200&width=400',
      },
      {
        id: 3,
        title: 'The Rise of Remote Work: Challenges and Opportunities',
        excerpt:
          'As more companies embrace remote work, we explore the benefits and challenges of this new paradigm. From increased productivity to work-life balance issues, what does the future of work look like?',
        author: {
          name: 'Michael Chang',
          avatar: '/avatars/michael-chang.jpg',
        },
        date: 'May 20, 2023',
        readTime: '6 min read',
        tags: ['Remote Work', 'Business', 'Productivity'],
        image: '/placeholder.svg?height=200&width=400',
      },
    ],
    '0x456': [
      {
        id: 4,
        title: 'Blockchain Beyond Cryptocurrency: Real-World Applications',
        excerpt:
          'Blockchain technology is transforming industries beyond finance. Discover how supply chain management, healthcare, and even voting systems are leveraging the power of decentralization.',
        author: {
          name: 'Sophia Lee',
          avatar: '/avatars/sophia-lee.jpg',
        },
        date: 'June 2, 2023',
        readTime: '8 min read',
        tags: ['Blockchain', 'Technology', 'Innovation'],
        image: '/placeholder.svg?height=200&width=400',
      },
      {
        id: 5,
        title: 'The Science Behind Mindfulness: How Meditation Changes Your Brain',
        excerpt:
          'Mindfulness and meditation are not just wellness trends. Learn the scientific evidence behind how these practices can improve focus, reduce stress, and enhance overall well-being.',
        author: {
          name: 'David Chen',
          avatar: '/avatars/david-chen.jpg',
        },
        date: 'June 5, 2023',
        readTime: '10 min read',
        tags: ['Mindfulness', 'Wellness', 'Science'],
        image: '/placeholder.svg?height=200&width=400',
      },
      {
        id: 6,
        title: 'Exploring Space: The New Race to the Moon',
        excerpt:
          'With private companies and new government initiatives, the race to explore the Moon has been reignited. What’s driving this new era of space exploration?',
        author: {
          name: 'Luna Martinez',
          avatar: '/avatars/luna-martinez.jpg',
        },
        date: 'June 10, 2023',
        readTime: '7 min read',
        tags: ['Space', 'Science', 'Exploration'],
        image: '/placeholder.svg?height=200&width=400',
      },
    ],
    '0x789': [
      {
        id: 7,
        title: 'The Future of Electric Vehicles: Trends and Innovations',
        excerpt:
          'Electric vehicles are at the forefront of the automotive revolution. Discover the latest trends, breakthroughs in battery technology, and what the future holds for green transportation.',
        author: {
          name: 'Ethan Rogers',
          avatar: '/avatars/ethan-rogers.jpg',
        },
        date: 'July 1, 2023',
        readTime: '6 min read',
        tags: ['Electric Vehicles', 'Technology', 'Sustainability'],
        image: '/placeholder.svg?height=200&width=400',
      },
      {
        id: 8,
        title: 'Cybersecurity in the Age of AI: Threats and Solutions',
        excerpt:
          'As AI technology advances, so do the threats posed by cyberattacks. Explore how organizations can use AI to defend against evolving security risks and safeguard their data.',
        author: {
          name: 'Olivia Carter',
          avatar: '/avatars/olivia-carter.jpg',
        },
        date: 'July 3, 2023',
        readTime: '9 min read',
        tags: ['Cybersecurity', 'AI', 'Technology'],
        image: '/placeholder.svg?height=200&width=400',
      },
      {
        id: 9,
        title: 'The Psychology of Habits: How to Build a Better Routine',
        excerpt:
          'What drives our daily routines, and how can we change them? Dive into the psychology of habits and discover strategies for building lasting, positive behaviors.',
        author: {
          name: 'Rachel Adams',
          avatar: '/avatars/rachel-adams.jpg',
        },
        date: 'July 5, 2023',
        readTime: '5 min read',
        tags: ['Psychology', 'Self-Improvement', 'Wellness'],
        image: '/placeholder.svg?height=200&width=400',
      },
    ],
  }

  // const articlesCount = await channelsRepo.getArticlesCountByChannelId({ id, publisherAddress: channelOwner })
  // const promisedArticles = []

  // for (let articleId = 0; articleId < articlesCount; articleId++) {
  //   promisedArticles.push(channelsRepo.getArticleById({ id: BigInt(articleId), channelId: getAddress(id) }))
  // }
  console.log('----- ID ------ : ', id)

  return mockArticles[owner]
  // return Promise.all(promisedArticles)
}
