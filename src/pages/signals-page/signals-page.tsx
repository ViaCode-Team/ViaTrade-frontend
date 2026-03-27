import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';

import type { Signal } from '@/entities/signal';

import { mockSignals } from '@/entities/signal';
import { SignalCard } from '@/entities/signal/ui/signal-card';
import { HistoryTable } from '@/shared/ui/history-table';

type SortOption = 'date-desc' | 'date-asc' | 'confidence-desc' | 'confidence-asc' | 'asset-asc';
type DirectionFilter = 'all' | 'buy' | 'sell';
type TypeFilter = 'all' | 'stock' | 'futures';

export function SignalsPage() {
	const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState<SortOption>('date-desc');
	const [directionFilter, setDirectionFilter] = useState<DirectionFilter>('all');
	const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

	const filteredAndSortedSignals = useMemo(() => {
		let result = [...mockSignals];

		// Фильтрация по направлению
		if (directionFilter !== 'all') {
			result = result.filter((s) => s.direction === directionFilter);
		}

		// Фильтрация по типу
		if (typeFilter !== 'all') {
			result = result.filter((s) => s.type === typeFilter);
		}

		// Поиск по названию актива или стратегии
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(s) =>
					s.asset.toLowerCase().includes(query)
					|| s.strategy.toLowerCase().includes(query),
			);
		}

		// Сортировка
		result.sort((a, b) => {
			switch (sortOption) {
				case 'date-desc':
					return new Date(b.date).getTime() - new Date(a.date).getTime();
				case 'date-asc':
					return new Date(a.date).getTime() - new Date(b.date).getTime();
				case 'confidence-desc':
					return b.confidence - a.confidence;
				case 'confidence-asc':
					return a.confidence - b.confidence;
				case 'asset-asc':
					return a.asset.localeCompare(b.asset);
				default:
					return 0;
			}
		});

		return result;
	}, [searchQuery, sortOption, directionFilter, typeFilter]);

	const buySignals = filteredAndSortedSignals.filter((s) => s.direction === 'buy');
	const sellSignals = filteredAndSortedSignals.filter((s) => s.direction === 'sell');

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h4' fontWeight='bold' gutterBottom>
				Сигналы
			</Typography>

			{/* Filters and Search */}
			<Paper sx={{ p: 2, mb: 3 }}>
				<Grid container spacing={2} alignItems='center'>
					<Grid size={{ xs: 12, sm: 6, md: 4 }}>
						<TextField
							fullWidth
							size='small'
							placeholder='Поиск по активу или стратегии...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon color='action' />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<FormControl fullWidth size='small'>
							<Select
								value={sortOption}
								onChange={(e) => setSortOption(e.target.value as SortOption)}
								displayEmpty
								IconComponent={SortIcon}
							>
								<MenuItem value='date-desc'>Сначала новые</MenuItem>
								<MenuItem value='date-asc'>Сначала старые</MenuItem>
								<MenuItem value='confidence-desc'>По надёжности (убывание)</MenuItem>
								<MenuItem value='confidence-asc'>По надёжности (возрастание)</MenuItem>
								<MenuItem value='asset-asc'>По алфавиту</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
						<FormControl fullWidth size='small'>
							<Select
								value={directionFilter}
								onChange={(e) => setDirectionFilter(e.target.value as DirectionFilter)}
								displayEmpty
								IconComponent={FilterListIcon}
							>
								<MenuItem value='all'>Все сигналы</MenuItem>
								<MenuItem value='buy'>Покупка</MenuItem>
								<MenuItem value='sell'>Продажа</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
						<FormControl fullWidth size='small'>
							<Select
								value={typeFilter}
								onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
								displayEmpty
							>
								<MenuItem value='all'>Все типы</MenuItem>
								<MenuItem value='stock'>Акции</MenuItem>
								<MenuItem value='futures'>Фьючерсы</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>

			{/* Results count */}
			<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
				Найдено сигналов:
				<Box component='span' fontWeight='bold' color='text.primary'>
					{' '}
					{filteredAndSortedSignals.length}
				</Box>
			</Typography>

			{/* Buy Signals */}
			{buySignals.length > 0 && (
				<>
					<Typography
						variant='h6'
						sx={{
							mt: 3,
							mb: 2,
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<TrendingUpIcon color='success' />
						Сигналы на покупку
						<Typography variant='caption' color='text.secondary' sx={{ ml: 1 }}>
							(
							{buySignals.length}
							)
						</Typography>
					</Typography>
					<Grid container spacing={3}>
						{buySignals.map((signal) => (
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={signal.id}>
								<SignalCard signal={signal} onClick={setSelectedSignal} />
							</Grid>
						))}
					</Grid>
				</>
			)}

			{/* Sell Signals */}
			{sellSignals.length > 0 && (
				<>
					<Typography
						variant='h6'
						sx={{
							mt: 4,
							mb: 2,
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<TrendingDownIcon color='error' />
						Сигналы на продажу
						<Typography variant='caption' color='text.secondary' sx={{ ml: 1 }}>
							(
							{sellSignals.length}
							)
						</Typography>
					</Typography>
					<Grid container spacing={3}>
						{sellSignals.map((signal) => (
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={signal.id}>
								<SignalCard signal={signal} onClick={setSelectedSignal} />
							</Grid>
						))}
					</Grid>
				</>
			)}

			{/* No results */}
			{filteredAndSortedSignals.length === 0 && (
				<Box sx={{ textAlign: 'center', py: 8 }}>
					<Typography variant='h6' color='text.secondary'>
						Сигналы не найдены
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Попробуйте изменить параметры поиска или фильтры
					</Typography>
				</Box>
			)}

			{selectedSignal && (
				<HistoryTable asset={selectedSignal.asset} onClose={() => setSelectedSignal(null)} />
			)}
		</Box>
	);
}
