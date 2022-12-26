import Board from 'components/Board'
import Buzzers from 'components/Buzzers'
import BuzzOrder from 'components/BuzzOrder'
import Layout from 'components/Layout'
import { type NextPage } from 'next'

const PlayPage: NextPage = () => {
	return (
		<Layout mode='player'>
			<Board />
			<Buzzers />
			<BuzzOrder />
		</Layout>
	)
}

export default PlayPage