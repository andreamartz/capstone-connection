import React, { useState, useEffect, useContext } from 'react';
import Masonry from 'react-masonry-css';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CapConApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import PrjCardVert from './PrjCardVert';
import SearchForm from './SearchForm';
import SortForm from './SortForm';
import UserContext from '../auth/UserContext';
import { toggleLikeProject } from '../utils';
import './PrjCardList.css';

const useStyles = makeStyles((theme) => ({
	project: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	searchForm: {
		flexGrow: '1',
	},
}));

/** Show project cards.
 *
 * On mount, loads projects from API:
 *   * loads all projects if no userId
 *   * loads user's projects if userId
 *
 */

const PrjCardList = ({ userId }) => {
	const { currentUser } = useContext(UserContext);
	const [projects, setProjects] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortVariable, setSortVariable] = useState('');
	const [showSearchAndSort, setShowSearchAndSort] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		async function getAllProjectsOnMount() {
			const projects = userId
				? await CapConApi.getUserProjects(userId)
				: await CapConApi.getProjects(searchTerm, sortVariable);
			setProjects(projects);
			if (userId) {
				setShowSearchAndSort(false);
			} else {
				setShowSearchAndSort(true);
			}
		}
		getAllProjectsOnMount();
	}, [userId, sortVariable, searchTerm]);

	// Breakpoints
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const flexDirection = isSmallScreen ? 'column' : 'row';
	const justifyContent = isSmallScreen ? 'center' : 'space-between';
	const alignItems = isSmallScreen ? 'flex-start' : 'space-between';
	const marginBottom = isSmallScreen ? 10 : 1;

	if (!projects) return <LoadingSpinner />;

	const breakpoints = {
		default: 3, // default number of columns
		960: 2, // at screen width of 1100px, reduce to 2 columns
		600: 1,
	};

	console.log('PROJECTS STATE: ', projects);

	return (
		<Container>
			<Box
				display="flex"
				flexDirection={flexDirection}
				justifyContent={justifyContent}
				alignItems={alignItems}
				mb={5}
			>
				{showSearchAndSort && (
					<SearchForm
						className={classes.searchForm}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				)}
				<Box mb={marginBottom}>
					{showSearchAndSort && (
						<SortForm
							sortVariable={sortVariable}
							setSortVariable={setSortVariable}
						/>
					)}
				</Box>
			</Box>

			{projects.length ? (
				<Masonry
					breakpointCols={breakpoints}
					className="masonry-grid"
					columnClassName="masonry-grid_column"
				>
					{projects.map((p, idx) => (
						<div key={p.id} className={classes.project}>
							<PrjCardVert
								project={p}
								toggleLike={() => {
									toggleLikeProject(idx, currentUser, projects, setProjects);
								}}
								projects={projects}
								setProjects={setProjects}
							/>
						</div>
					))}
				</Masonry>
			) : (
				<p>Sorry, no projects were found!</p>
			)}
		</Container>
	);
};

export default PrjCardList;
