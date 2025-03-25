'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
	const pathname = usePathname();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			<div>404: Not found</div>
			<div>{pathname}</div>
			<Link href='/' className='btn btn-primary'>
				Go back home
			</Link>
		</div>
	);
}
