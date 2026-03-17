import CloseIcon from '@mui/icons-material/Close';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { generateMockHistory } from '@/entities/signal';

type HistoryTableProps = {
	asset: string;
	onClose: () => void;
};

export function HistoryTable({ asset, onClose }: HistoryTableProps) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const history = generateMockHistory(asset);

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(Number.parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedHistory = history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Dialog open onClose={onClose} fullWidth maxWidth='md'>
			<DialogTitle bgcolor='inherit' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<ShowChartIcon color='primary' />
					<Typography variant='h6'>
						История торгов:

						{' '}

						{asset}
					</Typography>
				</Box>
				<IconButton onClick={onClose} size='small'>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell><strong>Дата</strong></TableCell>
								<TableCell align='right'><strong>Открытие</strong></TableCell>
								<TableCell align='right'><strong>Максимум</strong></TableCell>
								<TableCell align='right'><strong>Минимум</strong></TableCell>
								<TableCell align='right'><strong>Закрытие</strong></TableCell>
								<TableCell align='right'><strong>Объём</strong></TableCell>
								<TableCell align='center'><strong>Сигнал</strong></TableCell>
								<TableCell align='right'><strong>Прибыль</strong></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{paginatedHistory.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										'&:hover': { bgcolor: 'action.hover' },
										bgcolor: row.profit && row.profit > 0 ? 'success.lighter' : row.profit && row.profit < 0 ? 'error.lighter' : 'inherit',
									}}
								>
									<TableCell>{row.date}</TableCell>
									<TableCell align='right'>
										$
										{row.open.toFixed(2)}
									</TableCell>
									<TableCell align='right' sx={{ color: 'success.main' }}>
										$
										{row.high.toFixed(2)}
									</TableCell>
									<TableCell align='right' sx={{ color: 'error.main' }}>
										$
										{row.low.toFixed(2)}
									</TableCell>
									<TableCell align='right'>
										$
										{row.close.toFixed(2)}
									</TableCell>
									<TableCell align='right'>{row.volume.toLocaleString()}</TableCell>
									<TableCell align='center'>
										<Chip
											icon={row.signal === 'buy' ? <TrendingUpIcon /> : row.signal === 'sell' ? <TrendingDownIcon /> : undefined}
											label={row.signal === 'buy' ? 'Buy' : row.signal === 'sell' ? 'Sell' : 'Hold'}
											size='small'
											color={row.signal === 'buy' ? 'success' : row.signal === 'sell' ? 'error' : 'default'}
											sx={{ fontSize: '0.75rem' }}
										/>
									</TableCell>
									<TableCell align='right' sx={{ color: row.profit && row.profit > 0 ? 'success.main' : row.profit && row.profit < 0 ? 'error.main' : 'inherit', fontWeight: 'bold' }}>
										{row.profit ? `$${row.profit.toFixed(2)}` : '—'}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					component='div'
					count={history.length}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					rowsPerPageOptions={[5, 10, 25]}
					labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
					labelRowsPerPage='Строк на странице:'
				/>
			</DialogContent>
		</Dialog>
	);
}
