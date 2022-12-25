import Buzzers from 'components/Buzzers'
import BuzzOrder from 'components/BuzzOrder'
import Layout from 'components/Layout'
import { type NextPage } from 'next'

const PlayPage: NextPage = () => {
	return (
		<Layout>
			<Buzzers />
			<BuzzOrder />
		</Layout>
	)
}

export default PlayPage