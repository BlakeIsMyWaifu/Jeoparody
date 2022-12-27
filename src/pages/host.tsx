import Board from 'components/Board/Board'
import Buzzers from 'components/Buzzers'
import BuzzOrder from 'components/BuzzOrder'
import HostControls from 'components/HostControls/HostControls'
import Layout from 'components/Layout'
import { type NextPage } from 'next'

const HostPage: NextPage = () => {
	return (
		<Layout mode='host'>
			<Board />
			<HostControls />
			<Buzzers />
			<BuzzOrder />
		</Layout>
	)
}

export default HostPage