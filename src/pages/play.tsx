import Board from 'components/Board/Board'
import Buzzers from 'components/Buzzers'
import BuzzOrder from 'components/BuzzOrder'
import HostStatus from 'components/HostStatus'
import Layout from 'components/Layout'
import { type NextPage } from 'next'

const PlayPage: NextPage = () => {
	return (
		<Layout>
			<Board />
			<HostStatus />
			<Buzzers />
			<BuzzOrder />
		</Layout>
	)
}

export default PlayPage